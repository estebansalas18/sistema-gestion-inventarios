import { NextApiRequest, NextApiResponse } from "next";
import { Material } from "@prisma/client";
import { prisma } from "@/service/prisma";

type Data = {
    materials: Material[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const materials = await prisma.material.findMany();
    res.status(200).json({ materials });
}