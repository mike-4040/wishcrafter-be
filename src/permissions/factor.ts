import { getUserIdByFactorId } from '../models/factor';
import { Permission } from '../type';
import { User } from '../models/type';

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
