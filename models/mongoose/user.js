const mongoose = require('mongoose');
const pbkdf2Async = require('util').promisify(require('crypto').pbkdf2);
const passwordConfig = require('../../cipher/password_config');
const HttpReqParaError = require('../../errors/http_errors/http_request_param_error');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, index: 1 },
  age: { type: Number, min: 0, max: 120 },
  username: { type: String, required: true, unique: true },
  password: { type: String },
})

const UserModel = mongoose.model('user', UserSchema);

async function insert(user) {
  const users = await UserModel.create(user);
  return users;
}

async function getOneById(id) {
  const users = await UserModel.findOne({ _id: id }, { password: 0 });
  return users;
}

async function getOneByName(name) {
  const users = await UserModel.findOne({ name }, { password: 0});
  return users;
}

async function list(params) {
  const match = {};
  const flow = UserModel.find(match);
  flow.select({ password: 0})
  const users = await flow.exec();
  return users;
}

async function createUserByNamePass(user) {
  const nameDupUser = await UserModel.findOne({
    $or: [{
      username: user.username,
    }, {
      name: user.name,
    }],
  }, { _id: 1 });

  if (nameDupUser) {
    throw new HttpReqParaError('username', '用户名已存在', `dulicate username : ${user.username}`);
  }
  const passToSave = await pbkdf2Async(
    user.password, passwordConfig.SALT,
    passwordConfig.ITERATIONS,
    passwordConfig.KEY_LENGTH,
    passwordConfig.DIGEST,
  );
  const created = await insert({
    username: user.username,
    password: passToSave,
    name: user.name,
  });
  return {
    _id: created._id,
    username: created.username,
    name: created.name,
  };
}

async function getUserByNamePass(username, password) {
  const passToFind = await pbkdf2Async(
    password, passwordConfig.SALT,
    passwordConfig.ITERATIONS,
    passwordConfig.DIGEST,
  );
  const found = await UserModel.findOne({
    username,
    password: passToFind,
  }, {
    password: 0,
  });
  return found;
}

module.exports = {
  insert,
  getOneById,
  getOneByName,
  list,
  createUserByNamePass,
  getUserByNamePass,
}
