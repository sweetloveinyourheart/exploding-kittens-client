"use client";

import { useGameDataProvider } from "@/lib/hooks/game-data-provider";
import { useGrpcClient } from "@/lib/hooks/grpc-client";
import { DeskState, GameState, PlayerState, UserState } from "@/types/game";
import { Card, Game, Game_Desk, Game_Player, Game_PlayerHand, User } from "@sweetloveinyourheart/exploding-kittens-client-core";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "sonner";
import Hand from "./components/hand/hand";
import CenterBoard from "./components/center-board/center-board";
import GameHUD from "./components/game-hud/game-hud";

interface GamePlayProps {
    gameId: string
    userId: string
    players: string
}

const GamePlay: FunctionComponent<GamePlayProps> = ({ gameId, userId, players }) => {
    const playersData: User[] = JSON.parse(players)

    const [gameState, setGameState] = useState<GameState>()
    const [deskState, setDeskState] = useState<DeskState>()
    
    const [playerStates, setPlayerStates] = useState<PlayerState[]>([])
    const [userState, setUserState] = useState<UserState>({ userId, active: true, cards: [], name: "Kitten" })

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
                            buildGameData(res.gameState)
                        } else {
                            toast("Stream error")
                        }
                    },
                    onError: (err) => toast("Unable to fetch lobby data", { description: err.message })
                }
            )
        })()
    }, [isAuthenticated, isLoading])

    const _buildPlayerData = (gamePlayers: Game_Player[], gamePlayerHands: Record<string, Game_PlayerHand>) => {
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
                    userId: player.playerId,
                    active: player.active,
                    cards: userCards,
                    name: playerInfo?.fullName || "Kitten",
                })
            } else {
                states.push({
                    playerId: player.playerId,
                    active: player.active,
                    count: playerHand?.remainingCards || 0,
                    name: playerInfo?.fullName || "Kitten",
                })
            }
        })

        setPlayerStates(states)
    }

    const _buildDeskData = (gameDesk: Game_Desk | undefined) => {
        if (!gameDesk) {
            return;
        }

        const { discardPile, ...desk } = gameDesk

        const discardCards: Card[] = []
        discardPile.forEach(cardId => {
            const cardDetail = cards.get(cardId)
            if (cardDetail) {
                discardCards.push(cardDetail)
            }
        })

        setDeskState({
            ...desk,
            discardPile: discardCards,
        })
    }

    const buildGameData = (game: Game) => {
        setGameState(s => ({
            ...s,
            gameId: game.gameId,
            gamePhase: game.gamePhase,
            playerTurn: game.playerTurn,
            executingAction: game.executingAction,
        }))

        _buildPlayerData(game.players, game.playerHands)
        _buildDeskData(game.desk)
    }

    if (!gameState || !deskState || isLoading) {
        return <>Loading ...</>
    }

    return (
        <div className="flex flex-col h-screen relative overflow-hidden">
            {/* HUD */}
            <div className="flex justify-between mb-6 h-1/6">
                <GameHUD 
                    gameState={gameState}
                    playerStates={playerStates}
                    playersData={playersData}
                    userId={userId}
                />
            </div>

            {/* Center Board */}
            <div className="flex-1">
                <CenterBoard deskState={deskState} />
            </div>

            {/* Bottom Hand */}
            <div className="flex flex-col justify-center mt-8 h-1/6 p-6">
                <Hand
                    gameState={gameState}
                    cardData={cards}
                    userState={userState}
                />
            </div>
        </div>
    );
}

export default GamePlay