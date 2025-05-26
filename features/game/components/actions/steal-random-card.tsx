import { useGrpcClient } from "@/lib/hooks/grpc-client"
import { PlayerState } from "@/types/game"
import { FunctionComponent } from "react"
import { toast } from "sonner"
import { useGameAction } from "../../hooks/game-action"
import HiddenKittens from "@/components/hidden-kittens"

interface StealRandomCardProps {
    gameId: string
    affectedPlayer: PlayerState
}

const StealRandomCard: FunctionComponent<StealRandomCardProps> = ({ gameId, affectedPlayer }) => {
    const { client, isAuthenticated } = useGrpcClient()
    const { closeGameAction } = useGameAction()

    if (!isAuthenticated || !affectedPlayer) {
        return (
            <>Loading ...</>
        )
    }

    const cards = new Array(affectedPlayer.count).fill(null)

    const onSelectCard = async (cardIndex: number) => {
        const err = await client.StealCard({ gameId, cardIndex })
        if (err) {
            toast.error("Failed to steal card. Please try again.")
        }

        closeGameAction()
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {cards.map((_, idx) => (
                <div className="w-40 h-60 cursor-pointer" key={idx} onClick={() => onSelectCard(idx)}>
                    <HiddenKittens />
                </div>
            ))}
        </div>
    )
}

export default StealRandomCard