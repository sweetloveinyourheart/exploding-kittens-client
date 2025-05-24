import { useGrpcClient } from "@/lib/hooks/grpc-client"
import { FunctionComponent, useEffect, useState } from "react"
import { useGameAction } from "../../hooks/game-action"
import { Card } from "@sweetloveinyourheart/exploding-kittens-client-core"
import { Card as CardComponent, CardContent } from "@/components/ui/card"
import { useGameDataProvider } from "@/lib/hooks/game-data-provider"
import { toast } from "sonner"

interface SeeTheFutureProps {
    gameId: string
    deskId: string
}

const SeeTheFuture: FunctionComponent<SeeTheFutureProps> = ({ gameId, deskId }) => {
    const [topCards, setTopCards] = useState<Card[]>([])

    const { client, isAuthenticated } = useGrpcClient()
    const { cards, isLoading } = useGameDataProvider()

    const { closeGameAction } = useGameAction()

    useEffect(() => {
        if (!isAuthenticated || isLoading) {
            return
        }

        (async () => {
            const res = await client.PeekCards({ gameId, deskId })
            if (!res.data || res.error) {
                toast.error("Failed to peek at the top cards. Please try again.", { description: res.error?.message })
                closeGameAction()
                return
            }

            const peekedCards: Card[] = res.data.cardIds
                .map((cardId) => cards.get(cardId))
                .filter(card => card !== undefined)

            setTopCards(peekedCards)
        })()
    }, [isAuthenticated, isLoading])

    return (
        <div className="flex">
            {topCards.map((card, idx) => (
                <CardComponent className="w-40 h-60 " key={`${card.cardId}_${idx}`}>
                    <CardContent>
                        <div className="text-xs font-bold">
                            {card.name}
                        </div>
                        <div className="text-xs">
                            {card.description}
                        </div>
                    </CardContent>
                </CardComponent>
            ))}
        </div>
    )
}

export default SeeTheFuture