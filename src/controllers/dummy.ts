import { Response } from 'express';

import { AuthedRequest } from '../type';

export function dummy(req: AuthedRequest, res: Response) {
  console.log('user', req.user);
  console.log('body', req.body);
  console.log('params', req.params);
  res.send(req.body);
}
