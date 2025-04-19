"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGrpcClient } from "@/lib/grpc/hooks/grpc-client";
import { User } from "@sweetloveinyourheart/exploding-kittens-client-core";
import { FunctionComponent, useEffect, useState } from "react";

interface LobbyPaticipantsProps {
  playerId: string
}

const LobbyPaticipants: FunctionComponent<LobbyPaticipantsProps> = ({ playerId }) => {
  const [player, setPlayer] = useState<User | null>(null)

  const { client } = useGrpcClient()

  useEffect(() => {
    (async () => {
      const response = await client.getPlayerProfile({ userId: playerId })
      if (response.data && response.data.user) {
        setPlayer(response.data.user)
      } else {
        setPlayer(null)
      }
    })()
  }, [client])

  if (player) {
    return (
      <Card className="w-[280px] bg-muted/20 text-white shadow-xl rounded-2xl border border-muted">
        <CardHeader className="flex items-center space-x-4 py-4 px-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-primary text-white">
              {player.fullName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-lg font-medium leading-tight">
              {player.fullName}
            </CardTitle>
            <p className="text-sm text-muted-foreground">@{player.username}</p>
          </div>
        </CardHeader>
      </Card>
    );
  } else {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }
}

export default LobbyPaticipants;