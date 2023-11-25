import { NextApiRequest, NextApiResponse } from "next";
import { Material } from "@prisma/client";
import { prisma } from "@/service/prisma";
import { checkPrivateApi, checkProtectedApi } from "@/utils/checkServerSession";

type Data = {
  materials?: Material[];
  message?: string;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try{
    await checkPrivateApi(req, res);

    if (req.method === "GET") {
      const materials = await prisma.material.findMany();
      res.status(200).json({ materials });
    } 
    else {
      await checkProtectedApi(req, res, "ADMIN");
      if (req.method === "POST") {
        const { body } = req;
        const newMaterial = await prisma.material.create({
          data: {
            name: body.name,
            quantity: body.quantity,
            userId: body.userId,
          },
        });
        res.status(200).json({materials: [newMaterial]});
      } else if (req.method === "PUT") {
        const { body } = req;
        const newMaterial = await prisma.material.update({
          where: { id: body.id },
          data: {
            quantity: body.quantity,
            updatedAt: new Date(),
          },
        });
        res.status(200).json({materials: [newMaterial]});
      } 
      else {
        res.status(405).json({ message: "method not allowed" });
      }
    }
  }
  catch(error){
    res.status(500).json({ error });
  }
}
