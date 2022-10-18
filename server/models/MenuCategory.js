const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var menuCategorySchema = new Schema(
  {
    category: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);


// Set Object and Json property to true. Default is set to false
menuCategorySchema.set("toObject", { virtuals: true });
menuCategorySchema.set("toJSON", { virtuals: true });

menuCategorySchema.virtual("list", {
  ref: "MenuChoiceByCategory", // refer to table 'Toppings'
  localField: "_id", // both tables have the same key category
  foreignField: "category",
});

module.exports = mongoose.model("MenuCategory", menuCategorySchema);
