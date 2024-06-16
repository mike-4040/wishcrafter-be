import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type/index.js';

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

    res.send({ success: true, user });
  } catch (error) {
    next(error);
  }
}
