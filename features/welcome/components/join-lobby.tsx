"use client"

import { FunctionComponent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { LOBBY_ROUTER } from "@/constants/routers"
import { useGrpcClient } from "@/lib/hooks/grpc-client"
import { WelcomeComponents } from "../types/welcome"
import { ChevronLeftCircle } from "lucide-react"

const joinLobbyFormSchema = z.object({
    lobbyCode: z.string()
        .trim()
        .min(3, { message: "Lobby name must be at least 3 characters." })
        .max(255, { message: "Lobby name must be less than 255 characters." })
        .regex(/^[a-zA-Z0-9 ]+$/, { message: "Lobby name must not contain special characters except spaces." }),
})

interface JoinLobbyProps {
    switchComponent: (component: WelcomeComponents) => void
}

const JoinLobby: FunctionComponent<JoinLobbyProps> = ({ switchComponent }) => {
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
        <div className="w-full p-4">
            <div className="text-2xl text-left mb-4 w-full">
                <h1 className="text-2xl font-bold">Join a Kittens Lobby</h1>
                <p className="text-sm text-muted-foreground mt-2">Enter the lobby code to join an existing lobby.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="lobbyCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="w-full" placeholder="Enter lobby code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between">
                            <Button variant="link" onClick={() => switchComponent(WelcomeComponents.MainPage)}>
                                <ChevronLeftCircle /> Back
                            </Button>
                            <Button type="submit">
                                Join Lobby
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default JoinLobby