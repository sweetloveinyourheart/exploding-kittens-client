"use client"

import { CardEffect } from '@/constants/card-effects'
import React, { createContext, useState, ReactNode } from 'react'

type GameActionContextType = {
    isOpen: boolean
    executingAction: CardEffect | null
    openGameAction: (action: CardEffect) => void
    closeGameAction: () => void
    onGameActionChange: (open: boolean) => void
}

export const GameActionContext = createContext<GameActionContextType | undefined>(undefined)

export const GameActionProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [executingAction, setExecutingAction] = useState<CardEffect | null>(null)

    const openGameAction = (action: CardEffect) => {
        setIsOpen(true)
        setExecutingAction(action)
    }

    const closeGameAction = () => {
        setIsOpen(false)
        setExecutingAction(null)
    }

    const onGameActionChange = (open: boolean) => {
        setIsOpen(open)
        if (!open) {
            setExecutingAction(null)
        }
    }

    return (
        <GameActionContext.Provider
            value={{
                isOpen,
                executingAction,
                openGameAction,
                closeGameAction,
                onGameActionChange
            }}
        >
            {children}
        </GameActionContext.Provider>
    )
}
