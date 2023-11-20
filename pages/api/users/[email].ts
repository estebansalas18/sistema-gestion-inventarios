import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/service/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.query;
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    res.status(200).json({ user });
}