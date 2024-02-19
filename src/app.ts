import express from 'express';

import { authGuard } from './domains/auth/authGuard';
import { authRouter } from './routes/auth';
import { errorHandler, secrets } from './utils';
import { getUserByEmail } from './models/user';

const { app: { port } } = secrets

express()
  .use(express.json())
  .get('/', (req, res) => {
    res.send('Hello World');
  })
  .use('/auth', authRouter)
  .use(authGuard) // All routes below this line are protected
  .get('/user', async (req, res) => {
    const user = await getUserByEmail('1@1.com');
    console.log({ user })
    res.send(user);
  })
  .use(errorHandler)
  .listen(port, () =>
    console.log(`App is running on port ${port}`)
  )
