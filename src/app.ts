import express from 'express';

import { authGuard } from './domains/auth';
import { authRouter } from './routes/auth';
import { getAuthUser } from './services';
import { getUserByEmail } from './models/user';
import { errorHandler, secrets } from './utils';

const {
  app: { port },
} = secrets;

express()
  .use(express.json())
  .get('/', (_req, res) => {
    res.send('Hello World');
  })
  .use('/auth', authRouter)
  .use(authGuard) // All routes below this line are protected
  .get('/user', async (_req, res) => {
    const user = await getUserByEmail('1@1.com');
    console.log({ user });

    const authUser = await getAuthUser('1@1.com');

    console.log({ authUser });
    res.send(user);
  })
  .use(errorHandler)
  .listen(port, () => console.log(`App is running on port ${port}`));
