import { FunctionComponent } from "react";
import { Card } from "./ui/card";
import { PlayerState } from "@/types/game";
import { SunIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button";

interface GamePlayerProps {
    player: PlayerState
    actionTriggered: boolean
    onExecuteAction: () => void
}

const GamePlayer: FunctionComponent<GamePlayerProps> = ({ player, actionTriggered, onExecuteAction }) => {
    return (
        <div className="flex flex-col items-center">
            <Card className="p-2 rounded-xl min-w-[150px]">
                <div className="text-center">
                    <div className="text-2xl"><SunIcon /></div>
                    <div className="text-sm">{player.name}</div>
                    <div className="text-xs">{player.count} cards</div>
                </div>
                {actionTriggered && (
                    <Button onClick={onExecuteAction}>Steal</Button>
                )}
            </Card>
        </div >
    );
}

export default GamePlayer;