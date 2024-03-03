import { NextFunction, Request, Response } from 'express';

import { AuthUser } from '../../models/type';
import { UserError } from '../../utils';
import { verifyIdToken } from '../../services';

export async function authGuard(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UserError('Unauthorized');
    }

    const [_, token] = authorization.split(' ');

    if (!token.length) {
      throw new UserError('Malformed Authorization header');
    }

    const authUser = await verifyIdToken(token).catch((error) => {
      console.error(error);
      throw new UserError('Unauthorized');
    });

    const user: AuthUser = {
      email: authUser.email,
      id: authUser.uid,
    };

    Object.assign(req, { user });
    next();
  } catch (error) {
    next(error);
  }
}
