import bcrypt from 'bcrypt';
import { ServerResponse } from 'http';

import { Prisma } from './db/db';

import type { NextApiRequest, NextApiResponse } from 'next';

const signup = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<ServerResponse | void> => {
  try {
    const { user: name, pass, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pass, salt);

    const response = await Prisma.user.findUnique({ where: { email } });

    if (response?.email === email) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const data = await Prisma.user.create({
      data: { email, password, name },
    });

    if (data.email) {
      return res
        .status(200)
        .json({ message: 'User created', user_id: data.id });
    }
  } catch (error) {
    return res.status(404).json({ message: 'User not created' });
  }
  return res.end();
};

export default signup;
