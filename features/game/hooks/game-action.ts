import { useContext } from "react"
import { GameActionContext } from "../contexts/GameAction"

export const useGameAction = () => {
    const context = useContext(GameActionContext)
    if (!context) {
        throw new Error('useGameAction must be used within a GameActionProvider')
    }
    return context
}