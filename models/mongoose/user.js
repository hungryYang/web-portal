const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, index: 1 },
  age: { type: Number, min: 0, max: 120 },
})

const UserModel = mongoose.model('user', UserSchema);

async function insert(user) {
  const users = await UserModel.create(user);
  return users;
}

async function getOneById(id) {
  const users = await UserModel.findOne({ _id: id });
  return users;
}

async function getOneByName(name) {
  const users = await UserModel.findOne({ name });
  return users;
}

async function list(params) {
  const match = {};
  const flow = UserModel.find(match);
  const users = await flow.exec();
  return users;
}

module.exports = {
  insert,
  getOneById,
  getOneByName,
  list,
}
