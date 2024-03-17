import { NextFunction, Response } from 'express';

import { AuthedRequest } from '../../type';
import { getUserById } from '../../models/user';
import { User } from '../../models/type';

export async function getCurrentUser(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authUser } = req;
    if (!authUser) {
      throw new Error('getCurrentUser-missingAuthedUser');
    }

    const dbUser = await getUserById(authUser.id);
    if (!dbUser) {
      throw new Error('getCurrentUser-userNotFound');
    }

    const user: User = {
      id: dbUser.id,
      email: dbUser.email,
      firstName: dbUser.first_name,
      authCreated: dbUser.auth_created,
      createdAt: dbUser.created_at.toISOString(),
    };

    console.log({ user, now: new Date() });
    res.send({ success: true, user });
  } catch (error) {
    next(error);
  }
}
