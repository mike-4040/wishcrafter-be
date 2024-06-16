import { Response, Router } from 'express';

import { AuthedRequest } from '../type/index.js';
import { createFactorController } from '../controllers/factor/createFactor.js';
import { createWishController } from '../controllers/wish/createWish.js';
import { getFactorsController } from '../controllers/factor/getFactors.js';
import { getOwnWishes } from '../controllers/wish/getOwnWishes.js';

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
