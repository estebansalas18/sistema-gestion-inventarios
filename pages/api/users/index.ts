import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { prisma } from "@/service/prisma";

type Data = {
    users: User[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
}