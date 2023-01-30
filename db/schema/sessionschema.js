const mongoose = require("mongoose");
const { Schema } = mongoose;

const SessionSchema = new Schema({
  userid: String,
  token: String,
});

module.exports = {
  SessionSchema,
};
