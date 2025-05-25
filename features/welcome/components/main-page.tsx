"use client"

import { FunctionComponent } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { User } from "next-auth"
import Image from "next/image"
import ExplodingKittensImage from "@/assets/images/exploding-kittens.png"
import { WelcomeComponents } from "../types/welcome"

interface MainPageProps {
    user: User
    switchComponent: (component: WelcomeComponents) => void
}

const MainPage: FunctionComponent<MainPageProps> = ({ user, switchComponent }) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <Image
                    src={ExplodingKittensImage}
                    alt="Exploding Kittens"
                    width={628}
                    height={92}
                />
                <h1 className="text-2xl font-bold">Welcome to Exploding Kittens</h1>
                <p className="text-sm text-muted-foreground mt-4">
                    Logged in as <span className="font-semibold">@{user.name}</span>
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full flex items-center flex-col space-y-4 mt-8"
            >
                <Button className="w-[250px]" variant={"wacky"} onClick={() => switchComponent(WelcomeComponents.CreateLobby)}>
                    Create Lobby
                </Button>

                <Button className="w-[250px]" variant={"wacky"} onClick={() => switchComponent(WelcomeComponents.JoinLobby)}>
                    Join A Lobby
                </Button>

                <Button className="w-[250px]" variant={"wacky"} onClick={() => signOut()}>
                    Sign out
                </Button>
            </motion.div>

            <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center text-sm text-gray-600 mt-8"
            >
                Made with chaos and cuteness · © 2025 Exploding Kittens Online
            </motion.footer>
        </>
    );
}

export default MainPage;