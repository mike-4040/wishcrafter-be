import { NextFunction, Request, Response } from 'express';

import { getUserById } from '../../models/user.js';
import { UserError } from '../../utils/index.js';
import { verifyIdToken } from '../../services/index.js';

export async function authGuard(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UserError('authGuard-noAuthorization');
    }

    const [_, token] = authorization.split(' ');

    if (!token.length) {
      throw new UserError('authGuard-malformedAuthorizationHeader');
    }

    const { uid } = await verifyIdToken(token);

    const user = await getUserById(uid);

    if (!user) {
      throw new UserError('authGuard-userNotFound');
    }

    Object.assign(req, { user });
    next();
  } catch (error) {
    next(error);
  }
}
