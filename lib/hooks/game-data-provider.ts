"use client"

import { GameDataContext } from "@/contexts/GameDataProvider";
import { useContext } from "react";

export const useGameDataProvider = () => {
    const context = useContext(GameDataContext);
    if (!context) {
        throw new Error('useGameDataProvider must be used within a GameDataProvider');
    }
    return context;
};