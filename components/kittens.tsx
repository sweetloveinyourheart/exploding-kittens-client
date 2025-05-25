import { FunctionComponent } from "react"
import Image from "next/image"

import Attack from "@/assets/images/cards/attack.jpg"
import Skip from "@/assets/images/cards/skip.jpg"
import Favor from "@/assets/images/cards/favor.jpg"
import Shuffle from "@/assets/images/cards/shuffle.jpg"
import ExplodingKitten from "@/assets/images/cards/exploding-kitten.jpg"
import SeeTheFuture from "@/assets/images/cards/see-the-future.jpg"
import Defuse from "@/assets/images/cards/defuse.jpg"
import Nope from "@/assets/images/cards/nope.jpg"
import BeardCat from "@/assets/images/cards/beard-cat.jpg"
import TacoCat from "@/assets/images/cards/taco-cat.jpg"
import RainbowRalphingCat from "@/assets/images/cards/rainbow-ralphing-cat.jpg"
import Catermelon from "@/assets/images/cards/catermelon.jpg"
import HairyPotatoCat from "@/assets/images/cards/hairy-potato-cat.jpg"
import { Card } from "@/constants/cards"


interface KittensProps {
    code: string
}

const Kittens: FunctionComponent<KittensProps> = ({ code }) => {
    const getImageSrc = (code: string) => {
        switch (code) {
            case Card.ExplodingKitten:
                return ExplodingKitten
            case Card.Defuse:
                return Defuse
            case Card.Nope:
                return Nope
            case Card.Attack:
                return Attack
            case Card.Skip:
                return Skip
            case Card.Favor:
                return Favor
            case Card.Shuffle:
                return Shuffle
            case Card.SeeTheFuture:
                return SeeTheFuture
            case Card.TacoCat:
                return TacoCat
            case Card.Catermelon:
                return Catermelon
            case Card.HairyPotatoCat:
                return HairyPotatoCat
            case Card.RainbowRalphingCat:
                return RainbowRalphingCat
            case Card.BeardCat:
                return BeardCat

            default:
                return "/assets/images/cards/default-card.jpg"
        }
    }

    return (
        <div className="cursor-pointer">
            <Image
                src={getImageSrc(code)}
                alt={`Card: ${code}`}
                width={720}
                height={1024}
                className="rounded-lg shadow-lg"
            />
        </div>
    )
}

export default Kittens