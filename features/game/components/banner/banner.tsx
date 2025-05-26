import ActionBanner, { ActionBannerHandle } from "@/components/action-banner";
import { CardEffect } from "@/constants/card-effects";
import { GameState } from "@/types/game";
import { Game_Phase, User } from "@sweetloveinyourheart/exploding-kittens-client-core";
import { FunctionComponent, useEffect, useRef } from "react";

interface GameActionBannerProps {
    gameState: GameState
    players: User[]
}

const GameActionBanner: FunctionComponent<GameActionBannerProps> = ({ gameState, players }) => {
    const bannerRef = useRef<ActionBannerHandle>(null);

    const triggerMessage = (message: string) => {
        bannerRef.current?.addMessage(message);
    };

    useEffect(() => {
        if (gameState && gameState.gamePhase === Game_Phase.ACTION_PHASE) {
            const playerName = players.find(p => p.userId === gameState.playerTurn)?.fullName || "Unknown";
            const affectedPlayerName = players.find(p => p.userId === gameState.affectedPlayer)?.fullName;

            switch (gameState.executingAction) {
                case CardEffect.StealCard:
                    triggerMessage(`${playerName} is stealing a card ${affectedPlayerName ? `from ${affectedPlayerName}` : ""}`);
                    return
                case CardEffect.StealRandomCard:
                    triggerMessage(`${playerName} is stealing a random card ${affectedPlayerName ? `from ${affectedPlayerName}` : ""}`);
                    return
                case CardEffect.StealNamedCard:
                    triggerMessage(`${playerName} is stealing a named card ${affectedPlayerName ? `from ${affectedPlayerName}` : ""}`);
                    return
                case CardEffect.PeekCards:
                    triggerMessage(`${playerName} is seeing the future cards`);
                    return
            }
        }
    }, [gameState]);

    return (
        <ActionBanner ref={bannerRef} />
    );
}

export default GameActionBanner;