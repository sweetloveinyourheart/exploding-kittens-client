"use server"

import { signIn, signOut } from "@/auth"
import { AUTH_GUEST_CREDENTIAL_PROVIDER } from "@/constants/auth"
import { HOME_ROUTER } from "@/constants/routers"

export const guestLogin = async (data: { userId: string }) => {
    await signIn(AUTH_GUEST_CREDENTIAL_PROVIDER, {
        redirectTo: HOME_ROUTER,

        // form data
        userId: data.userId,
    })
}

export const logout = async () => {
    await signOut({ redirectTo: HOME_ROUTER })
}