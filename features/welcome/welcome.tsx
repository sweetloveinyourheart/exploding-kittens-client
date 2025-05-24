"use client"

import { FunctionComponent } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "../../components/ui/input"
import { signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { User } from "next-auth"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { LOBBY_ROUTER } from "@/constants/routers"
import { useGrpcClient } from "@/lib/hooks/grpc-client"

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
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="account">Account</TabsTrigger>
                                    <TabsTrigger value="createLobby">Create Lobby</TabsTrigger>
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

                                    <TabsContent value="createLobby">
                                        <CreateLobby />
                                    </TabsContent>

                                    <TabsContent value="joinGame">
                                        <JoinLobby />
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
    )
}

const createLobbyFormSchema = z.object({
    lobbyName: z.string()
        .trim()
        .min(3, { message: "Lobby name must be at least 3 characters." })
        .max(255, { message: "Lobby name must be less than 255 characters." })
        .regex(/^[a-zA-Z0-9 ]+$/, { message: "Lobby name must not contain special characters except spaces." }),
})

const CreateLobby: FunctionComponent = () => {
    const form = useForm<z.infer<typeof createLobbyFormSchema>>({
        resolver: zodResolver(createLobbyFormSchema),
        defaultValues: {
            lobbyName: "",
        },
    })

    const router = useRouter()
    const { client } = useGrpcClient()

    const onSubmit = async (values: z.infer<typeof createLobbyFormSchema>) => {
        const response = await client.createNewLobby({
            lobbyName: values.lobbyName,
        })

        if (response.data && response.data.lobbyId) {
            toast.success("Lobby created")
            router.push(`${LOBBY_ROUTER}/${response.data.lobbyId}`)
        } else {
            toast.error("Error creating lobby", {
                description: response.error?.message
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="lobbyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Pick a lobby name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit">
                            Create Lobby
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

const joinLobbyFormSchema = z.object({
    lobbyCode: z.string()
        .trim()
        .min(3, { message: "Lobby name must be at least 3 characters." })
        .max(255, { message: "Lobby name must be less than 255 characters." })
        .regex(/^[a-zA-Z0-9 ]+$/, { message: "Lobby name must not contain special characters except spaces." }),
})

const JoinLobby: FunctionComponent = () => {
    const form = useForm<z.infer<typeof joinLobbyFormSchema>>({
        resolver: zodResolver(joinLobbyFormSchema),
        defaultValues: {
            lobbyCode: "",
        },
    })

    const router = useRouter()
    const { client } = useGrpcClient()

    const onSubmit = async (values: z.infer<typeof joinLobbyFormSchema>) => {
        const response = await client.joinLobby({
            lobbyCode: values.lobbyCode,
        })

        if (response.data && response.data.lobbyId) {
            router.push(`${LOBBY_ROUTER}/${response.data.lobbyId}`)
        } else {
            toast.error("Error joining lobby", {
                description: response.error?.message
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="lobbyCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Enter lobby code" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit">
                            Join Lobby
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}


export default Welcome