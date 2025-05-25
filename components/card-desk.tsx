// components/CardDeck.tsx
import Image from "next/image";
import ExplodingKittensImage from "@/assets/images/exploding-kittens.png"
import CatImage from "@/assets/images/cats/exp.png"
import { DeskState } from "@/types/game";
import { DeskAction } from "@/types/desk";
import { Button } from "./ui/button";
import { deskActionToText } from "@/features/game/helpers/play";

interface CardDeckProps {
  loading: boolean
  desk: DeskState | undefined
  action: DeskAction | null
  actionTriggered: boolean
  onExecuteAction: () => void
}

export default function CardDeck({ loading, desk, action, actionTriggered, onExecuteAction }: CardDeckProps) {
  const cardCount = 6;

  if (!desk) {
    return null;
  }

  return (
    <div className="relative w-48 h-64 transform -rotate-[20deg]">
      {Array.from({ length: cardCount }).map((_, index) => {
        const offset = (cardCount - index - 1) * 2;
        return (
          <div
            key={index}
            className="absolute w-full h-full"
            style={{
              top: `${offset}px`,
              right: `${offset}px`,
              zIndex: index,
            }}
          >
            <div
              className="flex flex-col justify-center items-center w-[192px] h-[256px] p-4 rounded-md shadow-xl"
              style={{
                background: index === cardCount - 1 ? 'linear-gradient(to bottom, #93291E, #ED213A, #93291E)' : '#FFF',
              }}
            >
              <div className="mb-4">
                <Image
                  src={CatImage}
                  alt="Cat"
                  width={100}
                  height={100}
                />
              </div>
              <Image
                src={ExplodingKittensImage}
                alt="Exploding Kittens"
                width={628}
                height={92}
              />
              <div className="text-center mt-4">
                <p className="text-sm text-background mb-2">Remain cards ({desk.remainingCards})</p>
                {actionTriggered && action
                  ? <Button variant={"secondary"} disabled={loading} onClick={() => onExecuteAction()}>{deskActionToText(action)}</Button>
                  : null
                }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}