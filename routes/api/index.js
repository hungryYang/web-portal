const express = require('express');

const router = express.Router();

const userRouter = require('./users');

const JWT = require('jsonwebtoken');

const User = require('../../models/mongoose/user');

const crypto = require('crypto');

// 把经典的callback类型写成Promise
const pbkdf2Async = require('bluebird').promisify(crypto.pbkdf2);

router.post('/login', (req, res, next) => {
  (async () => {
    const { username, password } = req.body;
    // 加密方法
    const cipher = await pbkdf2Async(password, 'asdasdasd', 10000, 512, 'sha2656')
    const created = await User.insert({
      username,
      password: cipher,
    });
    return created;
  })()
    .then((r) => {
    })
    .catch((e) => {
    });
})

// router.get('/login', (req, res, next) => {
//   const { username } = req.query;
//   const user = { username };
//   const token = JWT.sign(user, 'asdwdqda');
//   res.send(token);
// });

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
