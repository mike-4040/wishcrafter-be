import { Router } from 'express';

import { deleteFactorController } from '../controllers/factor/deleteFactor';
import { dummy } from '../controllers/dummy';

/**
 * Some factors controller are nested under the wish controller.
 * Individual factor controllers should be here.
 */
export const factorRouter = Router()
  .get('/:id', dummy)
  .patch('/:id', dummy)
  .delete('/:id', deleteFactorController);
