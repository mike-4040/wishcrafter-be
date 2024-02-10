import express from 'express';

const port = process.env.PORT || 3000;

express().get('/', (req, res) => {
  res.send('Hello World');
}).listen(3000, () => {
  console.log(`App is running on port ${port}`);
})
