import * as Card from "@/constants/cards"
import { ComboCards, MustPlayAlone } from "@/constants/card-rules"

type ValidationResult = {
    valid: boolean
    error: string | null
}

export function ValidateCardPlay(cardCodes: string[]): ValidationResult {
    if (cardCodes.length === 0) {
        return { valid: false, error: "no cards played" };
    }

    // Exploding kitten and defuse cannot be played manually
    for (const card of cardCodes) {
        if (card === Card.ExplodingKitten) {
            return { valid: false, error: "exploding kitten cannot be played manually" };
        }
        if (card === Card.Defuse) {
            return { valid: false, error: "defuse card cannot be played on your turn" };
        }
    }

    // If playing one card, allow it if it's a known card
    if (cardCodes.length === 1) {
        const card = cardCodes[0];
        if (MustPlayAlone[card]) {
            return { valid: true, error: null };
        }
        return { valid: false, error: `card '${card}' cannot be played alone` };
    }

    // If multiple cards
    // Rule 1: no MustPlayAlone card can be combined
    for (const card of cardCodes) {
        if (MustPlayAlone[card]) {
            return { valid: false, error: `card '${card}' must be played alone` };
        }
    }

    // Rule 2: handle combo validation
    const counts: Record<string, number> = {};
    const unique: Record<string, boolean> = {};

    for (const card of cardCodes) {
        if (!ComboCards[card]) {
            return { valid: false, error: `card '${card}' cannot be used in combos` };
        }
        counts[card] = (counts[card] || 0) + 1;
        unique[card] = true;
    }

    switch (cardCodes.length) {
        case 2:
            // must be 2 of the same combo card
            for (const count of Object.values(counts)) {
                if (count !== 2) {
                    return { valid: false, error: "2-card combo must be two of the same combo card" };
                }
            }
            break;
        case 3:
            // must be 3 of the same combo card
            for (const count of Object.values(counts)) {
                if (count !== 3) {
                    return { valid: false, error: "3-card combo must be three of the same combo card" };
                }
            }
            break;
        default:
            return { valid: false, error: "invalid number of cards for a combo play" };
    }

    return { valid: true, error: null };
}