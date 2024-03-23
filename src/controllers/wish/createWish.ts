import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type';

export async function createWish(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    console.log('user', user);

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
}
