const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var toppingCategorySchema = new Schema(
  {
    // category: meat, cheese, vegetables
    category: { type: String, min: 3, max: 30, unique: true, required: true },
    price: { type: Number },
  },
  { timestamps: true }
);

// Set Object and Json property to true. Default is set to false
toppingCategorySchema.set("toObject", { virtuals: true });
toppingCategorySchema.set("toJSON", { virtuals: true });

// ToppingCategory.find().populate('list') to get list of toppings
toppingCategorySchema.virtual("list", {
  ref: "Toppings", // refer to table 'Toppings'
  localField: "_id", // both tables have the same key category
  foreignField: "category",
});

module.exports = mongoose.model("ToppingCategory", toppingCategorySchema);
