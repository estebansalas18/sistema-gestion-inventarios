import { NextApiRequest, NextApiResponse } from "next";
import { InventoryMovement } from "@prisma/client";
import { prisma } from "@/service/prisma";

type Data = {
    inventoryMovements: InventoryMovement[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const inventoryMovements = await prisma.inventoryMovement.findMany();
    res.status(200).json({ inventoryMovements });
}