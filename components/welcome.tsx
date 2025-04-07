"use client"

import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "next-auth";

interface WelcomeProps {
    user: User
}

const Welcome: FunctionComponent<WelcomeProps> = ({ user }) => {
    return (
        <main className="min-h-screen p-6">
            <section className="max-w-xl mx-auto grid gap-8">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center flex flex-col items-center"
                >
                    <div className="flex items-center gap-4 justify-center mb-4">
                        <h1 className="text-5xl font-bold tracking-tight">Exploding Kittens</h1>
                    </div>
                    <p className="text-xl mt-2">A card game of strategy, betrayal, and kittens.</p>
                </motion.header>

                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="min-h-[600px]">
                        <CardContent>
                            <Tabs defaultValue="account">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="account">Account</TabsTrigger>
                                    <TabsTrigger value="joinGame">Join Game</TabsTrigger>
                                </TabsList>
                                <div className="mt-6">
                                    <TabsContent value="account">
                                        <div className="flex items-center justify-between space-x-4">
                                            <div className="flex items-center space-x-4">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" />
                                                    <AvatarFallback>KT</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium leading-none">{user.name}</p>
                                                    <p className="text-sm text-muted-foreground">{user.username}</p>
                                                </div>
                                            </div>
                                            <Button variant={"secondary"} onClick={() => signOut()}>
                                                Sign out
                                            </Button>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="joinGame">
                                        <div className="space-y-4">
                                            <Input
                                                type="text"
                                                placeholder="Enter Game Code"
                                            />
                                            <Button>
                                                Join Game
                                            </Button>
                                        </div>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </CardContent>
                    </Card>
                </motion.section>

                <motion.footer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center text-sm text-gray-600"
                >
                    Made with chaos and cuteness · © 2025 Exploding Kittens Online
                </motion.footer>
            </section>
        </main>
    );
}

export default Welcome;