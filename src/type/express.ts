import { Request } from 'express';

import { AuthUser } from '../models/type';

export interface AuthedRequest extends Request {
  authUser?: AuthUser;
  body: Record<string, unknown>;
}
