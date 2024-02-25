import cors from 'cors';
import express from 'express';

import { authGuard } from './domains/auth';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { errorHandler, secrets } from './utils';

const {
  app: { port },
} = secrets;

express()
  .use(express.json())
  .use(cors()) // TODO: Configure CORS
  // unprotected routes
  .get('/', (_req, res) => res.send('Hello World'))
  .use('/auth', authRouter)
  .use(authGuard) // All routes below this line are protected
  .use('/user', userRouter)
  .use(errorHandler)
  .listen(port, () => console.log(`App is running on port ${port}`));
