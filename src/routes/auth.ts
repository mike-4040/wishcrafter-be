import { Router } from 'express';

import { signUp } from '../controllers/auth/index.js';

export const authRouter = Router().post('/signup', signUp);
