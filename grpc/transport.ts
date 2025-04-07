// import { auth } from "@/auth";
import { DEFAULT_TRANSPORT_BASE_URL } from "@/constants/transport";
import { Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

const logger: Interceptor = (next) => async (req) => {
  console.log(`sending message to ${req.url}`);
  return await next(req);
};

const authInterceptor: Interceptor = (next) => async (req) => {
  // const token = localStorage.getItem("ldx-client-token");
  // if (token) {
  //     req.header.set("Authorization", `Bearer ${token}`);
  // }
  // const session = await auth();
  // console.log(session);

  return await next(req);
}

export const finalTransport = createConnectTransport({
  baseUrl: process.env.NEXT_PUBLIC_CLIENTSERVER_TRANSPORT_URL || DEFAULT_TRANSPORT_BASE_URL,
  interceptors: [
    logger,
    authInterceptor,
  ]
});