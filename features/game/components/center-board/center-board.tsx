import DiscardPile from "@/components/discard-pile";
import GameDesk from "@/components/game-desk";
import { DeskState, GameState } from "@/types/game";
import { FunctionComponent } from "react";
import { CardEffect } from "@/constants/card-effects"
import { useGameAction } from "../../hooks/game-action";

interface CenterBoardProps {
    deskState: DeskState
    gameState: GameState
    userId: string
}

const CenterBoard: FunctionComponent<CenterBoardProps> = ({ gameState, deskState, userId }) => {
    const actionTriggered = gameState.executingAction == CardEffect.PeekCards && gameState.playerTurn == userId

    const { openGameAction } = useGameAction()
    
    const onSeeTheFuture = () => {
        openGameAction(CardEffect.PeekCards)
    }

    return (
        <div className="flex justify-center items-center gap-12">
            {/* Deck */}
            <GameDesk 
                desk={deskState} 
                actionTriggered={actionTriggered}
                onExecuteAction={onSeeTheFuture}
            />

            {/* Discard Pile */}
            <DiscardPile discardPile={deskState.discardPile} />
        </div>
    );
}

export default CenterBoard;