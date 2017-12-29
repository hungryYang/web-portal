const express = require('express');

const router = express.Router();
const UserService = require('../services/user_service')
const HTTPReqParamError = require('../errors/http_request_param_error');

/* GET users listing. */
router.get('/', (req, res, next) => {
  (async () => {
    //throw new HTTPReqParamError('PAGE', '请制定页码', 'empty');
    const users = await UserService.getAllUsers();
    res.locals.users = users;
  })()
    .then(() => {
      res.render('users');
    })
    .catch((e) => {
      next(e);
    });
});

router.post('/', (req, res) => {
  const u = UserService.addNewUser(req.body);
  res.json(u);
});
// `:字符串`会被作为参数处理
router.get('/:userId', (req, res) => {
  (async () => {
    const { userId } = req.params;
    if (userId.length) throw new HTTPReqParamError('userId', '用户id不能为空', 'user id can not be empty');
    const user = await UserService.getUserById(userId);
    res.locals.user = user;
    res.render('user');
  })()
    .catch((e) => {
      console.log();
      res.json(e);
    });
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
