"use server"

import { auth } from "@/auth"
import { ClientServerGrpc } from "@/grpc/servers/clientserver"

export const useGrpcServer = async (): Promise<ClientServerGrpc> => {
    const session = await auth()
    const clientServer = new ClientServerGrpc({ accessToken: session?.accessToken })
    return clientServer
}