export enum CardEffect {
    Explore = "explode",
    PreventExplore = "prevent_explode",
    CancelAction = "cancel_action",
    SkipTurnAndAttack = "skip_turn_and_attack",
    SkipTurn = "skip_turn",
    StealCard = "steal_card",
    ShuffleDeck = "shuffle_deck",
    PeekCards = "peek_cards",
    StealRandomCard = "steal_random_card",
    StealNamedCard = "steal_named_card",
}
export const cardEffectMap: Record<string, string> = {
    [CardEffect.Explore]: "explode",
    [CardEffect.PreventExplore]: "defuse_explosion",
    [CardEffect.CancelAction]: "cancel_action",
    [CardEffect.SkipTurnAndAttack]: "skip_turn_and_attack",
    [CardEffect.SkipTurn]: "skip_turn",
    [CardEffect.StealCard]: "steal_card",
    [CardEffect.ShuffleDeck]: "shuffle_deck",
    [CardEffect.PeekCards]: "peek_cards",
    [CardEffect.StealRandomCard]: "steal_random_card",
    [CardEffect.StealNamedCard]: "steal_named_card",
}

export const cardEffectLabelMap: Record<string, string> = {
    [CardEffect.Explore]: "Explode",
    [CardEffect.PreventExplore]: "Defuse Explosion",
    [CardEffect.CancelAction]: "Nope (Cancel Action)",
    [CardEffect.SkipTurnAndAttack]: "Skip Turn & Attack",
    [CardEffect.SkipTurn]: "Skip Turn",
    [CardEffect.StealCard]: "Steal a Card",
    [CardEffect.ShuffleDeck]: "Shuffle the Deck",
    [CardEffect.PeekCards]: "Peek at Top Cards",
    [CardEffect.StealRandomCard]: "Steal Random Card (Combo)",
    [CardEffect.StealNamedCard]: "Steal Named Card (Combo)",
}