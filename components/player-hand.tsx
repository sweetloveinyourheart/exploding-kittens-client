import { FunctionComponent } from "react";
import { Card, CardContent } from "./ui/card";
import { cn, padTo2Digits } from "@/lib/utils";
import { Card as CardData } from "@sweetloveinyourheart/exploding-kittens-client-core";

interface PlayerHandProps {
    cards: CardData[]
    selectedCards: string[]
    onSelectCard: (cardId: string, index: number) => void
}

export function visualizeCardId(cardId: string, index: number): string {
    return `${cardId}_${padTo2Digits(index)}`
  }
  

const PlayerHand: FunctionComponent<PlayerHandProps> = ({ cards, selectedCards, onSelectCard }) => {
    return (
        <>
            {cards.map((card, idx, arr) => {
                const overlap = 60; // horizontal distance between cards
                const centerIndex = Math.floor(arr.length / 2); // find the center index
                const offsetX = (idx - centerIndex) * overlap; // calculate offset relative to the center
                const isSelected = selectedCards.includes(visualizeCardId(card.cardId, idx))

                return (
                    <Card
                        key={idx}
                        className={cn(
                            "w-40 h-60 absolute transition-all duration-300 cursor-pointer rounded-xl border",
                            isSelected ? "border-red-500 -translate-y-5" : "border-gray-300 hover:-translate-y-5"
                        )}
                        style={{
                            left: `calc(50% - 80px)`, // center the cards by subtracting half of their width (80px)
                            transform: `translateX(${offsetX}px)`, // offset the card based on the center
                        }}
                        onClick={() => onSelectCard(card.cardId, idx)}
                    >
                        <CardContent>
                            <div className={cn(
                                "text-xs font-bold",
                                isSelected ? "text-destructive" : ""
                            )}>
                                {card.name}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </>
    );
}

export default PlayerHand;