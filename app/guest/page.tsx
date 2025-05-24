"use server"

import { redirect } from 'next/navigation'
import { auth } from "@/auth"
import { HOME_ROUTER } from '@/constants/routers'
import { GuestForm } from '@/features/authentication/guest'
import Image from 'next/image'
import Background from "@/assets/images/background.jpg"

export default async function GuestSignInPage() {
    const session = await auth()
    if (session) {
        redirect(HOME_ROUTER)
    }

    return (
        <div className="h-screen">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={Background}
                    alt="Exploding Kittens Background"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>
            <div className="flex items-center justify-center h-full">
                <div className="min-w-[500px]">
                    <GuestForm />
                </div>
            </div>
        </div>
    )
}