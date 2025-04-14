"use client"

import { useGrpcClient } from "@/lib/hooks/grpc-client";
import { Lobby } from "@sweetloveinyourheart/exploding-kittens-client-core";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "sonner";
import LobbyPaticipant from "./lobby-paticipant";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { HOME_ROUTER } from "@/constants/routers";

interface GameLobbyProps {
    lobbyId: string
}

const GameLobby: FunctionComponent<GameLobbyProps> = ({ lobbyId }) => {
    const [lobby, setLobby] = useState<Lobby>()

    const { client, isAuthenticated } = useGrpcClient()
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            return
        }

        (async () => {
            try {
                for await (const res of client.streamLobby({ lobbyId })) {
                    if (res.lobby) {
                        setLobby(res.lobby)
                    }
                }
            } catch (error) {
                toast("Unable to fetch lobby data")
            }
        })()
    }, [isAuthenticated])

    const leaveLobby = async () => {
        const res = await client.leaveLobby({ lobbyId })
        if (res.error != null) {
            toast.error("Error leave lobby", {
                description: res.error?.message
            })
            return
        }

        router.push(HOME_ROUTER)
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center p-6 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-semibold">
                    Lobby Code: <span className="font-mono text-primary">{lobby?.lobbyCode}</span>
                </h1>
                <p className="text-gray-400">Waiting for players to join...</p>
            </div>

            <div className="flex justify-center items-center gap-6">
                <AnimatePresence>
                    {lobby?.participants.map((playerId) => (
                        <motion.div
                            key={playerId}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <LobbyPaticipant playerId={playerId} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="flex gap-3 mt-6">
                <Button 
                    variant={"outline"}
                    onClick={leaveLobby}
                >
                    Leave Lobby
                </Button>
                <Button 
                    disabled={session?.user?.userId !== lobby?.hostUserId}
                >
                    Start Game
                </Button>
            </div>
        </div>
    );
}

export default GameLobby;