import { getUserIdByFactorId } from '../models/factor.js';
import { Permission } from '../type/index.js';
import { User } from '../models/type/index.js';

export async function canDeleteFactor(
  user: User,
  factorId: string,
): Promise<Permission> {
  const userId = await getUserIdByFactorId(factorId);
  if (!userId) {
    return { ok: false, reason: 'factorNotFound' };
  }

  if (userId !== user.id) {
    return { ok: false, reason: 'factorDoesNotBelongToUser-noRetry' };
  }

  return { ok: true };
}
