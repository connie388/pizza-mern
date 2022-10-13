const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var cheeseTypeSchema = new Schema(
  {
    name: { type: String, min: 3, max: 30, required: true, unique: true },
    desc: { type: String, required: false },
    image: {
      type: String,
      required: false,
      validate: {
        validator: function (value) {
          const urlPattern =
            /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
          const urlRegExp = new RegExp(urlPattern);
          return value.match(urlRegExp);
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CheeseType", cheeseTypeSchema);
