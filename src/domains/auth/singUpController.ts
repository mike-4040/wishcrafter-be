import { Response, NextFunction } from 'express';

import { AuthedRequest } from '../../type';
import { UserError, asString } from '../../utils';
import { createUser, getUserByEmail } from '../../models/user';

export async function signUp(req: AuthedRequest, res: Response, next: NextFunction) {
  try {

    const { email: rawEmail, password: rawPassword, firstName: rawFirstName } = req.body;

    const email = asString(rawEmail, 'signUp-email', true);
    const password = asString(rawPassword, 'signUp-password', true);
    const firstName = asString(rawFirstName, 'signUp-firstName', true);

    const dbUser = await getUserByEmail(email).catch((cause) => {
      throw new Error('signUp-lookupFailed', { cause });
    });

    if (dbUser?.auth_created) {
      throw new UserError('signUp-accountExists')
    }

    let id = dbUser?.id;

    if (!id) {
      console.log('Creating user');
      const newDbUser = await createUser(email, firstName).catch((cause) => {
        throw new Error('signUp-creationFailed-1', { cause });
      });

      ({ id } = newDbUser)
    }

    if (!id) {
      throw new Error('signUp-creationFailed-2');
    }

    console.log({ dbUser })

    res.status(200).send({ success: true, message: 'Sign up' });
  } catch (err) {
    next(err);
  }
}