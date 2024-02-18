import express from 'express';

import { secrets } from './utils/secrets';
import { getUserByEmail } from './models/user';

const { app: { port } } = secrets

express()
  .get('/', (req, res) => {
    res.send('Hello World');
  })
  .get('/user', async (req, res) => {
    const user = await getUserByEmail('123');
    console.log({ user })
    res.send(user);
  }).listen(port, () => {
    console.log(`App is running on port ${port}`);
  })
