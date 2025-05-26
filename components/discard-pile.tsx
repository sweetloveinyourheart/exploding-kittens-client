import { FunctionComponent } from "react"
import { Card as CardData } from "@sweetloveinyourheart/exploding-kittens-client-core"
import { DiscardPileAction } from "@/types/desk"
import Kittens from "./kittens"
import { Button } from "./ui/button"

interface DiscardPileProps {
    loading: boolean
    discardPile: CardData[]
    action: DiscardPileAction | null
    actionTriggered: boolean
    onExecuteAction: () => void
}

const DiscardPile: FunctionComponent<DiscardPileProps> = ({ loading, discardPile, action, actionTriggered, onExecuteAction }) => {
    const cardCount = 6;

    if (!discardPile || discardPile.length === 0) {
        return null;
    }

    return (
        <div className="relative w-48 h-64 transform rotate-[42deg]">
            {Array.from({ length: cardCount }).map((_, index) => {
                const offset = (cardCount - index - 1) * 2;

                if (actionTriggered && action && index === cardCount - 1) {
                    return (
                        <div
                            key={index}
                            className="absolute w-full h-full bg-foreground/25 rounded-lg flex justify-center items-center"
                            style={{
                                top: `${offset}px`,
                                left: `${offset}px`,
                                zIndex: index,
                            }}
                        >
                            <Button variant={"secondary"} disabled={loading} onClick={() => onExecuteAction()}>{action}</Button>
                        </div>
                    )
                }
                return (
                    <div
                        key={index}
                        className="absolute w-full h-full"
                        style={{
                            top: `${offset}px`,
                            left: `${offset}px`,
                            zIndex: index,
                        }}
                    >
                        <div className="flex flex-col justify-center items-center w-[192px] h-[256px] rounded-lg shadow-xl bg-background">
                            <Kittens code={discardPile[discardPile.length - 1]?.code} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default DiscardPile