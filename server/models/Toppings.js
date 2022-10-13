const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var toppingsSchema = new Schema(
  {
    topping: { type: String, min: 3, max: 30, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, ref: "ToppingCategory" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Toppings", toppingsSchema);
