import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CardEffect } from "@/constants/card-effects";
import { FunctionComponent } from "react";
import { useGameAction } from "../../hooks/game-action";
import SeeTheFuture from "./see-the-future";
import StealRandomCard from "./steal-random-card";
import StealNamedCard from "./steal-named-card";
import { DeskState, GameState, PlayerState } from "@/types/game";

interface GameActionsProps { 
    gameState: GameState
    deskState: DeskState
    playerStates: PlayerState[]
}

const GameActions: FunctionComponent<GameActionsProps> = ({ gameState, deskState, playerStates }) => {
    const { isOpen, executingAction, onGameActionChange } = useGameAction()

    const renderGameAction = () => {
        switch (executingAction) {
            case CardEffect.PeekCards:
                return <SeeTheFuture gameId={gameState.gameId} deskId={deskState.deskId} />

            case CardEffect.StealRandomCard:
                const affectedPlayer = playerStates.find(playerState => playerState.playerId === gameState.affectedPlayer)
                return <StealRandomCard gameId={gameState.gameId} affectedPlayer={affectedPlayer!} />

            case CardEffect.StealNamedCard:
                return <StealNamedCard gameId={gameState.gameId} />

            default:
                return null
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onGameActionChange}>
            <DialogContent className="sm:max-w-[425px] md:max-w-[625px] lg:max-w-[825px] bg-transparent border-none shadow-none">
                <DialogHeader className="hidden"><DialogTitle>Dummy</DialogTitle></DialogHeader>
                {renderGameAction()}
            </DialogContent>
        </Dialog>
    );
}

export default GameActions;