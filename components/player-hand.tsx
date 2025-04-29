import { FunctionComponent } from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { Card as CardData } from "@sweetloveinyourheart/exploding-kittens-client-core";

interface PlayerHandProps {
    cards: CardData[]
}

const PlayerHand: FunctionComponent<PlayerHandProps> = ({ cards }) => {
    return (
        <>
            {cards.map((card, idx, arr) => {
                const overlap = 60; // horizontal distance between cards
                const centerIndex = Math.floor(arr.length / 2); // find the center index
                const offsetX = (idx - centerIndex) * overlap; // calculate offset relative to the center

                return (
                    <Card
                        key={idx}
                        className={cn(
                            "w-40 h-60 absolute transition-all duration-300 cursor-pointer rounded-xl",
                            "hover:-translate-y-5",
                        )}
                        style={{
                            left: `calc(50% - 80px)`, // center the cards by subtracting half of their width (80px)
                            transform: `translateX(${offsetX}px)`, // offset the card based on the center
                        }}
                    >
                        <CardContent className="text-center font-bold p-2 flex items-center justify-center h-full">
                            {card.name}
                        </CardContent>
                    </Card>
                );
            })}
        </>
    );
}

export default PlayerHand;