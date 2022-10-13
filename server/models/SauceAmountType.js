const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var sauceAmountTypeSchema = new Schema(
  {
    type: String,
    unique: true,
    required: true,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SauceAmountType", sauceAmountTypeSchema);
