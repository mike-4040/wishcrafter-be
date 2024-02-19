import { Response, NextFunction } from 'express';

import { AuthedRequest } from '../../type';
import { UserError } from '../../utils';

export function authGuard(req: AuthedRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new UserError('Unauthorized'));
    return
  }

  const [_, token] = authorization.split(' ');

  console.log({ token })
  if (token.length) {
    next(new UserError('Malformed Authorization header'));
    return
  }

  req.user = {
    id: '1',
    email: '123',
    firstName: 'John',
    createdAt: "2021-01-01T00:00:00.000Z",
  }
  next();
}