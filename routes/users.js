const express = require('express');

const router = express.Router();
const UserService = require('../services/user_service')

/* GET users listing. */
router.get('/', (req, res) => {
  (async () => {
    const users = await UserService.getAllUsers()
    res.locals.users = users
    res.render('users');
  })()
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log(r);
    });
});

router.post('/', (req, res) => {
  const u = UserService.addNewUser(req.body);
  res.json(u);
});
// `:字符串`会被作为参数处理
router.get('/:userId', (req, res) => {
  const user = UserService.getUserById(req.params.userId)
  res.locals.user = user
  res.render('user');
});

router.post('/:userId/subscription', (req, res, next) => {
  try {
    const sub = UserService.createSubscription(req.params.userId, req.body.url);
    res.json(sub);
  } catch (e) {
    next(e);
  }
});


module.exports = router;
