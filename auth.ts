// Docs: https://github.com/nextauthjs/next-auth-example/blob/main/auth.ts

import NextAuth from "next-auth"
import "next-auth/jwt"

import CredentialsProvider from "next-auth/providers/credentials";
import { AUTH_GUEST_CREDENTIAL_PROVIDER } from "./constants/auth";
import { useGrpcServer } from "./lib/hooks/grpc-server";

export const { handlers, auth, signIn, signOut } = NextAuth({
    debug: !!process.env.AUTH_DEBUG,
    providers: [
        CredentialsProvider({
            id: AUTH_GUEST_CREDENTIAL_PROVIDER,
            name: "Guest Login",
            credentials: {
                userId: { label: "Guest UserID" }
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null
                }

                const clientServerGrpc = await useGrpcServer()
                const res = await clientServerGrpc.guestLogin({
                    userId: credentials.userId as string,
                })

                const data = res.data
                if (data && data.token && data.user) {
                    return {
                        name: data.user.fullName!,
                        userId: data.user.userId!,
                        username: data.user.username!,
                        accessToken: data.token,
                    };
                }

                return null;
            },
        })
    ],
    callbacks: {
        jwt({ token, trigger, session, account, user }) {
            if (trigger === "update") token.name = session.user.name
            if (account?.provider === "guest_login") {
                return { ...token, accessToken: user.accessToken, username: user.username, userId: user.userId }
            }
            return token
        },
        async session({ session, token }) {
            if (token?.accessToken) session.accessToken = token.accessToken
            if (token?.username) session.user = { ...session.user, username: token.username, userId: token.userId }

            return session
        },
    },
    experimental: { enableWebAuthn: true },
})

declare module "next-auth" {
    interface User {
        userId?: string
        username?: string
        accessToken?: string
    }

    interface Session {
        accessToken?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId?: string
        username?: string
        accessToken?: string
    }
}