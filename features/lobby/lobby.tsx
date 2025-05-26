"use client"

import { useGrpcClient } from "@/lib/hooks/grpc-client"
import { Lobby } from "@sweetloveinyourheart/exploding-kittens-client-core"
import { FunctionComponent, useEffect, useState } from "react"
import { toast } from "sonner"
import LobbyPaticipant from "./components/lobby-paticipant"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { GAME_ROUTER, HOME_ROUTER } from "@/constants/routers"
import LobbyHUDHeader from "./components/lobby-hud"

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

    const startMatch = async () => {
        const err = await client.startMatch({ lobbyId: lobby.lobbyId })
        if (err) {
            toast.error("Error starting new match", {
                description: err.message,
            })
            return
        }
    }

    const canStartNewMatch =
        userId === lobby?.hostUserId &&
        (lobby?.participants.length ?? 0) >= 2

    if (!lobby) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-muted-foreground">Loading lobby...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen">
            {/* 1. Header Section */}
            <LobbyHUDHeader
                lobbyId={lobby.lobbyId}
                lobbyName={lobby.lobbyName}
                lobbyCode={lobby.lobbyCode}
            />

            {/* 2. Players Grid Section (flex-grow) */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="flex justify-center items-center gap-9 flex-wrap">
                    <AnimatePresence>
                        {lobby?.participants.map((playerId, index) => (
                            <motion.div
                                key={playerId}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <LobbyPaticipant 
                                    playerId={playerId} 
                                    userId={userId}
                                    host={lobby.hostUserId === playerId}
                                    playerIndex={index} 
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* 3. Action Buttons Section */}
            <div className="flex justify-center h-[120px] gap-3">
                <Button
                    className="w-[200px] h-[50px]"
                    disabled={!canStartNewMatch}
                    variant={"wacky"}
                    onClick={startMatch}
                >
                    Start Game
                </Button>
            </div>
        </div>
    );

}

export default GameLobby