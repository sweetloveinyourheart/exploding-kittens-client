import { Interceptor } from "@connectrpc/connect"

export const createLoggerInterceptor = (): Interceptor => (next) => async (req) => {
    console.log(`sending message to ${req.url}`)
    return await next(req)
}
