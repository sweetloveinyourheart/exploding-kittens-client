"use client";

import { FunctionComponent } from "react";
import { motion } from 'framer-motion'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GUEST_REGISTER_ROUTER } from "@/constants/routers";

interface HomePageWelcomeProps {

}

const HomePageWelcome: FunctionComponent<HomePageWelcomeProps> = () => {
    return (
        <>
            {/* Foreground Content */}
            < div className="text-center space-y-6" >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-5xl font-extrabold tracking-tight text-primary"
                >
                    Welcome to Exploding Kittens
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="text-lg"
                >
                    Play cards, avoid explosions, and have fun with friends!
                </motion.p>

                <Link href={GUEST_REGISTER_ROUTER}>
                    <Button type="button" className="shadow hover:scale-105 transition-transform duration-200">
                        Join as Guest
                    </Button>
                </Link>
            </div >
        </>
    );
}

export default HomePageWelcome;