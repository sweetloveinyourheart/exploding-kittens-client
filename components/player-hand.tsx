import { FunctionComponent } from "react"
import { cn, padTo2Digits } from "@/lib/utils"
import { Card as CardData } from "@sweetloveinyourheart/exploding-kittens-client-core"
import Kittens from "./kittens"

interface PlayerHandProps {
    cards: CardData[]
    selectedCards: string[]
    onSelectCard: (cardId: string, index: number) => void
}

export function visualizeCardId(cardId: string, index: number): string {
    return `${cardId}_${padTo2Digits(index)}`
}

export function getCardIdFromVisualizeCard(visualizeCardId: string): string {
    return visualizeCardId.split("_")[0]
}

const PlayerHand: FunctionComponent<PlayerHandProps> = ({ cards, selectedCards, onSelectCard }) => {
    return (
        <>
            {cards.map((card, idx, arr) => {
                const overlap = 80 // horizontal distance between cards
                const centerIndex = Math.floor(arr.length / 2) // find the center index
                const offsetX = (idx - centerIndex) * overlap // calculate offset relative to the center
                const isSelected = selectedCards.includes(visualizeCardId(card.cardId, idx))

                return (
                    <div
                        key={idx}
                        className={cn(
                            "w-50 h-80 absolute transition-all duration-300 cursor-pointer rounded-xl border",
                            isSelected ? "-translate-y-5" : "hover:-translate-y-5"
                        )}
                        style={{
                            left: `calc(50% - 80px)`, // center the cards by subtracting half of their width (80px)
                            transform: `translateX(${offsetX}px)`, // offset the card based on the center
                        }}
                        onClick={() => onSelectCard(card.cardId, idx)}
                    >
                        <Kittens code={card.code} />
                    </div>
                )
            })}
        </>
    )
}

export default PlayerHand