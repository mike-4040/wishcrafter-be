import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type';

export function login(_req: AuthedRequest, res: Response, _next: NextFunction) {
  res.status(200).send({ success: true, message: 'Login' });
}
