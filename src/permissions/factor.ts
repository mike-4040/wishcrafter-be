import { FactorType } from '../models/type/factor.js';
import { Permit } from '../type/permissions.js';
import { User } from '../models/type/user.js';
import { getFactorParents } from '../models/factor.js';
import { getWishById } from '../models/wish.js';

export async function canDeleteFactor(
  user: User,
  factorId: string,
): Promise<Permit> {
  const { userId } = await getFactorParents(factorId);
  if (!userId) {
    return { ok: false, reason: 'factorNotFound-noRetry' };
  }

  if (userId !== user.id) {
    return { ok: false, reason: 'factorDoesNotBelongToUser-noRetry' };
  }

  return { ok: true };
}

export async function canUpdateFactor(
  user: User,
  factor: Partial<FactorType> & Pick<FactorType, 'id'>,
): Promise<Permit> {
  console.log({ factor });
  const { userId, wishId } = await getFactorParents(factor.id);

  // userId and wishId coexist, we check for both, just in case
  if (!userId || !wishId) {
    return { ok: false, reason: 'factorNotFound-noRetry' };
  }

  if (userId !== user.id) {
    return { ok: false, reason: 'factorDoesNotBelongToUser-noRetry' };
  }

  if (factor.wishId && factor.wishId !== wishId) {
    console.log('changing wishId');
    const anotherWish = await getWishById(factor.wishId);

    if (!anotherWish) {
      return { ok: false, reason: 'wishNotFound-noRetry' };
    }

    if (anotherWish.userId !== user.id) {
      return { ok: false, reason: 'wishDoesNotBelongToUser-noRetry' };
    }
  }

  return { ok: true };
}
