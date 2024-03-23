import { NextFunction, Request, Response } from 'express';

import { FirebaseError } from '../../type';
import { asString, UserError } from '../../utils';
import { createAuthUser, createCustomToken } from '../../services';
import { createUser, getUserByEmail } from '../../models/user';

const AUTH_USER_EXISTS_ERRORS = [
  'auth/email-already-exists',
  'auth/uid-already-exists',
] as const;

export async function signUp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.body as Record<string, unknown>;

    if (!body || typeof body !== 'object') {
      throw new UserError('signUpNoBody');
    }

    const email = asString(body.email, 'signUpEmail');
    const password = asString(body.password, 'signUpPassword');
    const firstName = asString(body.firstName, 'signUpFirstName');

    const dbUser = await getUserByEmail(email).catch((cause: Error) => {
      throw new Error('signUpLookupFailed', { cause });
    });

    if (dbUser?.auth_created) {
      // TODO: The user might exist in the db but not in the auth system
      // We should check for that and handle it
      throw new UserError('signUpAccountExists');
    }

    let id = dbUser?.id;

    if (!id) {
      const newDbUser = await createUser(email, firstName).catch(
        (cause: Error) => {
          throw new Error('signUp-creationFailed-1', { cause });
        },
      );

      ({ id } = newDbUser);
    }

    if (!id) {
      throw new Error('signUp-creationFailed-2');
    }

    const authUser = await createAuthUser({
      id,
      email,
      displayName: firstName,
      password,
    }).catch((cause: FirebaseError) => {
      const { code } = cause;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      if (AUTH_USER_EXISTS_ERRORS.includes(code as any)) {
        throw new UserError('signUpAccountAlreadyExists');
      }

      throw new Error('signUpCreateAuthUserFailed', { cause });
    });

    console.dir({ authUser }, { depth: null });

    const customToken = await createCustomToken(id);
    const user = {
      id: authUser.uid,
      email: authUser.email,
      customToken,
    };

    res.status(200).send({ success: true, user });
  } catch (err) {
    next(err);
  }
}
