import { Router } from 'express';

import { signUp } from '../domains/auth/singUpController';
import { login } from '../domains/auth/loginController';

export const authRouter = Router()
  .post('/login', login)
  .post('/signup', signUp);

