"use server"

import { GUEST_REGISTER_ROUTER } from "@/constants/routers"
import Link from "next/link"
import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import Welcome from "@/features/welcome/welcome"

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    return (
      <Welcome user={session.user}/>
    )
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-6">Welcome to Exploding Kittens</h1>
        <Button type="button">
          <Link href={GUEST_REGISTER_ROUTER}>
            Guest Register
          </Link>
        </Button>
      </div>
    </main>
  )
}
