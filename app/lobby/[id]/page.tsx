"use server"

import { auth } from "@/auth"
import GameLobby from "@/features/lobby/lobby"
import { HOME_ROUTER } from "@/constants/routers"
import { redirect } from "next/navigation"
import { grpcServer } from "@/lib/grpc/grpc-server"

interface LobbyPageProps {
    params: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function LobbyPage({ params }: LobbyPageProps) {
    const { id } = await params

    const session = await auth()
    if (!session || !session.user?.userId) {
        redirect(HOME_ROUTER)
    }

    const clientServer = await grpcServer()
    const res = await clientServer.getLobby({ lobbyId: id as string })
    if (!res.data || !res.data.lobby) {
        redirect(HOME_ROUTER)
    }

    return (
        <GameLobby 
            userId={session.user.userId}
            lobbyData={JSON.stringify(res.data.lobby)} 
        />
    )
}