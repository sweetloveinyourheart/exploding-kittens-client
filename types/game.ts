import { Card, Game_Desk } from "@sweetloveinyourheart/exploding-kittens-client-core"

type PlayerState = {
    active: boolean
    name: string
    count: number
}

type UserState = {
    active: boolean
    name: string
    cards: Card[]
}

type DeskState = Game_Desk & {}

export type {
    PlayerState,
    UserState,
    DeskState,
}