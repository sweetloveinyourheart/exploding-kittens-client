import { DEFAULT_TRANSPORT_BASE_URL } from "@/constants/transport";
import { Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

const logger: Interceptor = (next) => async (req) => {
    console.log(`sending message to ${req.url}`);
    return await next(req);
  };

const auth: Interceptor = (next) => async (req) => {
    const token = localStorage.getItem("ldx-client-token");
    if (token) {
        req.header.set("Authorization", `Bearer ${token}`);
    }
    return await next(req);
}

export const finalTransport = createConnectTransport({
  baseUrl: process.env.NEXT_PUBLIC_CLIENTSERVER_TRANSPORT_URL || DEFAULT_TRANSPORT_BASE_URL,
  interceptors: [
    logger,
    auth,
  ]
});