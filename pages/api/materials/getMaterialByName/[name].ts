import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/service/prisma";
import { checkPrivateApi } from "@/utils/checkServerSession";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await checkPrivateApi(req, res);
    const { name } = req.query;
    const material = await prisma.material.findUnique({
        where: {
            name: name,
        },
    });
    res.status(200).json({ material });
}