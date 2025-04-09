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
import { Client, ConnectError, createClient } from "@connectrpc/connect";
import { finalTransport } from "../transport";
import { GrpcRequest, GrpcResponse } from "../interfaces/response";

export class ClientServerGrpc {
    private readonly client: Client<typeof ClientServer>

    constructor() {
        this.client = createClient(ClientServer, finalTransport)
    }

    async createGuestUser(request: GrpcRequest<CreateNewGuestUserRequest>): Promise<GrpcResponse<CreateNewGuestUserResponse>> {
        try {
            const response = await this.client.createNewGuestUser(request)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }

    async guestLogin(request: GrpcRequest<GuestLoginRequest>): Promise<GrpcResponse<GuestLoginResponse>> {
        try {
            const response = await this.client.guestLogin(request)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }

    async createNewLobby(request: GrpcRequest<CreateLobbyRequest>): Promise<GrpcResponse<CreateLobbyResponse>> {
        try {
            const response = await this.client.createLobby(request)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }

    async joinLobby(request: GrpcRequest<JoinLobbyRequest>): Promise<GrpcResponse<JoinLobbyResponse>> {
        try {
            const response = await this.client.joinLobby(request)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }

    async leaveLobby(request: GrpcRequest<LeaveLobbyRequest>): Promise<GrpcResponse<LeaveLobbyResponse>> {
        try {
            const response = await this.client.leaveLobby(request)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }
}

export const clientServerGrpcInstance = new ClientServerGrpc()
