import { FunctionComponent } from "react";
import { Card } from "./ui/card";
import { DeskState } from "@/types/game";
import { Button } from "./ui/button";
import { DeskAction } from "@/types/desk";

interface GameDeskProps {
    desk: DeskState | undefined
    action: DeskAction | null
    actionTriggered: boolean
    onExecuteAction: () => void
}

const GameDesk: FunctionComponent<GameDeskProps> = ({ desk, action, actionTriggered, onExecuteAction }) => {
    if (!desk) {
        return null
    }

    return (
        <Card className="w-40 h-60 flex items-center justify-center text-white shadow-lg rounded-2xl">
            <div className="text-center">
                <p className="text-lg font-bold">Deck</p>
                <p className="text-sm">Remain cards ({desk.remainingCards})</p>
            </div>
            {actionTriggered && action
                ? <Button onClick={() => onExecuteAction()}>{action}</Button>
                : null
            }
        </Card>
    );
}

export default GameDesk;