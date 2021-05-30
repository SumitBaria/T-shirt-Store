const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema;

const cartItemSchema = mongoose.Schema(
  {
    product: { type: ObjectID, ref: "Tshirt" },
    name: String,
    price: Number,
    count: Number,
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

const orderSchema = mongoose.Schema({
  products: [cartItemSchema],
  transaction_id: {},
  amount: { type: Number },
  address: {
    type: String,
  },
  status: {
    type: String,
    default: "Not Processed",
    enum: ["not Processed", "Processed", "Shipped", "Delivered", "Cancelled"],
  },
  updated: Date,
  user: { type: ObjectID, ref: "User" },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, CartItem };
