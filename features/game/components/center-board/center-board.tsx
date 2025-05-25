import DiscardPile from "@/components/discard-pile"
import { DeskState, GameState, UserState } from "@/types/game"
import { FunctionComponent, useEffect, useState } from "react"
import { CardEffect } from "@/constants/card-effects"
import { useGameAction } from "../../hooks/game-action"
import { DeskAction, DiscardPileAction } from "@/types/desk"
import { useGrpcClient } from "@/lib/hooks/grpc-client"
import { toast } from "sonner"
import { Game_Phase } from "@sweetloveinyourheart/exploding-kittens-client-core"
import { Card } from "@/constants/cards"
import CardSlider from "@/components/card-slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CardDeck from "@/components/card-desk"

interface CenterBoardProps {
    deskState: DeskState
    gameState: GameState
    userState: UserState
    userId: string
}

const CenterBoard: FunctionComponent<CenterBoardProps> = ({ gameState, deskState, userState, userId }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [deskAction, setDeskAction] = useState<DeskAction | null>(null)
    const [deskActionTriggered, setDeskActionTriggered] = useState<boolean>(false)

    const [discardPileAction, setDiscardPileAction] = useState<DiscardPileAction | null>(null)
    const [discardPileActionTriggered, setDiscardPileActionTriggered] = useState<boolean>(false)

    const [isCardSliderOpen, setIsCardSliderOpen] = useState<boolean>(false)

    const { client, isAuthenticated } = useGrpcClient()

    // Helper to reset all actions and UI states
    const resetActions = () => {
        setDeskActionTriggered(false)
        setDeskAction(null)
        setDiscardPileActionTriggered(false)
        setDiscardPileAction(null)
        setIsCardSliderOpen(false)
        setLoading(false)
    }

    useEffect(() => {
        const isPlayerTurn = gameState.playerTurn === userId

        if (gameState.executingAction === CardEffect.PeekCards &&
            gameState.gamePhase === Game_Phase.ACTION_PHASE &&
            isPlayerTurn
        ) {
            setDeskActionTriggered(true)
            setDeskAction(DeskAction.SeeTheFuture)
            setDiscardPileActionTriggered(false)
            setDiscardPileAction(null)
            setIsCardSliderOpen(false)
            return
        }

        if (!gameState.executingAction &&
            gameState.gamePhase === Game_Phase.TURN_START &&
            isPlayerTurn
        ) {
            setDeskActionTriggered(true)
            setDeskAction(DeskAction.Draw)
            setDiscardPileActionTriggered(false)
            setDiscardPileAction(null)
            setIsCardSliderOpen(false)
            return
        }

        if (gameState.gamePhase === Game_Phase.EXPLODING_DRAWN && isPlayerTurn) {
            setDiscardPileActionTriggered(true)
            setDiscardPileAction(DiscardPileAction.Defuse)
            setDeskActionTriggered(false)
            setDeskAction(null)
            setIsCardSliderOpen(false)
            return
        }

        if (gameState.gamePhase === Game_Phase.EXPLODING_DEFUSED && isPlayerTurn) {
            setIsCardSliderOpen(true)
            setDeskActionTriggered(false)
            setDeskAction(null)
            setDiscardPileActionTriggered(false)
            setDiscardPileAction(null)
            return
        }

        resetActions()
    }, [gameState, userId])

    const { openGameAction } = useGameAction()

    const onExecuteDeskAction = async () => {
        setLoading(true)

        if (deskAction === DeskAction.SeeTheFuture) {
            openGameAction(CardEffect.PeekCards)
        }

        if (deskAction === DeskAction.Draw) {
            const err = await client.DrawCard({ gameId: gameState.gameId })
            if (err) {
                toast("Failed to draw cards. Please try again.")
            }
        }

        setLoading(false)
    }

    const onExecuteDiscardPileAction = async () => {
        if (discardPileAction === DiscardPileAction.Defuse) {
            setLoading(true)
            const defuseCard = userState.cards.find(card => card.code === Card.Defuse)

            // If the player has a defuse card, they can discard it to defuse the exploding kitten
            // If not, they lose the game
            const err = await client.DefuseExplodingKitten({ gameId: gameState.gameId, cardId: defuseCard?.cardId })
            if (err) {
                toast("Failed to discard cards. Please try again.")
            }

            setLoading(false)
        }
    }

    const onPlantExplodingCard = async (index: number) => {
        setLoading(true)

        const err = await client.PlantExplodingKitten({
            gameId: gameState.gameId,
            cardIndex: index,
        })

        if (err) {
            toast("Failed to plant the exploding kitten. Please try again.")
        }

        setLoading(false)
    }

    if (!isAuthenticated) {
        return <>Loading ...</>
    }

    return (
        <div className="h-full flex justify-center items-center gap-36">
            {/* Deck */}
            <CardDeck
                loading={loading}
                desk={deskState}
                action={deskAction}
                actionTriggered={deskActionTriggered}
                onExecuteAction={onExecuteDeskAction}
            />

            {/* Discard Pile */}
            <DiscardPile
                loading={loading}
                discardPile={deskState.discardPile}
                action={discardPileAction}
                actionTriggered={discardPileActionTriggered}
                onExecuteAction={onExecuteDiscardPileAction}
            />

            <Dialog open={isCardSliderOpen} onOpenChange={open => setIsCardSliderOpen(open)}>
                <DialogContent className="sm:max-w-[425px] md:max-w-[625px] lg:max-w-[825px]">
                    <DialogHeader>
                        <DialogTitle>Choose an index to place your card</DialogTitle>
                    </DialogHeader>
                    <CardSlider
                        loading={loading}
                        cardNumber={deskState.remainingCards}
                        onSelectIndex={onPlantExplodingCard}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CenterBoard