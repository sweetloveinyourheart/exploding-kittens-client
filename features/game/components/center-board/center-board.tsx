import DiscardPile from "@/components/discard-pile";
import GameDesk from "@/components/game-desk";
import { DeskState } from "@/types/game";
import { FunctionComponent } from "react";

interface CenterBoardProps {
    deskState: DeskState   
}

const CenterBoard: FunctionComponent<CenterBoardProps> = ({ deskState }) => {
    return (
        <div className="flex justify-center items-center gap-12">
            {/* Deck */}
            <GameDesk desk={deskState} />

            {/* Discard Pile */}
            <DiscardPile discardPile={deskState.discardPile} />
        </div>
    );
}

export default CenterBoard;