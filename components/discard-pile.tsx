import { FunctionComponent } from "react";
import { Card } from "./ui/card";
import { Card as CardData } from "@sweetloveinyourheart/exploding-kittens-client-core";

interface DiscardPileProps {
    discardPile: CardData[]
}

const DiscardPile: FunctionComponent<DiscardPileProps> = ({ discardPile }) => {
    if (discardPile.length === 0) {
        return null
    }
    
    return (
        <Card className="w-40 h-60 flex items-center justify-center shadow-md rounded-2xl">
            <div className="text-center">
                <p className="text-sm">{discardPile[discardPile.length - 1]?.name}</p>
                <p className="text-xs">{discardPile[discardPile.length - 1]?.description}</p>
            </div>
        </Card>
    );
}

export default DiscardPile;