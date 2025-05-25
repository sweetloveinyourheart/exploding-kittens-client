import { useGrpcClient } from "@/lib/hooks/grpc-client"
import { FunctionComponent, useEffect, useState } from "react"
import { useGameAction } from "../../hooks/game-action"
import { Card } from "@sweetloveinyourheart/exploding-kittens-client-core"
import { useGameDataProvider } from "@/lib/hooks/game-data-provider"
import { toast } from "sonner"
import Kittens from "@/components/kittens"

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
        <div className="flex justify-center items-center gap-4 p-4">
            {topCards.map((card, idx) => (
                <div className="w-48 h-64" key={`${card.cardId}_${idx}`}>
                    <h2 className="text-background text-center font-bold text-xl mb-4 border-b p-2">
                        {(topCards.length - idx).toString().padStart(2, '0')}
                    </h2>
                    <Kittens code={card.code} />
                </div>
            ))}
        </div>
    )
}

export default SeeTheFuture