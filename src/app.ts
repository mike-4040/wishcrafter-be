import cors from 'cors';
import express from 'express';

import { authGuard } from './controllers/auth';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { wishRouter } from './routes/wish';
import { errorHandler, secrets } from './utils';

const {
  app: { port },
} = secrets;

express()
  .use(express.json())
  // TODO: Configure CORS
  .use(cors())
  // unprotected routes
  .get('/', (_, res) => res.send('Hello from WishCrafter!'))
  .use('/auth', authRouter)
  // All routes below this line are protected
  .use(authGuard)
  .use('/user', userRouter)
  .use('/wish', wishRouter)
  .use(errorHandler)
  .listen(port, () =>
    console.log(`App is running on port http://localhost:${port}/`),
  );
