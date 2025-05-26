import { useContext } from "react"
import { GameNotificationsContext } from "../contexts/Notifications"

export const useGameNotifications = () => {
    const context = useContext(GameNotificationsContext)
    if (!context) {
        throw new Error('useGameNotifications must be used within a GameNotificationsProvider')
    }
    return context
}