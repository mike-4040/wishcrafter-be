import { randomUUID } from 'node:crypto';

import { pg } from '../services';
import { DBFactor, Factor } from './type';

export async function createFactor(
  factor: Omit<Factor, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Factor> {
  const factorToInsert: DBFactor = {
    created_at: Date.now(),
    data: factor.data,
    id: randomUUID(),
    is_important: factor.isImportant,
    name: factor.name,
    factor_type: factor.factorType,
    updated_at: Date.now(),
    wish_id: factor.wishId,
  };

  const [inserted] = await pg<DBFactor>('factors').insert(factorToInsert, [
    'created_at',
    'data',
    'id',
    'is_important',
    'name',
    'factor_type',
    'updated_at',
    'wish_id',
  ]);

  return {
    createdAt: Number(inserted.created_at),
    data: inserted.data as Factor['data'],
    id: inserted.id,
    isImportant: inserted.is_important,
    name: inserted.name,
    factorType: inserted.factor_type as Factor['factorType'],
    updatedAt: Number(inserted.updated_at),
    wishId: inserted.wish_id,
  };
}
