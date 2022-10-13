const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var menuCategorySchema = new Schema(
  {
    category: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuCategory", menuCategorySchema);
