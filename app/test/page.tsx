"use client"

import CardDeck from "@/components/card-desk"
import DeckInsertSelector from "@/components/card-slider"
import Image from "next/image"
import Table from "@/assets/images/table.png"
import { Button } from "@/components/ui/button"
import { FullscreenNotification } from "@/components/full-screen-noti"
import { useRef, useState } from "react"
import { DeskState, PlayerState } from "@/types/game"
import GamePlayer from "@/components/game-player"
import { GamePlayerAction } from "@/types/player"
import ActionBanner, { ActionBannerHandle } from "@/components/action-banner"

export default function Test() {
    const [showNotif, setShowNotif] = useState(false)
    const bannerRef = useRef<ActionBannerHandle>(null);

    const triggerMessage = (message: string) => {
        bannerRef.current?.addMessage(message);
    };

    return (
        <main className="p-4">
            <div className="mb-4">
                <h1 className="text-4xl font-bold">Welcome to Exploding Kittens</h1>
                <p className="text-lg">This is a UI test page.</p>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Card Slider</h2>
                <p className="text-md mb-2">Card slider is a component that allows users to select a card from a range of options.</p>
                <div className="relative bg-foreground/50 h-[500px] w-[768px] overflow-hidden rounded-lg shadow-lg">
                    {/* Background Image */}
                    <div className="absolute inset-0 -z-10">
                        <Image
                            src={Table}
                            alt="Exploding Kittens Background"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </div>
                    <div className="flex justify-center items-center h-full">
                        <DeckInsertSelector loading={false} cardNumber={30} onSelectIndex={(index) => console.log(`Selected card index: ${index}`)} />
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <h1 className="text-4xl font-bold">Desk</h1>
                <p className="text-lg">This is a UI test page.</p>
                <div className="relative  h-[500px] w-[768px] overflow-hidden rounded-lg shadow-lg">
                    {/* Background Image */}
                    <div className="absolute inset-0 -z-10">
                        <Image
                            src={Table}
                            alt="Exploding Kittens Background"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </div>
                    <div className="flex justify-center items-center h-full">
                        <CardDeck actionTriggered onExecuteAction={() => console.log("Action executed")} loading={false} desk={{ remainingCards: 6 } as DeskState} action={null} />
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <h1 className="text-4xl font-bold">FullScreen Notification</h1>
                <p className="text-lg">This is a UI test page.</p>
                <Button onClick={() => setShowNotif(true)}>Trigger Notification</Button>

                <FullscreenNotification
                    message="Your Turn"
                    show={showNotif}
                    duration={1000}
                    onClose={() => setShowNotif(false)}
                />
            </div>
            <div className="mb-4">
                <h1 className="text-4xl font-bold">Game Player</h1>
                <p className="text-lg">This is a UI test page.</p>
                <div className="relative  h-[500px] w-[768px] overflow-hidden rounded-lg shadow-lg">
                    {/* Background Image */}
                    <div className="absolute inset-0 -z-10">
                        <Image
                            src={Table}
                            alt="Exploding Kittens Background"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </div>
                    <div className="flex justify-center items-center h-full">
                        <GamePlayer
                            player={{ name: "Player 1", count: 8, playerId: "1", active: true } as PlayerState}
                            playerIndex={3}
                            playerTurnId="2"
                            action={GamePlayerAction.StealCard}
                            actionTriggered={true}
                            onExecuteAction={() => console.log("Action executed")}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h1 className="text-4xl font-bold">Game Banner</h1>
                <p className="text-lg">This is a UI test page.</p>
                <div className="relative  h-[500px] w-[768px] overflow-hidden rounded-lg shadow-lg">
                    {/* Background Image */}
                    <div className="absolute inset-0 -z-10">
                        <Image
                            src={Table}
                            alt="Exploding Kittens Background"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </div>

                    <div className="flex flex-col justify-center items-center h-full">
                        <ActionBanner ref={bannerRef} delay={2000} />
                        <Button onClick={() => triggerMessage("New banner message")}>Trigger Banner</Button>
                    </div>
                </div>
            </div>
        </main>
    )
}