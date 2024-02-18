import express from 'express';

import { secrets } from './utils/secrets';

const { app: { port } } = secrets

express().get('/', (req, res) => {
  res.send('Hello World');
}).listen(port, () => {
  console.log(`App is running on port ${port}`);
})
