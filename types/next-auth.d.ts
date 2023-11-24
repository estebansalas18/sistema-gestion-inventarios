import { Role } from "@prisma/client";

declare module "next-auth" {

    interface Session {
        user: {
            image?: string;
            role: Role?;
            email: string;
        };
    }

}