// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Prisma } from './db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await Prisma.user.findUnique({ where: { email: req.body.email } });
  return res.status(200).json({ loggedIn: true });
}