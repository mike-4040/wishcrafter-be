import { Request } from 'express';

import { User } from '../models/type';

export interface AuthedRequest extends Request {
  user?: User;
  body: Record<string, unknown>;
}
