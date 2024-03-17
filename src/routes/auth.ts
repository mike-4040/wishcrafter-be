import { Router } from 'express';

import { signUp } from '../domains/auth';

export const authRouter = Router().post('/signup', signUp);
