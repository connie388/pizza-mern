const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateURL = function (url) {
  var re =
    /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
  return re.test(url);
};
var menuSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "MenuCategory" },
    name: {
      type: String,
      min: 3,
      max: 30,
      index: true,
      unique: true,
      required: true,
    },
    customize: { type: Boolean, default: false },
    new: { type: Boolean, default: false },
    calory: { type: String, required: false },
    amount: { type: Number, required: false },
    addons: [
      {
        // each pizza can have optional multiple addon choices such as cheese & vegetables
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToppingCategory",
        required: false,
      },
    ],
    description: { type: String, required: "Description can't be empty" },
    image: {
      type: String,
      // validate: {
      // validator: function (value) {
      //   const urlPattern =
      //     /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
      //   const urlRegExp = new RegExp(urlPattern);
      //   return value.match(urlRegExp);
      // },
      // message: (props) => `${props.value} is not a valid URL`,
      // },
      validate: {
        validator: validateURL,
        message: (props) => `${props.value} is not a valid URL`,
      },
      required: false,
    },
  },
  { timestamps: true }
);

menuSchema.virtual("type", {
  ref: "MenuChoiceByCategory",
  localField: "category",
  foreignField: "category",
});

menuSchema.virtual("choice", {
  ref: "MenuChoice",
  localField: "_id",
  foreignField: "menu",
});

// Set Object and Json property to true. Default is set to false
menuSchema.set("toObject", { virtuals: true });
menuSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Menu", menuSchema);
