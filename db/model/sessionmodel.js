const mongoose = require("mongoose");
const SessionSchema = require("../schema/sessionschema").SessionSchema;

const Sessions = mongoose.model("sessions", SessionSchema);

module.exports = {
  Sessions,
};
