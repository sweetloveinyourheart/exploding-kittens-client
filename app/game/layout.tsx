import { GameDataProvider } from "@/contexts/GameDataProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Game | Exploding Kittens",
    description: "To be a winner",
};

export default function LobbyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <GameDataProvider>
                {children}
            </GameDataProvider>
        </>
    )
}