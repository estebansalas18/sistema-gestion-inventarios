import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/service/prisma";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID || '',
            clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
            issuer: process.env.AUTH0_ISSUER || '',
        }),
    ],
};


export default NextAuth(authOptions);