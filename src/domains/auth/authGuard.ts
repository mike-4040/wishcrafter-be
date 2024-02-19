import { Response, NextFunction } from 'express';

import { AuthedRequest } from '../../type';
import { UserError } from '../../utils';

export function authGuard(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UserError('Unauthorized');
    }

    const [_, token] = authorization.split(' ');

    console.log({ token });
    if (!token.length) {
      throw new UserError('Malformed Authorization header');
    }

    req.user = {
      id: '1',
      email: '123',
      firstName: 'John',
      createdAt: '2021-01-01T00:00:00.000Z',
    };
    next();
  } catch (error) {
    next(error);
  }
}
