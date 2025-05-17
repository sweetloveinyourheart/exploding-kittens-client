import PlayerHand, { getCardIdFromVisualizeCard, visualizeCardId } from "@/components/player-hand";
import { Button } from "@/components/ui/button";
import { GameState, UserState } from "@/types/game";
import { FunctionComponent, useState } from "react";
import { ValidateCardPlay } from "../../validations/play-card";
import { toast } from "sonner";
import { useGrpcClient } from "@/lib/hooks/grpc-client";
import { CardEffect } from "@/constants/card-effects";
import { useGameDataProvider } from "@/lib/hooks/game-data-provider";

interface HandProps {
    gameState: GameState
    userState: UserState
}

const Hand: FunctionComponent<HandProps> = ({ userState, gameState }) => {
    const [selectedCards, setSelectedCards] = useState<string[]>([])

    const { client, isAuthenticated } = useGrpcClient()
    const { cards, isLoading } = useGameDataProvider()


    const onSelectCard = (cardId: string, index: number) => {
        const isExists = selectedCards.includes(visualizeCardId(cardId, index))
        if (isExists) {
            setSelectedCards(selectedCards.filter(id => id !== visualizeCardId(cardId, index)));
        } else {
            setSelectedCards([...selectedCards, visualizeCardId(cardId, index)]);
        }
    }

    const canPlayCard = gameState.playerTurn === userState.userId
    const onPlayCard = async () => {
        if (!isAuthenticated) {
            return
        }

        const cardIds = selectedCards.map(cardId => getCardIdFromVisualizeCard(cardId))
        const cardCodes = cardIds
            .map(cardId => cards.get(cardId)?.code)
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

    const canGiveCard = gameState.playerTurn !== userState.userId 
        && gameState.affectedPlayer === userState.userId 
        && gameState.executingAction === CardEffect.StealCard
    const onGiveCard = async () => {
        if (!isAuthenticated) {
            return
        }

        const cardIds = selectedCards.map(cardId => getCardIdFromVisualizeCard(cardId))
        if (cardIds.length === 0) {
            return
        }

        const err = await client.GiveCard({
            gameId: gameState.gameId,
            cardId: cardIds[0]
        })

        if (err) {
            toast("Error giving card", { description: err.message })
        }

        setSelectedCards([])
    }

    if (!isAuthenticated || isLoading) {
        return <>Loading ...</>
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
                {canPlayCard && (
                    <div className="flex flex-col gap-2 justify-center">
                        <Button
                            onClick={onPlayCard}
                            disabled={selectedCards.length === 0}
                        >
                            Play Card
                        </Button>
                    </div>
                )}
                {canGiveCard && (
                    <div className="flex flex-col gap-2 justify-center">
                        <Button
                            onClick={onGiveCard}
                            disabled={selectedCards.length === 0}
                        >
                            Give Card
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Hand;