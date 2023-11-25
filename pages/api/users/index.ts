import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { prisma } from "@/service/prisma";
import { checkProtectedApi } from "@/utils/checkServerSession";

type Data = {
    users?: User[];
    message?: string;
    error?: any;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
  try{    
    await checkProtectedApi(req, res, 'ADMIN');

    if (req.method === "GET") {
        const users = await prisma.user.findMany();
        res.status(200).json({ users });
    }
    else if (req.method === 'POST') {
        const { body } = req;
    
        const newUser = await prisma.user.create({
          data: {
            email: body.email,
            name: body.name,
            roleId: body.roleId,
  
          },
        });
    
        res.status(200).json({ users: [newUser] });
    } 
    else if (req.method === 'PUT') {
        const { body } = req;    
        const newUser = await prisma.user.update({
          where: {email: body.email},
          data: {
            roleId: body.roleId,
          }
        });    
        res.status(200).json({ users: [newUser] });
    } 
    else {
        res.status(405).json({ message: 'method not allowed' });
    }
  }
  catch(error){
    res.status(500).json({ error });
  }
}

