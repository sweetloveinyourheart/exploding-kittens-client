import { GuestSignInForm } from "@/features/authentication/guest_signin"

export default function GuestSignInPage() {
    return (
        <div className="h-screen">
            <div className="flex items-center justify-center h-full">
                <div className="min-w-[500px]">
                    <GuestSignInForm />
                </div>
            </div>
        </div>
    )
}