"use client"

import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';
import { ClientServerGrpc } from '@/grpc/servers/clientserver';
import { useSession } from 'next-auth/react';

interface GrpcContextType {
    client: ClientServerGrpc;
    setClient: (client: ClientServerGrpc) => void;
}

export const GrpcContext = createContext<GrpcContextType | undefined>(undefined);

interface GrpcProviderProps {
    children: ReactNode;
}

export const GrpcProvider: FC<GrpcProviderProps> = ({ children }) => {
    const [client, setClient] = useState<ClientServerGrpc>(new ClientServerGrpc());

    const session = useSession()

    useEffect(() => {
        if (session.data && session.data.accessToken) {
            const accessToken = session?.data?.accessToken

            const clientServer = new ClientServerGrpc({ accessToken })
            setClient(clientServer)
        }
    }, [session.data])

    return (
        <GrpcContext.Provider value={{ client, setClient }}>
            {children}
        </GrpcContext.Provider>
    );
};
