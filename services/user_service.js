const User = require('../models/mongoose/user');

const Subscription = require('../models/mongoose/subscription');

module.exports.getAllUsers = async function () {
  const users = await User.list();
  return users;
}

module.exports.addNewUser = async function (user) {
  const users = await User.insert(user);
  return users;
}

module.exports.getUserById = async function (userId) {
  const users = await User.getOneById(userId);
  return users;
}

module.exports.createSubscription = async function (userId, url) {
  const user = await User.getOneById(userId);
  if (!user) throw Error('No such User!');
  const sub = Subscription.insert({ userId, url });
  return sub;
}
