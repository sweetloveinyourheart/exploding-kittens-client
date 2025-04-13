import {
    ClientServer,
    CreateLobbyRequest,
    CreateLobbyResponse,
    CreateNewGuestUserRequest,
    CreateNewGuestUserResponse,
    GuestLoginRequest,
    GuestLoginResponse,
    JoinLobbyRequest,
    JoinLobbyResponse,
    LeaveLobbyRequest,
    LeaveLobbyResponse
} from "@sweetloveinyourheart/exploding-kittens-client-core";
import { CallOptions, Client, ConnectError, createClient } from "@connectrpc/connect";
import { createGrpcConnectTransport } from "../transport";
import { GrpcRequest, GrpcResponse } from "../interfaces/response";

type ClientServerGrpcOpts = {
    accessToken?: string
}

export class ClientServerGrpc {
    private readonly client: Client<typeof ClientServer>

    constructor(opts?: ClientServerGrpcOpts) {
        const transport = createGrpcConnectTransport({ accessToken: opts?.accessToken })
        this.client = createClient(ClientServer, transport)
    }

    async createGuestUser(request: GrpcRequest<CreateNewGuestUserRequest>, options?: CallOptions): Promise<GrpcResponse<CreateNewGuestUserResponse>> {
        try {
            const response = await this.client.createNewGuestUser(request, options)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }

    async guestLogin(request: GrpcRequest<GuestLoginRequest>, options?: CallOptions): Promise<GrpcResponse<GuestLoginResponse>> {
        try {
            const response = await this.client.guestLogin(request, options)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }

    async createNewLobby(request: GrpcRequest<CreateLobbyRequest>, options?: CallOptions): Promise<GrpcResponse<CreateLobbyResponse>> {
        try {
            const response = await this.client.createLobby(request, options)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }

    async joinLobby(request: GrpcRequest<JoinLobbyRequest>, options?: CallOptions): Promise<GrpcResponse<JoinLobbyResponse>> {
        try {
            const response = await this.client.joinLobby(request, options)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }

    async leaveLobby(request: GrpcRequest<LeaveLobbyRequest>, options?: CallOptions): Promise<GrpcResponse<LeaveLobbyResponse>> {
        try {
            const response = await this.client.leaveLobby(request, options)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }
}
