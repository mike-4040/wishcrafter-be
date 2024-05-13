import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type';
import { Factor } from '../../models/type';
import { getFactorsByWishId } from '../../models/factor';

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
