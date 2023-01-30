var mongoose = require("mongoose");
const UserSchema = require("../schema/userschema").UserSchema;

const Users = mongoose.model( 'users', UserSchema);

module.exports = {
  Users
};
