import { Interceptor } from "@connectrpc/connect";

export const createAuthInterceptor = (accessToken?: string): Interceptor => (next) => async (req) => {
    if (accessToken) {
        req.header.set("Authorization", `Bearer ${accessToken}`);
    }

    return next(req);
};
