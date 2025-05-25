import Image from "next/image";
import { FunctionComponent } from "react";
import ExplodingKittensImage from "@/assets/images/exploding-kittens.png"
import CatImage from "@/assets/images/cats/exp.png"

interface HiddenKittensProps {

}

const HiddenKittens: FunctionComponent<HiddenKittensProps> = () => {
    return (
        <div
            className="flex flex-col justify-center items-center w-full h-full max-w-[192px] max-h-[256px] p-4 rounded-md shadow-xl custor-pointer"
            style={{
                background: 'linear-gradient(to bottom, #93291E, #ED213A, #93291E)',
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
        </div>
    );
}

export default HiddenKittens;