import GamePlayer from "@/components/game-player";
import { GameState, PlayerState } from "@/types/game";
import { FunctionComponent } from "react";
import { gamePhaseToText, getLabelForEffect, getPlayerTurnName } from "@/features/game/helpers/play";
import { User } from "@sweetloveinyourheart/exploding-kittens-client-core";

interface GameHUDProps {
    userId: string
    playersData: User[]
    gameState: GameState
    playerStates: PlayerState[]
}

const GameHUD: FunctionComponent<GameHUDProps> = ({ userId, playersData, gameState, playerStates }) => {
    return (
        <div className="flex">
            <div className="w-60 p-6">
                <div>Phase: {gamePhaseToText(gameState?.gamePhase)} </div>
                <div>Turn: {getPlayerTurnName(userId, gameState?.playerTurn, playersData)}</div>
            </div>
            <div className="flex gap-6 p-6">
                {playerStates.map((player, index) => (
                    <GamePlayer player={player} key={`${player.name}_${index}`} />
                ))}
            </div>
            <div className="w-60 p-6">
                {gameState.executingAction && (
                    <div className="text-center">
                        <div className="text-xl font-bold">Executing Action</div>
                        <div className="text-md">{getLabelForEffect(gameState.executingAction)}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GameHUD;