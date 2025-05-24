import { FunctionComponent } from "react"
import { Card } from "./ui/card"
import { Card as CardData } from "@sweetloveinyourheart/exploding-kittens-client-core"
import { DiscardPileAction } from "@/types/desk"
import { Button } from "./ui/button"

interface DiscardPileProps {
    loading: boolean
    discardPile: CardData[]
    action: DiscardPileAction | null
    actionTriggered: boolean
    onExecuteAction: () => void
}

const DiscardPile: FunctionComponent<DiscardPileProps> = ({ loading, discardPile, action, actionTriggered, onExecuteAction }) => {
    if (discardPile.length === 0) {
        return null
    }

    return (
        <Card className="w-40 h-60 flex items-center justify-center shadow-md rounded-2xl">
            <div className="text-center">
                <p className="text-sm">{discardPile[discardPile.length - 1]?.name}</p>
                <p className="text-xs">{discardPile[discardPile.length - 1]?.description}</p>
            </div>
            {actionTriggered && action
                ? <Button disabled={loading} onClick={() => onExecuteAction()}>{action}</Button>
                : null
            }
        </Card>
    )
}

export default DiscardPile