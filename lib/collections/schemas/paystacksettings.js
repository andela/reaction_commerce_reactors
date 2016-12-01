/**
 * Created by bolorundurowb on 11/23/16.
 */
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const PaystackSettings = new SimpleSchema({
  userId: {
    type: String,
    optional: true
  },
  apiPublicKey: {
    type: String,
    optional: true
  },
  apiSecretKey: {
    type: String,
    optional: true
  }
});
