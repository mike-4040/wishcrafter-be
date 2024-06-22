import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type/express.js';
import { FrontError } from '../../utils/errors.js';
import { canUpdateFactor } from '../../permissions/factor.js';
import { updateFactor } from '../../models/factor.js';
import { Factor, FactorData } from '../../models/type/factor.js';

export async function updateFactorController(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    const { id } = Factor.pick({ id: true }).parse(req.params);

    const factor = Factor.omit({
      id: true,
      updatedAt: true,
      createdAt: true,
    })
      .partial()
      .strict()
      .parse(req.body);

    if (!Object.keys(factor).length) {
      throw new FrontError('updateFactorController-nothingToUpdate-noRetry');
    }

    // validation only
    if (factor.data) {
      if (!factor.factorKind) {
        throw new FrontError(
          'updateFactorController-factorKind-required-noRetry',
        );
      }

      FactorData.parse({
        factorKind: factor.factorKind,
        data: factor.data,
      });
    }
    console.log('updateFactorController', { factor });

    const permit = await canUpdateFactor(id, user, factor);
    if (!permit.ok) {
      throw new FrontError(permit.reason);
    }

    const success = await updateFactor(id, factor);

    res.send({ success });
  } catch (error) {
    next(error);
  }
}
