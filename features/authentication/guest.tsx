"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { generateRandomUsernameWithSuffix } from "@/lib/utils"
import Link from "next/link"
import { HOME_ROUTER } from "@/constants/routers"
import { toast } from "sonner"
import { useGrpcClient } from "@/lib/grpc/hooks/grpc-client"
import { signIn } from "next-auth/react"
import { AUTH_GUEST_CREDENTIAL_PROVIDER } from "@/constants/auth"

const formSchema = z.object({
    fullName: z.string()
        .trim()
        .min(2, { message: "Full Name must be at least 2 characters." })
        .max(255, { message: "Full Name must be less than 255 characters." })
        .regex(/^[a-zA-Z0-9 ]+$/, { message: "Full Name must not contain special characters except spaces." }),
})

export function GuestForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
        },
    })

    const { client } = useGrpcClient()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Generate a random username
        const generatedUsername = generateRandomUsernameWithSuffix(values.fullName)
        const response = await client.createGuestUser({
            fullName: values.fullName,
            username: generatedUsername,
        })

        if (response.data && response.data.user) {
            toast.success("Guest profile created, trying to signin ...")

            // login with created profile
            await signIn(AUTH_GUEST_CREDENTIAL_PROVIDER, {
                redirectTo: HOME_ROUTER,
                // form data
                userId: response.data.user.userId,
            })
        } else {
            toast.error("Error creating guest profile", {
                description: response.error?.message
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                            You can create a guest profile without signing in. Click save when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Kittens" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-end w-full space-x-2">
                            <Button variant={"secondary"} type="button">
                                <Link href={HOME_ROUTER}>
                                    Go back
                                </Link>
                            </Button>
                            <Button type="submit" disabled={!form.formState.isValid}>
                                Submit
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
