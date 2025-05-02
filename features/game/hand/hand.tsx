import PlayerHand, { visualizeCardId } from "@/components/player-hand";
import { Button } from "@/components/ui/button";
import { UserState } from "@/types/game";
import { FunctionComponent, useState } from "react";

interface HandProps {
    userState: UserState
}

const Hand: FunctionComponent<HandProps> = ({ userState }) => {
    const [selectedCards, setSelectedCards] = useState<string[]>([])

    const onSelectCard = (cardId: string, index: number) => {
        const isExists = selectedCards.includes(visualizeCardId(cardId, index))
        if (isExists) {
            setSelectedCards(selectedCards.filter(id => id !== visualizeCardId(cardId, index)));
        } else {
            setSelectedCards([...selectedCards, visualizeCardId(cardId, index)]);
        }
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
            <div className="flex flex-col justify-center">
                <Button>
                    Draw
                </Button>
            </div>
        </div>
    );
}

export default Hand;