import { Interceptor } from "@connectrpc/connect";

export const createAuthInterceptor = (accessToken?: string): Interceptor => (next) => async (req) => {
    if (accessToken) {
        req.header.set("Authorization", `Bearer ${accessToken}`);
    }

    return next(req);
};

export const createLoggerInterceptor = (): Interceptor => (next) => async (req) => {
    console.log(`sending message to ${req.url}`);
    return await next(req);
};

