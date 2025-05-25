"use server"

import { auth } from "@/auth"
import { HOME_ROUTER } from "@/constants/routers"
import GamePlay from "@/features/game/game"
import { grpcServer } from "@/lib/grpc/grpc-server"
import { redirect } from "next/navigation"
import Image from "next/image"
import Table from "@/assets/images/table.png"

interface GamePageProps {
    params: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function GamePage({ params }: GamePageProps) {
    const { id } = await params

    const session = await auth()
    if (!session || !session.user?.userId) {
        redirect(HOME_ROUTER)
    }

    const clientServer = await grpcServer()
    const res = await clientServer.getGameMetadata({ gameId: id as string })
    if (!res.data || !res.data.meta) {
        redirect(HOME_ROUTER)
    }

    const meta = res.data.meta

    const getPlayerRes = await clientServer.getPlayersProfile({ userIds: meta.players })
    if (!getPlayerRes.data || getPlayerRes.data.users.length === 0) {
        redirect(HOME_ROUTER)
    }

    const players = getPlayerRes.data.users

    return (
        <div className="overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={Table}
                    alt="Exploding Kittens Background"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>
            <GamePlay
                gameId={meta.gameId}
                userId={session.user.userId}
                players={JSON.stringify(players)}
            />
        </div>
    )
}