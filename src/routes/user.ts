import { Router } from 'express';

import { getCurrentUser } from '../domains/user';

export const userRouter = Router().get('/', getCurrentUser);
