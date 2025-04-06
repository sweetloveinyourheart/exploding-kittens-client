"use client"

import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { GUEST_REGISTER_ROUTER } from "@/constants/routers";

export default function Home() {
  const router = useRouter()

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-6">Welcome to Exploding Kittens</h1>
        <Button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          onClick={() => router.push(GUEST_REGISTER_ROUTER)}
        >
          Guest Register
        </Button>
      </div>
    </>
  );
}
