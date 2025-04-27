"use client"

import { useGrpcClient } from "@/lib/hooks/grpc-client";
import { Card } from "@sweetloveinyourheart/exploding-kittens-client-core";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

interface GameDataContextType {
    cards: Card[]
}

export const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

interface GameDataProviderProps {
    children: ReactNode;
}

export const GameDataProvider: FC<GameDataProviderProps> = ({ children }) => {
    const { client, isAuthenticated } = useGrpcClient()

    const [cards, setCards] = useState<Card[]>([])

    useEffect(() => {
        if (isAuthenticated) {
            (async () => {
                const { data, error } = await client.retrieveCardsData()
                if (error || !data?.cards) {
                    toast("Unable to retrieve cards data")
                    return
                }

                setCards(data.cards)
            })()
        }
    }, [isAuthenticated])

    return (
        <GameDataContext.Provider value={{ cards }}>
            {children}
        </GameDataContext.Provider>
    )
}