import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type/index.js';
import { getWishesByUserId } from '../../models/wish.js';

export async function getOwnWishes(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    const wishes = await getWishesByUserId(user.id);

    res.send({ success: true, wishes });
  } catch (error) {
    next(error);
  }
}
