import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type';
import { getWishesByUserId } from '../../models/wish';

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
