"use server"

import { auth } from "@/auth"
import { HOME_ROUTER } from "@/constants/routers"
import { grpcServer } from "@/lib/grpc/grpc-server";
import { redirect } from "next/navigation"

interface GamePageProps {
    params: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GamePage({ params }: GamePageProps) {
    const { id } = await params

    const session = await auth()
    if (!session) {
        redirect(HOME_ROUTER)
    }

    const clientServer = await grpcServer()
    const res = await clientServer.getGameMetadata({ gameId: id as string })
    if (!res.data || !res.data.meta) {
        redirect(HOME_ROUTER)
    }

    return (
        <main>
            GAME ID: {id}
        </main>
    )
}