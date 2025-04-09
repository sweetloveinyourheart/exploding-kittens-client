import { ConnectError } from "@connectrpc/connect"

export interface GrpcResponse<T> {
    data: T | null
    error: ConnectError | null
}

export type GrpcRequest<T> = Partial<T>