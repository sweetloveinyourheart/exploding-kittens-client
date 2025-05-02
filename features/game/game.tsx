"use client";

import DiscardPile from "@/components/discard-pile";
import GameDesk from "@/components/game-desk";
import GamePlayer from "@/components/game-player";
import { useGameDataProvider } from "@/lib/hooks/game-data-provider";
import { useGrpcClient } from "@/lib/hooks/grpc-client";
import { DeskState, PlayerState, UserState } from "@/types/game";
import { Card, Game_Desk, Game_Player, Game_PlayerHand, User } from "@sweetloveinyourheart/exploding-kittens-client-core";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "sonner";
import Hand from "./hand/hand";

interface GamePlayProps {
    gameId: string
    userId: string
    players: string
}

const GamePlay: FunctionComponent<GamePlayProps> = ({ gameId, userId, players }) => {
    const playersData: User[] = JSON.parse(players)

    const [playerStates, setPlayerStates] = useState<PlayerState[]>([])
    const [deskState, setDeskState] = useState<DeskState>()
    const [discardPile, setDiscardPile] = useState<Card[]>([])

    const [userState, setUserState] = useState<UserState>({ active: true, cards: [], name: "Kitten" })

    const { client, isAuthenticated } = useGrpcClient()
    const { cards, isLoading } = useGameDataProvider()

    // Stream
    useEffect(() => {
        if (!isAuthenticated || isLoading) {
            return
        }

        // Start streaming when the grpc client is authenticated
        (async () => {
            await client.streamGameWithCallBacks(
                { gameId: gameId },
                {
                    onDataStreaming: (res) => {
                        if (res.gameState) {
                            buildPlayerData(res.gameState.players, res.gameState.playerHands)
                            buildDeskData(res.gameState.desk)
                            buildDiscardPileData(res.gameState.discardPile)
                        } else {
                            toast("Stream error")
                        }
                    },
                    onError: (err) => toast("Unable to fetch lobby data", { description: err.message })
                }
            )
        })()
    }, [isAuthenticated, isLoading])

    const buildPlayerData = (gamePlayers: Game_Player[], gamePlayerHands: Record<string, Game_PlayerHand>) => {
        const buildData = (playerHand: Game_PlayerHand): Card[] => {
            const userCards: Card[] = []
            playerHand.hands.forEach(cardId => {
                const cardDetail = cards.get(cardId)
                if (cardDetail) {
                    userCards.push(cardDetail)
                }
            })

            return userCards
        }

        const states: PlayerState[] = []
        gamePlayers.forEach((player) => {
            const playerHand: Game_PlayerHand | undefined = gamePlayerHands[player.playerId]
            const playerInfo: User | undefined = playersData.find(p => p.userId === player.playerId)

            if (player.playerId === userId) {
                const userCards = buildData(playerHand)
                setUserState({
                    active: player.active,
                    cards: userCards,
                    name: playerInfo?.fullName || "Kitten",
                })
            } else {
                states.push({
                    active: player.active,
                    count: playerHand?.remainingCards || 0,
                    name: playerInfo?.fullName || "Kitten",
                })
            }
        })

        setPlayerStates(states)
    }

    const buildDeskData = (gameDesk: Game_Desk | undefined) => {
        setDeskState(gameDesk)
    }

    const buildDiscardPileData = (gameDiscardPile: string[]) => {
        const discardCards: Card[] = []
        gameDiscardPile.forEach(cardId => {
            const cardDetail = cards.get(cardId)
            if (cardDetail) {
                discardCards.push(cardDetail)
            }
        })

        setDiscardPile(discardCards)
    }

    return (
        <div className="flex flex-col h-screen relative overflow-hidden">
            {/* Top Players */}
            <div className="flex justify-center gap-6 mb-6 h-1/6">
                {playerStates.map((player, index) => (
                    <GamePlayer player={player} key={`${player.name}_${index}`} />
                ))}
            </div>

            {/* Center Board */}
            <div className="flex-1 flex justify-center items-center gap-12">
                {/* Deck */}
                <GameDesk desk={deskState} />

                {/* Discard Pile */}
                <DiscardPile discardPile={discardPile} />
            </div>

            {/* Bottom Hand */}
            <div className="flex flex-col justify-center mt-8 h-1/6 p-6">
                <Hand userState={userState} />
            </div>
        </div>
    );
}

export default GamePlay