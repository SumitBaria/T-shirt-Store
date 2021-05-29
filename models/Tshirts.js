const mongoose = require("mongoose");

const tshirtSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  offer: {
    type: String,
  },
  tranding: {
    type: Boolean,
  },
  feature: {
    type: Boolean,
  },
  Category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tshirt", tshirtSchema);
