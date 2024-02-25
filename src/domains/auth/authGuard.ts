import { NextFunction, Request, Response } from 'express';

// import { AuthedRequest } from '../../type';
import { UserError } from '../../utils';
import { verifyIdToken } from '../../services';

export async function authGuard(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UserError('Unauthorized');
    }

    const [_, token] = authorization.split(' ');

    console.log({ token });
    if (!token.length) {
      throw new UserError('Malformed Authorization header');
    }

    const authUser = await verifyIdToken(token).catch((error) => {
      console.error(error);
      throw new UserError('Unauthorized');
    });

    console.log({
      authUser,
    });

    Object.assign(req, { user: authUser });
    next();
  } catch (error) {
    next(error);
  }
}
