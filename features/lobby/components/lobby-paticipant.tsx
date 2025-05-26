"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useGrpcClient } from "@/lib/hooks/grpc-client"
import { User } from "@sweetloveinyourheart/exploding-kittens-client-core"
import { FunctionComponent, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, CrownIcon } from "lucide-react"

import Cat1 from "@/assets/images/cats/1.png"
import Cat2 from "@/assets/images/cats/2.png"
import Cat3 from "@/assets/images/cats/3.png"
import Cat4 from "@/assets/images/cats/4.png"
import Cat5 from "@/assets/images/cats/5.png"
import Cat6 from "@/assets/images/cats/6.png"
import Image from "next/image"

const catImages = [Cat1, Cat2, Cat3, Cat4, Cat5, Cat6]

interface LobbyPaticipantsProps {
  host: boolean
  userId: string
  playerId: string
  playerIndex: number
}

const LobbyPaticipants: FunctionComponent<LobbyPaticipantsProps> = ({ host, userId, playerId, playerIndex }) => {
  const [player, setPlayer] = useState<User | null>(null)

  const { client, isAuthenticated } = useGrpcClient()

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    (async () => {
      const response = await client.getPlayersProfile({ userIds: [playerId] })
      if (response.data && response.data.users.length > 0) {
        setPlayer(response.data.users[0])
      } else {
        setPlayer(null)
      }
    })()
  }, [isAuthenticated])

  if (player) {
    return (
      <>
        <div className="h-[80px] text-center flex flex-col items-center justify-end p-2 mb-2">
          {host ? (<CrownIcon />) : null}
          {userId === playerId ? (
            <div className="font-londrina-shadow">
              <h2 className="text-4xl font-semibold flex gap-2 justify-center items-center">
                <ChevronRight /> You <ChevronLeft />
              </h2>
            </div>
          ) : (
            <div className="font-londrina-shadow">
              <h2 className="text-4xl font-semibold">{player.fullName}</h2>
            </div>
          )}
        </div>
        <div className="h-[180px] flex flex-col items-center justify-end relative">
          {/* Image */}
          <Image
            src={catImages[playerIndex]}
            alt="Cat Avatar"
            width={150}
            height={150}
            className="rounded-xl relative z-10"
          />
          {/* Horizontal line as a stand */}
          <div className="w-[150px] h-[3px] bg-foreground rounded" />
        </div>
      </>
    )
  } else {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[150px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }
}

export default LobbyPaticipants