import { FunctionComponent } from "react";
import { Card } from "./ui/card";
import { DeskState } from "@/types/game";

interface GameDeskProps {
    desk: DeskState | undefined
}

const GameDesk: FunctionComponent<GameDeskProps> = ({ desk }) => {
    if (!desk) {
        return null
    }

    return (
        <Card className="w-40 h-60 flex items-center justify-center text-white shadow-lg rounded-2xl">
            <div className="text-center">
                <p className="text-lg font-bold">Deck</p>
                <p className="text-sm">Remain cards ({desk.remainingCards})</p>
            </div>
        </Card>
    );
}

export default GameDesk;