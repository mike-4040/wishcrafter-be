import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type/express.js';
import { FrontError } from '../../utils/errors.js';
import { canUpdateFactor } from '../../permissions/factor.js';
import { Factor, FactorData } from '../../models/type/factor.js';

export async function updateFactorController(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    const factor = Factor.partial()
      .required({ id: true })
      .strict()
      .parse({ ...req.body, ...req.params });

    // validation only
    if (factor.data) {
      if (!factor.factorKind) {
        throw new FrontError('updateFactorController-factorKind-required');
      }

      FactorData.parse({
        factorKind: factor.factorKind,
        data: factor.data,
      });
    }
    console.log({ factor });

    const permit = await canUpdateFactor(user, factor);
    if (!permit.ok) {
      throw new FrontError(permit.reason);
    }
    console.log({ permit });

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
}
