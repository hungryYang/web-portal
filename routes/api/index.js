const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const UserService = require('../../services/user_service');
const apiRes = require('../../utils/api_response')

router.post('/login', (req, res) => {
  (async () => {
    const { username, password } = req.body;
    const result = await UserService.loginWithNamePass(username, password);
    return result;
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      res.err = e;
      apiRes(req, res);
    });
});

router.get('/hello', (req, res, next) => {
  res.send(`hello, ${req.session.user.username}`);
})

router.use('/user', userRouter);

module.exports = router;
