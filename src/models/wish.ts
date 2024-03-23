import { randomUUID } from 'node:crypto';

import { pg } from '../services';
import { DBWish, Wish } from './type';

export async function createWish(wish: Wish) {
  const wishToInsert: DBWish = {
    id: randomUUID(),
    user_id: wish.userId,
    title: wish.title,
    description: wish.description,
    created_at: Date.now(),
  };

  return wishToInsert;

  const [result] = await pg<DBWish>('wishes').insert(wishToInsert, ['id']);

  return result;
}
