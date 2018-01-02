const express = require('express');

const router = express.Router();

const userRouter = require('./users');

const JWT = require('jsonwebtoken');

router.get('/login', (req, res, next) => {
  const { username } = req.query;
  const user = { username };
  const token = JWT.sign(user, 'asdwdqda');
  res.send(token);
});

router.get('/hello', (req, res, next) => {
  const auth = req.get('Authorization');
  if (!auth) return res.send('no auth');
  if (!auth.indexOf('Bearer ') === -1) res.send('no auth');
  const token = auth.split('Bearer ')[1];
  const user = JWT.verify(token, 'asdwdqda');
  res.send(user);
})


router.use('/user', userRouter);

module.exports = router;
