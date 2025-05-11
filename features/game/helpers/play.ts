import { Game_Phase, User } from "@sweetloveinyourheart/exploding-kittens-client-core";
import { labelMap } from "@/constants/card-effects"

export function gamePhaseToText(phase: Game_Phase): string {
    switch (phase) {
        case Game_Phase.INITIALIZING:
            return "Initializing";
        case Game_Phase.TURN_START:
            return "Turn Start";
        case Game_Phase.ACTION_PHASE:
            return "Action Phase";
        case Game_Phase.CARD_DRAWING:
            return "Card Drawing";
        case Game_Phase.TURN_END:
            return "Turn Finish";
        case Game_Phase.GAME_OVER:
            return "Game Over";
        default:
            return "Loading ...";
    }
}

export function getPlayerTurnName(userId: string, playerId: string, playersData: User[]): string {
    if (userId === playerId) {
        return "Your Turn";
    }

    const playerData = playersData.find((p) => p.userId === playerId);
    if (!playerData) {
        return "Unknown Player";
    }

    return playerData.fullName;
}


export function getLabelForEffect(key: string): string {
    return labelMap[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

