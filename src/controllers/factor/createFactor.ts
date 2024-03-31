/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type';
import { createFactor } from '../../models/factor';
import { Factor, FactorData } from '../../models/type';

export async function createFactorController(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    console.log({ user });

    const factor = Factor.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    })
      .strict()
      .parse(req.body);

    factor.data = FactorData.parse({
      type: factor.type,
      data: factor.data,
    }).data;

    console.log(2, { factor });

    const newFactor = await createFactor(factor);

    console.log({ newFactor });

    res.send({ success: true, factor: newFactor });
  } catch (error) {
    next(error);
  }
}
