// Card effects
export const Explore = "explode";
export const PreventExplore = "prevent_explode";
export const CancelAction = "cancel_action";
export const SkipTurnAndAttack = "skip_turn_and_attack";
export const SkipTurn = "skip_turn";
export const StealCard = "steal_card";
export const ShuffleDeck = "shuffle_deck";
export const PeekCards = "peek_cards";

// Combo effects
export const StealRandomCard = "steal_random_card";
export const StealNamedCard = "steal_named_card";

// All card effects
export const AllCardEffects: string[] = [
    Explore,
    PreventExplore,
    CancelAction,
    SkipTurnAndAttack,
    SkipTurn,
    StealCard,
    ShuffleDeck,
    PeekCards,
    StealRandomCard,
    StealNamedCard,
];

export const labelMap: Record<string, string> = {
    explode: "Explode",
    prevent_explode: "Defuse Explosion",
    cancel_action: "Nope (Cancel Action)",
    skip_turn_and_attack: "Skip Turn & Attack",
    skip_turn: "Skip Turn",
    steal_card: "Steal a Card",
    shuffle_deck: "Shuffle the Deck",
    peek_cards: "Peek at Top Cards",
    steal_random_card: "Steal Random Card (Combo)",
    steal_named_card: "Steal Named Card (Combo)",
};