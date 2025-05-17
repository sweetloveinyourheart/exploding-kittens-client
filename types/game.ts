import { Card, Game, Game_Desk } from "@sweetloveinyourheart/exploding-kittens-client-core"

type PlayerState = {
    playerId: string
    active: boolean
    name: string
    count: number
}

type UserState = {
    userId: string
    active: boolean
    name: string
    cards: Card[]
}

type DeskState = Pick<Game_Desk, 'deskId' | 'remainingCards'> & {
    discardPile: Card[]
}

type GameState = Pick<Game, 'gameId' | 'gamePhase' | 'playerTurn' | 'executingAction' | 'affectedPlayer'> & {}

export type {
    PlayerState,
    UserState,
    DeskState,
    GameState,
}