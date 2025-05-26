import { DeskState, GameState, PlayerState, UserState } from "@/types/game";
import { Game_Phase } from "@sweetloveinyourheart/exploding-kittens-client-core";
import { FunctionComponent, useEffect } from "react";
import { useGameNotifications } from "../../hooks/game-notification";
import { FullscreenNotification } from "@/components/full-screen-noti";

interface NotificationsProps {
    userId: string
    userState: UserState
    gameState: GameState
    deskState: DeskState
    playerStates: PlayerState[]
}

const Notifications: FunctionComponent<NotificationsProps> = ({ userId, userState, gameState, deskState, playerStates }) => {

    const { isOpen, message, openNotification, closeNotification } = useGameNotifications()

    // Notification
    useEffect(() => {
        if (!gameState || !deskState) {
            return
        }

        if (gameState.gamePhase === Game_Phase.EXPLODING_DRAWN) {
            openNotification("🔥 Exploding Kitten Drawn!")
        }

        if (gameState.gamePhase === Game_Phase.EXPLODING_DEFUSED && gameState.playerTurn != userId) {
            openNotification("🔥 Exploding Kitten Defused!")
        }

        if (gameState.gamePhase === Game_Phase.EXPLODING_DEFUSED && gameState.playerTurn != userId) {
            const player = playerStates.find(playerState => playerState.playerId === gameState.playerTurn)
            const playerName = player ? player.name : userState.name || "A player"

            openNotification(`🧯 ${playerName} has defused the exploding kitten!`)
        }

        if (gameState.gamePhase === Game_Phase.PLAYER_ELIMINATED) {
            const player = playerStates.find(playerState => playerState.playerId === gameState.playerTurn)
            const playerName = player ? player.name : userState.name || "A player"

            openNotification(`😵 ${playerName} is eliminated!`)
        }
    }, [gameState])

    return (
        <FullscreenNotification
            message={message}
            show={isOpen}
            duration={1000}
            onClose={() => closeNotification()}
        />
    );
}

export default Notifications;