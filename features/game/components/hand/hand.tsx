import PlayerHand, { getCardIdFromVisualizeCard, visualizeCardId } from "@/components/player-hand";
import { Button } from "@/components/ui/button";
import { GameState, UserState } from "@/types/game";
import { Card } from "@sweetloveinyourheart/exploding-kittens-client-core";
import { FunctionComponent, useState } from "react";
import { ValidateCardPlay } from "../../validations/play-card";
import { toast } from "sonner";
import { useGrpcClient } from "@/lib/hooks/grpc-client";

interface HandProps {
    gameState: GameState
    userState: UserState
    cardData: Map<string, Card>
}

const Hand: FunctionComponent<HandProps> = ({ cardData, userState, gameState }) => {
    const [selectedCards, setSelectedCards] = useState<string[]>([])

    const { client, isAuthenticated } = useGrpcClient()

    const onSelectCard = (cardId: string, index: number) => {
        const isExists = selectedCards.includes(visualizeCardId(cardId, index))
        if (isExists) {
            setSelectedCards(selectedCards.filter(id => id !== visualizeCardId(cardId, index)));
        } else {
            setSelectedCards([...selectedCards, visualizeCardId(cardId, index)]);
        }
    }

    const onPlayCard = async () => {
        if (!isAuthenticated) {
            return
        }

        const cardIds = selectedCards.map(cardId => getCardIdFromVisualizeCard(cardId))
        const cardCodes = cardIds
            .map(cardId => cardData.get(cardId)?.code)
            .filter(cardCode => cardCode !== undefined)

        const { valid, error } = ValidateCardPlay(cardCodes)
        if (valid) {
            const err = await client.PlayCards({
                gameId: gameState.gameId,
                cardIds: cardIds
            })
            if (err) {
                toast("Error playing card", { description: err.message })
            }
        } else {
            toast("Error playing card", { description: error })
        }

        setSelectedCards([])
    }

    return (
        <div className="flex justify-between">
            <div className="flex flex-col justify-center">
                <div>Player: {userState.name}</div>
                <div>Cards: {userState.cards.length}</div>
            </div>
            <div className="relative flex">
                <PlayerHand
                    cards={userState.cards}
                    selectedCards={selectedCards}
                    onSelectCard={onSelectCard}
                />
            </div>
            <div>
                {gameState.playerTurn !== userState.userId && (
                    <div className="flex flex-col gap-2 justify-center">
                        <Button
                            onClick={onPlayCard}
                            disabled={selectedCards.length === 0}
                        >
                            Play
                        </Button>
                        <Button
                            disabled={userState.cards.length === 0}
                        >
                            Draw
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Hand;