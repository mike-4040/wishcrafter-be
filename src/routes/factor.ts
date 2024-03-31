import { Response, Router } from 'express';

import { AuthedRequest } from '../type';
import { createFactorController } from '../controllers/factor/createFactor';

function controller(req: AuthedRequest, res: Response) {
  console.log('user', req.user);
  console.log('body', req.body);
  console.log('params', req.params);
  res.send(req.body);
}

export const factorRouter = Router()
  .get('/', controller)
  .post('/', createFactorController)
  .get('/:id', controller)
  .patch('/:id', controller)
  .delete('/:id', controller);
