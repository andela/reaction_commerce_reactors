/**
 * Created by bolorundurowb on 11/25/16.
 */
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const PurchaseHistory = new SimpleSchema({
  userId: {
    type: String,
    optional: false
  },
  date: {
    type: Date,
    defaultValue: new Date()
  },
  productId: {
    type: String,
    optional: false
  },
  cost: {
    type: Number,
    optional: true
  }
});
