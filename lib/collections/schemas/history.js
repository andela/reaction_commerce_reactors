/**
 * Created by bolorundurowb on 11/24/16.
 */
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const History = new SimpleSchema({
  userId: {
    type: String,
    optional: true
  },
  date: {
    type: Date,
    defaultValue: new Date()
  },
  productId: {
    type: String,
    optional: false
  },
  productUri: {
    type: String,
    optional: true
  },
  views: {
    type: Number,
    optional: true
  },
  purchased: {
    type: Boolean,
    optional: true
  }
});
