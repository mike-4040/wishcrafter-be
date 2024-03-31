/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type';
import { createFactor } from '../../models/factor';

export async function createFactorController(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    console.log({ user });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = req.body as Record<string, any>;

    const factor = {
      wishId: body.wishId,
      name: body.name,
      type: body.type,
      notImportant: body.notImportant,
      value: body.value,
    };

    console.log({ factor });

    const newFactor = await createFactor(factor);

    console.log({ newFactor });

    res.send({ success: true, factor: newFactor });
  } catch (error) {
    next(error);
  }
}
