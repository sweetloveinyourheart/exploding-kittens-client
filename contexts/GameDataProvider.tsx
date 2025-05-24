"use client"

import { useGrpcClient } from "@/lib/hooks/grpc-client"
import { Card } from "@sweetloveinyourheart/exploding-kittens-client-core"
import { createContext, FC, ReactNode, useEffect, useState } from "react"
import { toast } from "sonner"

interface GameDataContextType {
    cardList: Card[]
    cards: Map<string, Card>
    isLoading: boolean
}

export const GameDataContext = createContext<GameDataContextType | undefined>(undefined)

interface GameDataProviderProps {
    children: ReactNode
}

export const GameDataProvider: FC<GameDataProviderProps> = ({ children }) => {
    const { client, isAuthenticated } = useGrpcClient()

    const [cardList, setCardList] = useState<Card[]>([])
    const [cards, setCards] = useState<Map<string, Card>>(new Map())
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (isAuthenticated) {
            (async () => {
                const { data, error } = await client.retrieveCardsData()
                if (error || !data?.cards) {
                    toast("Unable to retrieve cards data")
                    setIsLoading(false)
                    return
                }

                const cardMap = new Map<string, Card>()
                data.cards.forEach(card => {
                    cardMap.set(card.cardId, card)
                })

                setCardList(data.cards)
                setCards(cardMap)
                setIsLoading(false)
            })()
        }
    }, [isAuthenticated])

    return (
        <GameDataContext.Provider value={{ cardList, cards, isLoading }}>
            {children}
        </GameDataContext.Provider>
    )
}