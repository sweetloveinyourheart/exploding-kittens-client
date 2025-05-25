"use server"

import { auth } from "@/auth"
import Welcome from "@/features/welcome/welcome"
import Image from "next/image"
import Background from "@/assets/images/background.jpg"
import Bg from "@/assets/images/bg.png"
import HomePageWelcome from "@/features/welcome/components/home-page"

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    return (
      <main className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={Bg}
            alt="Exploding Kittens Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <Welcome user={session.user} />
      </main>
    )
  }

  return (
    <main className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
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

      <HomePageWelcome />
    </main>
  )
}
