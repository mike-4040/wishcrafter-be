import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type/index.js';
import { asString } from '../../utils/index.js';
import { createWish } from '../../models/wish.js';

export async function createWishController(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    const title = asString(req.body.title, 'createWishTitle');
    const description = asString(req.body.description, 'createWishDescription');

    console.log({ title, description });

    const wish = {
      userId: user.id,
      title,
      description,
    };

    const newWish = await createWish(wish);

    console.log({ newWish });

    res.send({ success: true, wish: newWish });
  } catch (error) {
    next(error);
  }
}
