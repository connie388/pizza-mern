const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// for pizza
var menuChoiceByCategorySchema = new Schema(
  {
    category:  {  type: Schema.Types.ObjectId, ref: "MenuCategory" },
    shape: String,
    size: { type: String, required: true },
    amount: {type: Number, required: true}, 
    information: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuChoiceByCategory", menuChoiceByCategorySchema);
