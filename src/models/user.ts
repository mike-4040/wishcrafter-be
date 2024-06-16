import { randomUUID } from 'node:crypto';

import { pg } from '../services/index.js';
import { DBUser, User } from './type/index.js';

export async function getUserByEmail(email: string) {
  return pg<DBUser>('users')
    .select('id', 'auth_created')
    .where({ email })
    .first();
}

export async function createUser(email: string, firstName: string) {
  const userToInsert: DBUser = {
    id: randomUUID(),
    first_name: firstName,
    email,
    auth_created: false,
    created_at: Date.now(),
  };

  const [result] = await pg<DBUser>('users').insert(userToInsert, ['id']);

  return result;
}

export async function getUserById(id: string): Promise<User | undefined> {
  const dbUser = await pg<DBUser>('users').select().where({ id }).first();
  if (!dbUser) {
    return undefined;
  }

  return {
    id: dbUser.id,
    email: dbUser.email,
    firstName: dbUser.first_name,
    authCreated: dbUser.auth_created,
    createdAt: parseInt(dbUser.created_at as unknown as string, 10),
  } satisfies User;
}
