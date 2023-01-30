const mongoose = require("mongoose");
const Showschema = require("../schema/showschema").Showschema;

const Shows = mongoose.model(`shows`, Showschema);

module.exports = {
  Shows,
};
