"use client"

import { Button, Card, TextField } from "@radix-ui/themes";
import KittenCallout from "@/components/callout/callout";
import { HOME_ROUTER } from "@/constants/routers";
import { ClientServerGrpcInstance } from "@/grpc/servers/clientserver";
import { generateRandomUsernameWithSuffix } from "@/utils/random";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ErrorMessage = {
    message: string,
    type: "warning" | "error"
}

type ValidateResult = {
    valid: boolean
    message: string | null
}

export const GuestSignInForm = () => {
    const [guestName, setGuestName] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null)

    const router = useRouter()

    const validateData = (data: string): ValidateResult => {
        const value = data.trim()
        if (value.length < 3 || value.length > 255) {
            return { valid: false, message: "Your name must be from 3-255 character" }
        }

        if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
            return { valid: false, message: "Your username cannot contains special characters" }
        }

        return { valid: true, message: null }
    }

    const handleGuestNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setGuestName(value)

        const validate = validateData(value)
        if (!validate.valid) {
            setErrorMessage({ message: validate.message!, type: "warning" })
        } else {
            setErrorMessage(null)
        }
    }

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        const validate = validateData(guestName)
        if (!validate.valid) {
            return;
        }

        // Generate a random username
        const generatedUsername = generateRandomUsernameWithSuffix(guestName)

        const response = await ClientServerGrpcInstance.createGuestUser({ fullName: guestName, username: generatedUsername })
        if (response.data && response.data.user) {
            localStorage.setItem("guest_user", JSON.stringify(response.data.user))
            router.push(HOME_ROUTER)
        } else {
            setErrorMessage({ message: response.error?.message || "Unknown error", type: "error" })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <div className="p-4">
                    <h1 className="text-xl font-bold mb-4">Welcome, Guest!</h1>
                    <div className="mb-4">
                        <TextField.Root
                            placeholder="Pick a random name ..."
                            color="ruby"
                            size={"3"}
                            onChange={handleGuestNameChange}
                        />
                    </div>
                    {errorMessage ? (
                        <div className="mb-4">
                            <KittenCallout
                                text={errorMessage.message}
                                type={errorMessage.type}
                            />
                        </div>
                    ) : null}
                    <div className="flex justify-end gap-2">
                        <Button
                            color="gray"
                            variant="soft"
                            type="button"
                            onClick={() => router.push(HOME_ROUTER)}
                        >
                            No, go back
                        </Button>
                        <Button
                            color="ruby"
                            variant="solid"
                            type="submit"
                            disabled={!validateData(guestName).valid}
                        >
                            Join !
                        </Button>
                    </div>
                </div>
            </Card>
        </form>
    )
}