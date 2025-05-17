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
import { useGameAction } from "./hooks/game-action";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CardEffect } from "@/constants/card-effects";
import SeeTheFuture from "./components/actions/see-the-future";
import StealNamedCard from "./components/actions/steal-named-card";
import { getLabelForEffect } from "./helpers/play";
import StealRandomCard from "./components/actions/steal-random-card";

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
    const { isOpen, executingAction, onGameActionChange } = useGameAction()

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
            affectedPlayer: game.affectedPlayer,
        }))

        _buildPlayerData(game.players, game.playerHands)
        _buildDeskData(game.desk)
    }

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

    if (!gameState || !deskState || isLoading) {
        return <>Loading ...</>
    }

    const renderGameAction = () => {
        switch (executingAction) {
            case CardEffect.PeekCards:
                return <SeeTheFuture gameId={gameState.gameId} deskId={deskState.deskId} />

            case CardEffect.StealRandomCard:
                const affectedPlayer = playerStates.find(playerState => playerState.playerId === gameState.affectedPlayer)
                return <StealRandomCard gameId={gameState.gameId} affectedPlayer={affectedPlayer!}/>
        
            case CardEffect.StealNamedCard:
                return <StealNamedCard gameId={gameState.gameId}/>

            default:
                return null
        }
    }

    return (
        <div className="flex flex-col h-screen relative overflow-hidden">
            {/* HUD */}
            <div className="flex flex-col mb-6 h-1/6">
                <GameHUD
                    gameState={gameState}
                    playerStates={playerStates}
                    playersData={playersData}
                    userId={userId}
                />
            </div>

            {/* Center Board */}
            <div className="flex-1">
                <CenterBoard
                    gameState={gameState}
                    deskState={deskState}
                    userId={userId}
                />
            </div>

            {/* Bottom Hand */}
            <div className="flex flex-col mt-8 h-1/6 p-6">
                <Hand
                    gameState={gameState}
                    userState={userState}
                />
            </div>

            {/* Game Action Dialog */}
            <Dialog open={isOpen} onOpenChange={onGameActionChange}>
                <DialogContent className="sm:max-w-[425px] md:max-w-[625px] lg:max-w-[825px]">
                    <DialogHeader>
                        <DialogTitle>{getLabelForEffect(gameState.executingAction as CardEffect)}</DialogTitle>
                    </DialogHeader>
                    {renderGameAction()}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default GamePlay