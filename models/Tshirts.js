const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tshirtSchema = mongoose.Schema(
  {
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
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tshirt", tshirtSchema);
