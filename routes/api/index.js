const express = require('express');

const router = express.Router();

const userRouter = require('./users');

const users = [];

router.get('/login', (req, res, next) => {
  const { username } = req.query;
  if (!users.find(u => u.username === username)) {
    res.set('Set-Cookie', `username=${username}`);
    users.push({
      username,
    });
  }
  res.send();
});

router.get('/hello', (req, res, next) => {
  const { username } = req.cookies;
  if (!users.find(u => u.username === username)) {
    res.send(`<h1>hello, ${username}</h1>`);
  } else {
    res.send('no login during this time server is up');
  }
})

router.use('/user', userRouter);

module.exports = router;
