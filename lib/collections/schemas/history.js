/**
 * Created by bolorundurowb on 11/24/16.
 */
import {SimpleSchema} from "meteor/aldeed:simple-schema";

const ProductSchema = new SimpleSchema({
  productId: {
    type: String,
    optional: false
  },
  views: {
    type: Number,
    optional: true
  },
  purchased: {
    type: Number,
    optional: true
  }
});

const UserSchema = new SimpleSchema({
  userId: {
    type: String,
    optional: false
  },
  products: {
    type: [ProductSchema],
    defaultValue: []
  }
});

export const History = new SimpleSchema({
  date: {
    type: Date,
    optional: false
  },
  users: {
    type: [UserSchema],
    defaultValue: []
  }
});
