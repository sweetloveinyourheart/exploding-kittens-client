import {
    ClientServer,
    CreateLobbyRequest,
    CreateLobbyResponse,
    CreateNewGuestUserRequest,
    CreateNewGuestUserResponse,
    GetGameMetaDataRequest,
    GetGameMetaDataResponse,
    GetLobbyReply,
    GetLobbyRequest,
    GuestLoginRequest,
    GuestLoginResponse,
    JoinLobbyRequest,
    JoinLobbyResponse,
    LeaveLobbyRequest,
    LeaveLobbyResponse,
    PlayersProfileRequest,
    PlayersProfileResponse,
    RetrieveCardsDataResponse,
    StartMatchRequest,
    StreamGameReply,
    StreamGameRequest,
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

    async getPlayersProfile(request: GrpcRequest<PlayersProfileRequest>, options?: CallOptions): Promise<GrpcResponse<PlayersProfileResponse>> {
        try {
            const response = await this.client.getPlayersProfile(request, options)
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

    async getLobby(request: GrpcRequest<GetLobbyRequest>, options?: CallOptions): Promise<GrpcResponse<GetLobbyReply>> {
        try {
            const response = await this.client.getLobby(request, options)
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

    private streamLobby(request: GrpcRequest<GetLobbyRequest>, options?: CallOptions): AsyncIterable<GetLobbyReply> {
        return this.client.streamLobby(request, options)
    }

    async streamLobbyWithCallBacks(
        request: GrpcRequest<GetLobbyRequest>,
        callback: {
            onDataStreaming: (res: GetLobbyReply) => void,
            onError: (err: ConnectError) => void,
        },
        options?: CallOptions,
    ): Promise<void> {
        try {
            for await (const res of this.streamLobby(request, options)) {
                callback.onDataStreaming(res)
            }
        } catch (error) {
            callback.onError(ConnectError.from(error))
        }
    }

    async startMatch(request: GrpcRequest<StartMatchRequest>, options?: CallOptions): Promise<ConnectError | null> {
        try {
            await this.client.startMatch(request, options)
            return null
        } catch (error) {
            return ConnectError.from(error)
        }
    }

    async retrieveCardsData(options?: CallOptions): Promise<GrpcResponse<RetrieveCardsDataResponse>> {
        try {
            const response = await this.client.retrieveCardsData({}, options)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }

    async getGameMetadata(request: GrpcRequest<GetGameMetaDataRequest>, options?: CallOptions): Promise<GrpcResponse<GetGameMetaDataResponse>> {
        try {
            const response = await this.client.getGameMetaData(request, options)
            return { data: response, error: null }
        } catch (error) {
            return { data: null, error: ConnectError.from(error) }
        }
    }

    private streamGame(request: GrpcRequest<StreamGameRequest>, options?: CallOptions): AsyncIterable<StreamGameReply> {
        return this.client.streamGame(request, options)
    }

    async streamGameWithCallBacks(
        request: GrpcRequest<StreamGameRequest>,
        callback: {
            onDataStreaming: (res: StreamGameReply) => void,
            onError: (err: ConnectError) => void,
        },
        options?: CallOptions,
    ): Promise<void> {
        try {
            for await (const res of this.streamGame(request, options)) {
                callback.onDataStreaming(res)
            }
        } catch (error) {
            callback.onError(ConnectError.from(error))
        }
    }
}
