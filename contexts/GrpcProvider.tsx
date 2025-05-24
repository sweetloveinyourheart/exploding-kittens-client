"use client"

import React, { createContext, useState, ReactNode, FC, useEffect } from 'react'
import { ClientServerGrpc } from '@/grpc/servers/clientserver'
import { useSession } from 'next-auth/react'

interface GrpcContextType {
    client: ClientServerGrpc
    isAuthenticated: boolean
    setClient: (client: ClientServerGrpc) => void
}

export const GrpcContext = createContext<GrpcContextType | undefined>(undefined)

interface GrpcProviderProps {
    children: ReactNode
}

const clientServer = new ClientServerGrpc()

export const GrpcProvider: FC<GrpcProviderProps> = ({ children }) => {
    const session = useSession()

    const [client, setClient] = useState<ClientServerGrpc>(clientServer)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        if (session.status === "authenticated" && session.data && session.data.accessToken) {
            const accessToken = session.data.accessToken
            const clientServer = new ClientServerGrpc({ accessToken })
            setClient(clientServer)
            setIsAuthenticated(true)
        } else if (session.status === "unauthenticated") {
            setClient(clientServer)
            setIsAuthenticated(false)
        }
    }, [session.status])

    return (
        <GrpcContext.Provider value={{ client, isAuthenticated, setClient }}>
            {children}
        </GrpcContext.Provider>
    )
}
