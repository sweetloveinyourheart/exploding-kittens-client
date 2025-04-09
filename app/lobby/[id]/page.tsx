"use server"

import { auth } from "@/auth"
import { HOME_ROUTER } from "@/constants/routers"
import { redirect } from "next/navigation"

export default async function LobbyPage() {
    const session = await auth()
    if (!session) {
        redirect(HOME_ROUTER)
    }

    return (
        <></>
    )
}