"use server"

import { auth } from "@/auth"
import GameLobby from "@/features/lobby/lobby"
import { HOME_ROUTER } from "@/constants/routers"
import { redirect } from "next/navigation"

interface LobbyPageProps {
    params: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LobbyPage({ params }: LobbyPageProps) {
    const session = await auth()
    if (!session) {
        redirect(HOME_ROUTER)
    }

    const { id } = await params

    return (
        <GameLobby lobbyId={id as string} />
    )
}