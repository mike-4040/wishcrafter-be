import { randomUUID } from 'node:crypto';

import { pg } from '../services';
import { DBWish, Wish } from './type';

export async function createWish(
  wish: Omit<Wish, 'id' | 'createdAt'>,
): Promise<Wish> {
  const wishToInsert: DBWish = {
    id: randomUUID(),
    user_id: wish.userId,
    title: wish.title,
    description: wish.description,
    created_at: Date.now(),
  };

  const [inserted] = await pg<DBWish>('wishes').insert(wishToInsert, [
    'id',
    'title',
    'description',
    'created_at',
    'user_id',
  ]);

  return {
    id: inserted.id,
    title: inserted.title,
    description: inserted.description,
    createdAt: Number(inserted.created_at),
    userId: inserted.user_id,
  } satisfies Wish;
}
