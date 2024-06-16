import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type/index.js';
import { createFactor } from '../../models/factor.js';
import { Factor, FactorData } from '../../models/type/factor.js';

export async function createFactorController(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    console.log(1, { user });

    const factor = Factor.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    })
      .strict()
      .parse({ ...req.body, ...req.params });

    // validation only
    FactorData.parse({
      factorKind: factor.factorKind,
      data: factor.data,
    });

    const newFactor = await createFactor(factor);

    console.log({ newFactor });

    res.send({ success: true, factor: newFactor });
  } catch (error) {
    next(error);
  }
}
