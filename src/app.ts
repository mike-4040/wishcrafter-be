import express from 'express';

import { authGuard } from './domains/auth';
import { authRouter } from './routes/auth';
import { errorHandler, secrets } from './utils';
import { getUserByEmail } from './models/user';
import { getAuthUser } from "./services";

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

    const authUser = await getAuthUser('1@1.com');

    console.log({ authUser })
    res.send(user);
  })
  .use(errorHandler)
  .listen(port, () =>
    console.log(`App is running on port ${port}`)
  )
