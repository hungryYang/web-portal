const express = require('express');

const router = express.Router();
const UserService = require('../../services/user_service')
const apiRes = require('../../utils/api_response')
/* GET users listing. */
router.get('/', (req, res, next) => {
  (async () => {
    const users = await UserService.getAllUsers();
    return {
      users,
    };
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
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
router.get('/:userId', (req, res, next) => {
  (async () => {
    const { userId } = req.params;
    const user = await UserService.getUserById(userId);
    return {
      user,
    };
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});

router.post('/:userId/subscription', (req, res, next) => {
  (async () => {
    const { userId } = req.params;
    const sub = UserService.createSubscription(
      userId,
      req.body.url,
    );
    return {
      sub,
    };
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});


module.exports = router;
