import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type/index.js';
import { Factor } from '../../models/type/index.js';
import { FrontError } from '../../utils/index.js';
import { canDeleteFactor } from '../../permissions/factor.js';
import { deleteFactor } from '../../models/factor.js';

export async function deleteFactorController(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    const { id } = Factor.pick({ id: true }).parse(req.params);

    const permit = await canDeleteFactor(user, id);
    if (!permit.ok) {
      throw new FrontError(permit.reason);
    }

    await deleteFactor(id);

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
}
