"use client"

import DeckInsertSelector from "@/components/card-slider"

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
                    <DeckInsertSelector loading={false} cardNumber={30} onSelectIndex={(index) => console.log(`Selected card index: ${index}`)}/>
                </div>
            </div>
        </main>
    )
}