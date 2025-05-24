"use server"

import { redirect } from 'next/navigation'
import { auth } from "@/auth"
import { HOME_ROUTER } from '@/constants/routers'
import { GuestForm } from '@/features/authentication/guest'

export default async function GuestSignInPage() {
    const session = await auth()
    if (session) {
        redirect(HOME_ROUTER)
    }

    return (
        <div className="h-screen">
            <div className="flex items-center justify-center h-full">
                <div className="min-w-[500px]">
                    <GuestForm />
                </div>
            </div>
        </div>
    )
}