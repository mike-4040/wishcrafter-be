import { Request } from 'express';

import { User } from '../models/type';

export interface AuthedRequest extends Request {
  // the user always exists on AuthedRequest, but can't make ts happy
  user?: User;
  body: Record<string, unknown>;
}
