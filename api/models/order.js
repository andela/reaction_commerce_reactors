const Cart = require("./cart").Cart;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  cartId: {
    type: String,
    ref: Cart,
    required: false
  },
  history: {
    type: [Object],
    required: false
  },
  documents: {
    type: [Object],
    required: false
  },
  notes: {
    type: [Object],
    required: false
  },
  items: {
    type: [Object],
    required: false
  },
  transactions: {
    type: [Object],
    required: false
  }
});

exports.Orders = mongoose.model("Orders", OrderSchema, "Orders");
