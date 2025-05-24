import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Lobby | Exploding Kittens",
    description: "Invite your friends and get a interested game.",
}

export default function LobbyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}