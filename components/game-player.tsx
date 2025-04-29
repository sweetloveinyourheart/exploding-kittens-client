import { FunctionComponent } from "react";
import { Card } from "./ui/card";
import { PlayerState } from "@/types/game";
import { SunIcon } from "@radix-ui/react-icons"

interface GamePlayerProps {
    player: PlayerState
}

const GamePlayer: FunctionComponent<GamePlayerProps> = ({ player }) => {
    return (
        <div className="flex flex-col items-center">
            <Card className="text-white p-2 rounded-xl min-w-[200px] text-center">
                <div className="text-2xl"><SunIcon /></div>
                <div className="text-sm">{player.name}</div>
                <div className="text-xs">{player.count} cards</div>
            </Card>
        </div>
    );
}

export default GamePlayer;