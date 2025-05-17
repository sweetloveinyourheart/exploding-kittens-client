import { FunctionComponent } from "react";
import { Card } from "./ui/card";
import { DeskState } from "@/types/game";
import { Button } from "./ui/button";

interface GameDeskProps {
    desk: DeskState | undefined
    actionTriggered: boolean
    onExecuteAction: () => void
}

const GameDesk: FunctionComponent<GameDeskProps> = ({ desk, actionTriggered, onExecuteAction }) => {
    if (!desk) {
        return null
    }

    return (
        <Card className="w-40 h-60 flex items-center justify-center text-white shadow-lg rounded-2xl">
            {!actionTriggered
                ? (
                    <div className="text-center">
                        <p className="text-lg font-bold">Deck</p>
                        <p className="text-sm">Remain cards ({desk.remainingCards})</p>
                    </div>
                )
                : (
                    <Button onClick={() => onExecuteAction()}>See The Future</Button>
                )
            }
        </Card>
    );
}

export default GameDesk;