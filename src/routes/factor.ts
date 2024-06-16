import { Router } from 'express';

import { deleteFactorController } from '../controllers/factor/deleteFactor.js';
import { dummy } from '../controllers/dummy.js';

/**
 * Some factors controller are nested under the wish controller.
 * Individual factor controllers should be here.
 */
export const factorRouter = Router()
  .get('/:id', dummy)
  .patch('/:id', dummy)
  .delete('/:id', deleteFactorController);
