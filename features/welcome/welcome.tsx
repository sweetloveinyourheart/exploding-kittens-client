"use client"

import { FunctionComponent, useState } from "react"
import { Card } from "@/components/ui/card"
import { User } from "next-auth"
import Image from "next/image"
import CatsImage from "@/assets/images/cats.png"
import MainPage from "./components/main-page"
import { WelcomeComponents } from "./types/welcome"
import CreateLobby from "./components/create-lobby"
import JoinLobby from "./components/join-lobby"

interface WelcomeProps {
    user: User
}

const Welcome: FunctionComponent<WelcomeProps> = ({ user }) => {
    const [component, setComponent] = useState<WelcomeComponents>(WelcomeComponents.MainPage)

    const switchComponent = (component: WelcomeComponents) => {
        setComponent(component)
    }

    const renderComponent = () => {
        switch (component) {
            case WelcomeComponents.MainPage:
                return <MainPage user={user} switchComponent={switchComponent} />
            case WelcomeComponents.CreateLobby:
                return <CreateLobby switchComponent={switchComponent} />
            case WelcomeComponents.JoinLobby:
                return <JoinLobby switchComponent={switchComponent} />

            default:
                return <MainPage user={user} switchComponent={switchComponent} />
        }
    }

    return (
        <Card className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex flex-col items-center justify-center">
                {renderComponent()}
            </div>
            <div className="flex items-center justify-center">
                <Image
                    src={CatsImage}
                    alt="Exploding Kittens"
                    width={908}
                    height={664}
                    className="w-full h-auto object-cover rounded-lg mb-8"
                />
            </div>
        </Card>
    )
}


export default Welcome