"use server"

import { auth } from "@/auth"
import { HOME_ROUTER } from "@/constants/routers"
import { redirect } from "next/navigation"

interface GamePageProps {
    params: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GamePage({ params }: GamePageProps) {
    const session = await auth()
    if (!session) {
        redirect(HOME_ROUTER)
    }

    const { id } = await params

    return (
        <main>
            GAME ID: {id}
        </main>
    )
}