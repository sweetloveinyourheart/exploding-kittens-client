import { Card } from '../constants/cards';

// Cards that must be played alone
export const MustPlayAlone: Record<string, boolean> = {
    [Card.Attack]: true,
    [Card.Skip]: true,
    [Card.Favor]: true,
    [Card.Shuffle]: true,
    [Card.SeeTheFuture]: true,
    [Card.Nope]: true, // special case: reaction, not turn-based play
};

// Combo cards
export const ComboCards: Record<string, boolean> = {
    [Card.TacoCat]: true,
    [Card.Catermelon]: true,
    [Card.HairyPotatoCat]: true,
    [Card.RainbowRalphingCat]: true,
    [Card.BeardCat]: true,
};