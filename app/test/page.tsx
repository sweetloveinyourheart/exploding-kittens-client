"use client"

import CardDeck from "@/components/card-desk"
import DeckInsertSelector from "@/components/card-slider"
import Image from "next/image"
import Table from "@/assets/images/table.png"

export default function Test() {
    return (
        <main className="p-4">
            <div className="mb-4">
                <h1 className="text-4xl font-bold">Welcome to Exploding Kittens</h1>
                <p className="text-lg">This is a UI test page.</p>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Card Slider</h2>
                <p className="text-md mb-2">Card slider is a component that allows users to select a card from a range of options.</p>
                <div className="max-w-[400px] border rounded-lg p-4">
                    <DeckInsertSelector loading={false} cardNumber={30} onSelectIndex={(index) => console.log(`Selected card index: ${index}`)} />
                </div>
            </div>
            <div className="mb-4">
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
                        <CardDeck actionTriggered onExecuteAction={() => console.log("Action executed")} loading={false} desk={undefined} action={null}/>
                    </div>
                </div>
            </div>
        </main>
    )
}