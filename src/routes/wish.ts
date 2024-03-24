import { Response, Router } from 'express';

import { AuthedRequest } from '../type';
import { createWishController } from '../controllers/wish/createWish';

function controller(req: AuthedRequest, res: Response) {
  console.log('user', req.user);
  console.log('body', req.body);
  console.log('params', req.params);
  res.send(req.body);
}

export const wishRouter = Router()
  .get('/', controller)
  .post('/', createWishController)
  .get('/:id', controller)
  .patch('/:id', controller)
  .delete('/:id', controller);
