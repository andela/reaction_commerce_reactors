const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductVariant = require("./product").ProductVariant;

const CartItemSchema = new Schema({
  productId: {
    type: String
  },
  shopId: {
    type: String,
    required: false
  },
  quantity: {
    type: Number
  },
  variants: {
    type: String,
    ref: ProductVariant,
    required: false
  },
  title: {
    type: String
  },
  type: {
    type: String,
    required: false
  },
  cartItemId: { // Seems strange here but has to be here since we share schemas between cart and order
    type: String,
    required: false
  }
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

const CartItemsSchema = new Schema({
  items: [{
    type: String,
    ref: CartItem,
    required: false
  }]
});

const CartSchema = new Schema({
  shopId: {
    type: String
  },
  userId: {
    type: String
  },
  sessionId: {
    type: String
  },
  email: {
    type: String,
    required: false
  },
  items: [{
    type: String,
    required: false
  }],
  shipping: {
    type: String,
    required: false
  },
  billing: {
    type: String,
    required: false
  },
  tax: {
    type: Number,
    required: false
  },
  taxes: {
    type: String,
    required: false
  },
  workflow: {
    status: {type: String},
    workflow: {type: String},
    required: false
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

CartSchema.pre("save", function (next) {
  now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const CartItems = mongoose.model("CartItems", CartItemsSchema);
exports.Cart = mongoose.model("Cart", CartSchema, "Cart");
