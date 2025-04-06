import { ClientServer, CreateNewGuestUserRequest, CreateNewGuestUserResponse, GuestLoginRequest, GuestLoginResponse } from "@sweetloveinyourheart/exploding-kittens-client-core";
import { Client, ConnectError, createClient } from "@connectrpc/connect";
import { finalTransport } from "../transport";
import { GrpcResponse } from "../interfaces/response";

export class ClientServerGrpc {
    private readonly client: Client<typeof ClientServer>

    constructor() {
        this.client = createClient(ClientServer, finalTransport)
    }

    async createGuestUser(request: Partial<CreateNewGuestUserRequest>): Promise<GrpcResponse<CreateNewGuestUserResponse>> {
        try {
            const response = await this.client.createNewGuestUser(request)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }

    async guestLogin(request: Partial<GuestLoginRequest>): Promise<GrpcResponse<GuestLoginResponse>> {
        try {
            const response = await this.client.guestLogin(request)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }
}

export const ClientServerGrpcInstance = new ClientServerGrpc()
