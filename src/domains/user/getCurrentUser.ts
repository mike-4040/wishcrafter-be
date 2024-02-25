import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type';

export async function getCurrentUser(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { user } = req;
    if (!user) {
      throw new Error('getCurrentUser-missingAuthedUser');
    }
    const { id } = user;
    console.log({ id });
    res.send({ id });
  } catch (error) {
    next(error);
  }
}
