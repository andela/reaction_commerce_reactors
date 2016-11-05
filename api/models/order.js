const Cart = require("./cart").Cart;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historyObject = {
  day: String,
  month: String
};
const OrderSchema = new Schema({
  cartId: {
    type: String,
    ref: Cart,
    required: false
  },
  history: [historyObject],
  documents: [{
    title: String,
    body: String
  }],
  notes: [{
    type: String,
    required: false
  }],
  items: [{
    type: String,
    required: false
  }],
  transactions: [{
    type: Object,
    required: false
  }]
});

exports.Orders = mongoose.model("Orders", OrderSchema, "Orders");
