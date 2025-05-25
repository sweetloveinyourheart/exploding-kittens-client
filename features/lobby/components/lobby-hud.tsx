'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useGrpcClient } from '@/lib/hooks/grpc-client'
import { toast } from 'sonner'
import { HOME_ROUTER } from '@/constants/routers'
import { ExitIcon } from '@radix-ui/react-icons'
import { CatIcon, CheckIcon, CopyIcon } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useState } from 'react'

interface LobbyHUDHeaderProps {
    lobbyId: string
    lobbyName: string
    lobbyCode: string
}

export function CopyableLobbyCode({ lobbyCode }: { lobbyCode: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(lobbyCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="text-sm flex items-center gap-2">
            Code: <span className="font-mono font-bold">{lobbyCode}</span>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={handleCopy}
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                    >
                        {copied ? (
                            <CheckIcon className="h-4 w-4 text-green-500" />
                        ) : (
                            <CopyIcon className="h-4 w-4" />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {copied ? "Copied!" : "Copy lobby code"}
                </TooltipContent>
            </Tooltip>
        </div>
    );
}

export default function LobbyHUDHeader({
    lobbyId,
    lobbyName,
    lobbyCode,
}: LobbyHUDHeaderProps) {
    const { client, isAuthenticated } = useGrpcClient()
    const router = useRouter()
    if (!isAuthenticated) {
        return null
    }


    const leaveLobby = async () => {
        const res = await client.leaveLobby({ lobbyId })
        if (res.error != null) {
            toast.error("Error leave lobby", {
                description: res.error.message
            })
            return
        }

        router.push(HOME_ROUTER)
    }

    return (
        <div className="shadow-md backdrop-blur-lg text-background border-none">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-2 px-6">
                <div>
                    <div className="flex items-center gap-2 text-xl font-bold tracking-wide uppercase">
                        <CatIcon /> 
                        <span>{lobbyName}</span>
                    </div>
                    <CopyableLobbyCode lobbyCode={lobbyCode} />
                </div>

                <Button
                    variant={"ghost"}
                    onClick={leaveLobby}
                >
                    <ExitIcon /> Leave Lobby
                </Button>
            </div>
        </div>
    )
}
