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

    const { email, uid: id } = await verifyIdToken(token);

    const authUser: AuthUser = {
      email,
      id,
    };

    Object.assign(req, { authUser });
    next();
  } catch (error) {
    next(error);
  }
}
