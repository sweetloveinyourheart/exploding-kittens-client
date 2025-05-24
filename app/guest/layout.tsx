import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Guest | Exploding Kittens",
    description: "An online version of the Exploding Kittens card game",
}

export default function GuestLoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}