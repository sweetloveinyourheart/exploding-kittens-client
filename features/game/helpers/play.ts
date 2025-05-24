import { Game_Phase, User } from "@sweetloveinyourheart/exploding-kittens-client-core"
import { CardEffect, cardEffectLabelMap } from "@/constants/card-effects"
import { DeskAction } from "@/types/desk"

export function gamePhaseToText(phase: Game_Phase): string {
    switch (phase) {
        case Game_Phase.INITIALIZING:
            return "Initializing"
        case Game_Phase.TURN_START:
            return "Turn Start"
        case Game_Phase.ACTION_PHASE:
            return "Action Phase"
        case Game_Phase.CARD_DRAWING:
            return "Card Drawing"
        case Game_Phase.TURN_END:
            return "Turn Finish"
        case Game_Phase.GAME_FINISH:
            return "Game Finish"
        case Game_Phase.EXPLODING_DRAWN:
            return "Exploding Drawn"
        case Game_Phase.EXPLODING_DEFUSED:
            return "Exploding Defused"
        case Game_Phase.PLAYER_ELIMINATED:
            return "Player Eliminated"
        default:
            return "Loading ..."
    }
}

export function deskActionToText(action: DeskAction): string {
    switch (action) {
        case DeskAction.SeeTheFuture:
            return "See The Future"
        case DeskAction.Draw:
            return "Draw Card"
        case DeskAction.PlantExplodingKitten:
            return "Re-Insert"
        default:
            return "Unknown Action"
    }
}

export function getPlayerTurnName(userId: string, playerId: string, playersData: User[]): string {
    if (userId === playerId) {
        return "Your Turn"
    }

    const playerData = playersData.find((p) => p.userId === playerId)
    if (!playerData) {
        return "Unknown Player"
    }

    return playerData.fullName
}


export function getLabelForEffect(key: CardEffect): string {
    return cardEffectLabelMap[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

