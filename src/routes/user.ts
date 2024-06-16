import { Router } from 'express';

import { getCurrentUser } from '../controllers/user/index.js';

export const userRouter = Router().get('/', getCurrentUser);
