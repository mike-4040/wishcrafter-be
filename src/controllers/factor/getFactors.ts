import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type/index.js';
import { Factor } from '../../models/type/index.js';
import { getFactorsByWishId } from '../../models/factor.js';

export async function getFactorsController(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    const { wishId } = Factor.pick({ wishId: true }).parse(req.params);

    const factors = await getFactorsByWishId(user.id, wishId);

    res.send({ success: true, factors });
  } catch (error) {
    next(error);
  }
}
