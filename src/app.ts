import cors from 'cors';
import express from 'express';

import { authGuard } from './controllers/auth';
import { authRouter } from './routes/auth';
import { factorRouter } from './routes/factor';
import { userRouter } from './routes/user';
import { wishRouter } from './routes/wish';
import { errorHandler, secrets } from './utils';

const {
  app: { port },
} = secrets;

express()
  .use(express.json())
  .use(cors()) // TODO: Configure CORS
  // unprotected routes
  .get('/', (_, res) => res.send('Hello from WishCrafter!'))
  .use('/auth', authRouter)
  .use(authGuard) // All routes below this line are protected
  .use('/user', userRouter)
  .use('/wish', wishRouter)
  .use('/factor', factorRouter)
  .use(errorHandler)
  .listen(port, () =>
    console.log(`App is running on port http://localhost:${port}/`),
  );
