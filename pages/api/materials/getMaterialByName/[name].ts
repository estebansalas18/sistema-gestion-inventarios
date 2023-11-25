import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/service/prisma";
import { checkPrivateApi } from "@/utils/checkServerSession";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        await checkPrivateApi(req, res);
        const { name } = req.query;
        const singleName = Array.isArray(name) ? name[0] : name;
        const material = await prisma.material.findUnique({
            where: {
                name: singleName,
            },
        });
        res.status(200).json({ material });  
    }
    catch(error){
        res.status(500).json({ error });
    }    
}