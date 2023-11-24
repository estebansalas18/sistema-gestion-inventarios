import { Role } from "@prisma/client";
import NextAuth from "next-auth/next";

declare module "next-auth" {

    interface Session {
        user: {
            image?: string;
            role: Role?;
            email: string;
        };
    }

}