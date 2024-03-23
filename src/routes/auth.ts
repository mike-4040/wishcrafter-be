import { Router } from 'express';

import { signUp } from '../controllers/auth';

export const authRouter = Router().post('/signup', signUp);
