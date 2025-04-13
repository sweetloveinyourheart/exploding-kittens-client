import { DEFAULT_TRANSPORT_BASE_URL } from "@/constants/transport";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createAuthInterceptor, createLoggerInterceptor } from "./interceptors/auth";

type GrpcConnectTransportOpts = {
  accessToken?: string
}

export const createGrpcConnectTransport = (opts: GrpcConnectTransportOpts) => createConnectTransport({
  baseUrl: process.env.NEXT_PUBLIC_CLIENTSERVER_TRANSPORT_URL || DEFAULT_TRANSPORT_BASE_URL,
  interceptors: [
    createLoggerInterceptor(),
    createAuthInterceptor(opts.accessToken),
  ],
});