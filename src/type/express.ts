import { Request } from 'express';

import { AuthUser } from '../models/type';

export interface AuthedRequest extends Request {
  user?: AuthUser;
  body: Record<string, unknown>;
}
