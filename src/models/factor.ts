import { randomUUID } from 'node:crypto';

import { pg } from '../services';
import { DBFactor, FactorType } from './type';

// TODO: pass in userId, and check that the wish belongs to the user
export async function createFactor(
  factor: Omit<FactorType, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<FactorType> {
  const factorToInsert: DBFactor = {
    created_at: Date.now(),
    data: factor.data,
    id: randomUUID(),
    is_important: factor.isImportant,
    name: factor.name,
    factor_kind: factor.factorKind,
    updated_at: Date.now(),
    wish_id: factor.wishId,
  };

  const [inserted] = await pg<DBFactor>('factors').insert(factorToInsert, [
    'created_at',
    'data',
    'id',
    'is_important',
    'name',
    'factor_kind',
    'updated_at',
    'wish_id',
  ]);

  return transformDbFactorToFactorType(inserted);
}

export async function getFactorsByWishId(
  userId: string,
  wishId: string,
): Promise<FactorType[]> {
  console.log('getFactorsByWishId', { userId, wishId });

  const dbFactors = await pg<DBFactor>('factors')
    .select('factors.*')
    .join('wishes', 'factors.wish_id', 'wishes.id')
    .where('wishes.user_id', userId);

  return dbFactors.map(transformDbFactorToFactorType);
}

function transformDbFactorToFactorType(dbFactor: DBFactor): FactorType {
  return {
    createdAt: dbFactor.created_at,
    data: dbFactor.data,
    id: dbFactor.id,
    isImportant: dbFactor.is_important,
    name: dbFactor.name,
    factorKind: dbFactor.factor_kind,
    updatedAt: dbFactor.updated_at,
    wishId: dbFactor.wish_id,
  };
}
