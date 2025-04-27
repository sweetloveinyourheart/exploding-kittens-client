"use client"

import { useGrpcClient } from "@/lib/grpc/hooks/grpc-client";
import { Lobby } from "@sweetloveinyourheart/exploding-kittens-client-core";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "sonner";
import LobbyPaticipant from "./lobby-paticipant";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { GAME_ROUTER, HOME_ROUTER } from "@/constants/routers";

interface GameLobbyProps {
    userId: string
    lobbyData: string
}

const GameLobby: FunctionComponent<GameLobbyProps> = ({ userId, lobbyData }) => {
    const [lobby, setLobby] = useState<Lobby>(JSON.parse(lobbyData))

    const { client, isAuthenticated } = useGrpcClient()
    const router = useRouter()

    // Stream
    useEffect(() => {
        if (!isAuthenticated) {
            return
        }

        // Start streaming when the grpc client is authenticated
        (async () => {
            await client.streamLobbyWithCallBacks(
                { lobbyId: lobby.lobbyId },
                {
                    onDataStreaming: (res) => {
                        if (res.lobby) {
                            setLobby(res.lobby)
                        } else {
                            router.push(HOME_ROUTER)
                        }
                    },
                    onError: (err) => toast("Unable to fetch lobby data", { description: err.message })
                }
            )
        })()
    }, [isAuthenticated])

    // Listen to match started events
    useEffect(() => {
        if (lobby?.matchId) {
            router.push(`${GAME_ROUTER}/${lobby.matchId}`)
        }
    }, [lobby?.matchId])

    // Listen to user has left events
    useEffect(() => {
        if (lobby && userId && !lobby.participants?.includes(userId)) {
            router.push(HOME_ROUTER)
        }
    }, [lobby?.participants])

    const leaveLobby = async () => {
        const res = await client.leaveLobby({ lobbyId: lobby.lobbyId })
        if (res.error != null) {
            toast.error("Error leave lobby", {
                description: res.error.message
            })
            return
        }

        router.push(HOME_ROUTER)
    }

    const startGame = async () => {
        const err = await client.startGame({ lobbyId: lobby.lobbyId })
        if (err) {
            toast.error("Error starting new game", {
                description: err.message,
            })
            return
        }
    }

    const canStartNewGame =
        userId === lobby?.hostUserId &&
        (lobby?.participants.length ?? 0) >= 2;

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
                    disabled={!canStartNewGame}
                    onClick={startGame}
                >
                    Start Game
                </Button>
            </div>
        </div>
    );
}

export default GameLobby;