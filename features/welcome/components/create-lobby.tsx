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

const createLobbyFormSchema = z.object({
    lobbyName: z.string()
        .trim()
        .min(3, { message: "Lobby name must be at least 3 characters." })
        .max(255, { message: "Lobby name must be less than 255 characters." })
        .regex(/^[a-zA-Z0-9 ]+$/, { message: "Lobby name must not contain special characters except spaces." }),
})

interface CreateLobbyProps {
    switchComponent: (component: WelcomeComponents) => void
}

const CreateLobby: FunctionComponent<CreateLobbyProps> = ({ switchComponent }) => {
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
        <div className="w-full p-4">
            <div className="text-2xl text-left mb-4 w-full">
                <h1 className="text-2xl font-bold">Create a Kittens Lobby</h1>
                <p className="text-sm text-muted-foreground mt-2">Enter a name for your lobby, it could be anything you like!</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="lobbyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="w-full" placeholder="Pick a lobby name" {...field} />
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
                                Create Lobby
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateLobby