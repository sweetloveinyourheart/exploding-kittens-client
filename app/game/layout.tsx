import { GameDataProvider } from "@/contexts/GameDataProvider"
import { GameActionProvider } from "@/features/game/contexts/GameAction"
import { GameNotificationsProvider } from "@/features/game/contexts/Notifications"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Game | Exploding Kittens",
    description: "To be a winner",
}

export default function LobbyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <GameDataProvider>
                <GameActionProvider>
                    <GameNotificationsProvider>
                        {children}
                    </GameNotificationsProvider>
                </GameActionProvider>
            </GameDataProvider>
        </>
    )
}