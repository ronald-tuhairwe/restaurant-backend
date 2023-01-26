const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    category: String,
    price: Number,
    information: String,
  },
  {
    versionKey: false,
  }
);

const Model = mongoose.model("Foods", foodSchema);
module.exports = Model;
