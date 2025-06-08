import GamePlayer from "@/components/game-player"
import { GameState, PlayerState } from "@/types/game"
import { FunctionComponent } from "react"
import { gamePhaseToText, getLabelForEffect, getPlayerTurnName } from "@/features/game/helpers/play"
import { User } from "@sweetloveinyourheart/exploding-kittens-client-core"
import { CardEffect } from "@/constants/card-effects"
import { useGrpcClient } from "@/lib/hooks/grpc-client"
import { toast } from "sonner"
import { NIL_USER_ID } from "@/constants/auth"
import { useGameAction } from "@/features/game/hooks/game-action"
import { GamePlayerAction } from "@/types/player"

interface GameHUDProps {
    userId: string
    playersData: User[]
    gameState: GameState
    playerStates: PlayerState[]
}

const GameHUD: FunctionComponent<GameHUDProps> = ({ userId, playersData, gameState, playerStates }) => {
    const { client, isAuthenticated } = useGrpcClient()
    const { openGameAction } = useGameAction()

    const canStealCard = (active: boolean) => {
        return active && [CardEffect.StealCard, CardEffect.StealRandomCard, CardEffect.StealNamedCard]
            .includes(gameState.executingAction as CardEffect)
            && gameState.playerTurn === userId
            && gameState.affectedPlayer === NIL_USER_ID
    }

    const onSelectStealingTarget = async (playerId: string) => {
        const err = await client.SelectAffectedPlayer({ gameId: gameState.gameId, playerId })
        if (err) {
            toast("Failed to select the target player. Please try again.")
            return
        }

        if (gameState.executingAction !== CardEffect.StealCard) {
            openGameAction(gameState.executingAction as CardEffect)
        }
    }

    if (!isAuthenticated) {
        return <>Loading ...</>
    }

    return (
        <div className="flex justify-center p-4">
            <div className="flex gap-6">
                {playerStates.map((player, index) => (
                    <GamePlayer
                        player={player}
                        playerIndex={index}
                        playerTurnId={gameState.playerTurn}
                        action={GamePlayerAction.StealCard}
                        actionTriggered={canStealCard(player.active)}
                        key={`${player.name}_${index}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default GameHUD