import { Router } from 'express';

import { getCurrentUser } from '../controllers/user';

export const userRouter = Router().get('/', getCurrentUser);
