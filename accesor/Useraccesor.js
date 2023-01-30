const Users = require("../db/model/usermodel").Users;

function addNewUser(user) {
  return Users.create(user);
}

function findMyEmail(email) {
  return Users.find({ email: email }).exec();
}

function findByUserId(userId) {
  return Users.find({ userId }).exec();
}

function updateUser(user) {
  return user.save();
}

module.exports = {
  addNewUser,
  findMyEmail,
  updateUser,
  findByUserId,
};
