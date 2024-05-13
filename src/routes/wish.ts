import { Response, Router } from 'express';

import { AuthedRequest } from '../type';
import { createFactorController } from '../controllers/factor/createFactor';
import { createWishController } from '../controllers/wish/createWish';
import { getFactorsController } from '../controllers/factor/getFactors';
import { getOwnWishes } from '../controllers/wish/getOwnWishes';

function controller(req: AuthedRequest, res: Response) {
  console.log('user', req.user);
  console.log('body', req.body);
  console.log('params', req.params);
  res.send(req.body);
}

export const wishRouter = Router()
  .get('/', getOwnWishes)
  .post('/', createWishController)
  .get('/:id', controller)
  .patch('/:id', controller)
  .delete('/:id', controller)
  .post('/:wishId/factors', createFactorController)
  .get('/:wishId/factors', getFactorsController);
