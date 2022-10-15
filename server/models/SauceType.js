const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var sauceTypeSchema = new Schema(
  {
    name: { type: String, min: 3, max: 30, required: true, unique: true },
    desc: { type: String },
    image: {
      type: String,
      required: false,
      validate: {
        validator: function (value) {
          const urlPattern =
            /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
          const urlRegExp = new RegExp(urlPattern);
          return (value?.length > 0 && value?.match(urlRegExp)) || true;
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
    amountType: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SauceType", sauceTypeSchema);
