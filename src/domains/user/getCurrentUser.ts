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
    const { user } = req;
    if (!user) {
      throw new Error('getCurrentUser-missingAuthedUser');
    }
    const { id } = user;

    const dbUser = await getUserById(id);
    if (!dbUser) {
      throw new Error('getCurrentUser-userNotFound');
    }

    const rUser: User = {
      id: dbUser.id,
      email: dbUser.email,
      firstName: dbUser.first_name,
      authCreated: dbUser.auth_created,
      createdAt: dbUser.created_at.toISOString(),
    };

    console.log('id', id);
    res.send({ success: true, user: rUser });
  } catch (error) {
    next(error);
  }
}
