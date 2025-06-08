import { FunctionComponent } from "react"
import { PlayerState } from "@/types/game"
import { GamePlayerAction } from "@/types/player"

import Cat1 from "@/assets/images/cats/1.png"
import Cat2 from "@/assets/images/cats/2.png"
import Cat3 from "@/assets/images/cats/3.png"
import Cat4 from "@/assets/images/cats/4.png"
import Cat5 from "@/assets/images/cats/5.png"
import Cat6 from "@/assets/images/cats/6.png"
import Image from "next/image"
import { Button } from "./ui/button"

const catImages = [Cat1, Cat2, Cat3, Cat4, Cat5, Cat6]

interface GamePlayerProps {
    player: PlayerState
    playerIndex: number
    playerTurnId: string
    action: GamePlayerAction | null
    actionTriggered: boolean
}

const GamePlayer: FunctionComponent<GamePlayerProps> = ({ player, playerIndex, playerTurnId, actionTriggered }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="font-londrina-solid">
                <h2 className="text-2xl font-bold text-foreground">{player.name}</h2>
            </div>

            <div className="h-[100px] flex flex-col items-center justify-end relative">
                {/* Backdrop */}
                {playerTurnId === player.playerId ? (
                    <div className="absolute w-[100px] h-[75px] bg-destructive/50 border border-foreground rounded-t-full z-0" />
                ) : (
                    <div className="absolute w-[100px] h-[75px] bg-foreground/50 rounded-t-full z-0" />
                )}

                {/* Image */}
                <Image
                    src={catImages[playerIndex]}
                    alt="Cat Avatar"
                    width={100}
                    height={100}
                    className="rounded-xl relative z-10"
                />

                {/* Horizontal line as a stand */}
                <div className="w-[100px] h-[3px] bg-background rounded z-1" />
            </div>

            {/* Card Count */}
            <div className="flex mb-2">
                {Array.from({ length: player.count }).map((_, index) => (
                    <div key={index} className="border w-[12px] h-[20px] bg-primary" />
                ))}
            </div>

            {actionTriggered && (
                <Button variant={"secondary"}>
                    Steal Card
                </Button>
            )}
        </div>
    )
}

export default GamePlayer