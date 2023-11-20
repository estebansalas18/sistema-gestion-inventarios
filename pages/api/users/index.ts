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
    
        res.status(200).json({ newUser });
    } 
    else if (req.method === 'PUT') {
        const { body } = req;    
        const newUser = await prisma.user.update({
          where: {email: body.email},
          data: {
            roleId: body.roleId,
          }
        });
    
        res.status(200).json({ newUser });
    } 
    else {
        res.status(405).json({ response: 'method not allowed' });
    }
}

