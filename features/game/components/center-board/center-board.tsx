import DiscardPile from "@/components/discard-pile";
import GameDesk from "@/components/game-desk";
import { DeskState, GameState } from "@/types/game";
import { FunctionComponent, useEffect, useState } from "react";
import { CardEffect } from "@/constants/card-effects"
import { useGameAction } from "../../hooks/game-action";
import { DeskAction } from "@/types/desk";
import { useGrpcClient } from "@/lib/hooks/grpc-client";
import { toast } from "sonner";

interface CenterBoardProps {
    deskState: DeskState
    gameState: GameState
    userId: string
}

const CenterBoard: FunctionComponent<CenterBoardProps> = ({ gameState, deskState, userId }) => {
    const [action, setAction] = useState<DeskAction | null>(null)
    const [actionTriggered, setActionTriggered] = useState<boolean>(false)

    const { client, isAuthenticated } = useGrpcClient()

    useEffect(() => {
        if (gameState.executingAction == CardEffect.PeekCards && gameState.playerTurn == userId) {
            setActionTriggered(true)
            setAction(DeskAction.SeeTheFuture)
            return
        }

        if (!gameState.executingAction && gameState.playerTurn == userId) {
            setActionTriggered(true)
            setAction(DeskAction.Draw)
            return
        }

        setActionTriggered(false)
        setAction(null)
    }, [gameState])

    const { openGameAction } = useGameAction()
    
    const onExecuteAction = async () => {
        if (action === DeskAction.SeeTheFuture) {
            openGameAction(CardEffect.PeekCards)
            return
        }

        if (action === DeskAction.Draw) {
            const err = await client.DrawCards({ gameId: gameState.gameId })
            if (err) {
                toast("Failed to draw cards. Please try again.")
            }
            return
        }
    }

    if (!isAuthenticated) {
        return <>Loading ...</>
    }

    return (
        <div className="flex justify-center items-center gap-12">
            {/* Deck */}
            <GameDesk 
                desk={deskState} 
                action={action}
                actionTriggered={actionTriggered}
                onExecuteAction={onExecuteAction}
            />

            {/* Discard Pile */}
            <DiscardPile 
                discardPile={deskState.discardPile} 
            />
        </div>
    );
}

export default CenterBoard;