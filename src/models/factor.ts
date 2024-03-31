import { randomUUID } from 'node:crypto';

import { pg } from '../services';
import { DBFactor, Factor } from './type';

export async function createFactor(
  factor: Omit<Factor, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Factor> {
  const factorToInsert: DBFactor = {
    id: randomUUID(),
    wish_id: factor.wishId,
    name: factor.name,
    type: factor.type,
    not_important: factor.notImportant,
    data: factor.data,
    created_at: Date.now(),
    updated_at: Date.now(),
  };

  const [inserted] = await pg<DBFactor>('factors').insert(factorToInsert, [
    'id',
    'wish_id',
    'name',
    'type',
    'not_important',
    'data',
    'created_at',
    'updated_at',
  ]);

  return {
    id: inserted.id,
    wishId: inserted.wish_id,
    name: inserted.name,
    type: inserted.type as Factor['type'],
    notImportant: inserted.not_important,
    createdAt: Number(inserted.created_at),
    updatedAt: Number(inserted.updated_at),
    data: inserted.data as Factor['data'],
  } as Factor; // TODO: Fix this type assertion
}
