import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type';

export async function createWish(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authUser } = req;
    if (!authUser) {
      throw new Error('createWish-missingAuthedUser');
    }

    console.log('user', authUser);

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
}
