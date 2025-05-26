"use client"

import { createContext, ReactNode, useState } from "react"

type GameNotificationsContextType = {
    isOpen: boolean
    message: string
    openNotification: (message: string) => void
    closeNotification: () => void
}

export const GameNotificationsContext = createContext<GameNotificationsContextType | undefined>(undefined)


export const GameNotificationsProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState<string>("")

    const openNotification = (message: string) => {
        setIsOpen(true)
        setMessage(message)
    }

    const closeNotification = () => {
        setIsOpen(false)
        setMessage("")
    }

    return (
        <GameNotificationsContext.Provider
            value={{
                isOpen,
                message,
                openNotification,
                closeNotification,
            }}
        >
            {children}
        </GameNotificationsContext.Provider>
    )
}
