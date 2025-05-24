import { Card as CardComponent } from "@/components/ui/card"
import { Card } from "@/constants/cards"
import { useGameDataProvider } from "@/lib/hooks/game-data-provider"
import { useGrpcClient } from "@/lib/hooks/grpc-client"
import { FunctionComponent } from "react"
import { toast } from "sonner"
import { useGameAction } from "../../hooks/game-action"

interface StealNamedCardProps {
    gameId: string
}

const StealNamedCard: FunctionComponent<StealNamedCardProps> = ({ gameId }) => {
    const { cardList, isLoading } = useGameDataProvider()
    const { client, isAuthenticated } = useGrpcClient()
    const { closeGameAction } = useGameAction()

    if (isLoading || !isAuthenticated) {
        return (
            <>Loading ...</>
        )
    }

    const cards = cardList
        .map((card) => card.code !== Card.ExplodingKitten ? card : undefined)
        .filter(card => card !== undefined)

    const onSelectCard = async (cardId: string) => {
        const err = await client.StealCard({ gameId, cardId })
        if (err) {
            toast.error("Failed to steal card. Please try again.")
        }

        closeGameAction()
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {cards.map((card, idx) => (
                <CardComponent
                    key={card.cardId || idx}
                    className="border border-gray-300 p-4 rounded-lg"
                    onClick={() => onSelectCard(card.cardId)}
                >
                    <div className="text-xs font-bold">{card.name}</div>
                    <div className="text-xs">{card.description}</div>
                </CardComponent>
            ))}
        </div>
    )
}

export default StealNamedCard