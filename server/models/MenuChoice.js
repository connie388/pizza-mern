const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var menuChoiceSchema = new Schema(
  {
    menu: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    size: { type: String, required: true },
    amount: { type: Number, required: true },
    information: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuChoice", menuChoiceSchema);
