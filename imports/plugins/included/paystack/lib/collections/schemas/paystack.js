import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {PackageConfig} from "/lib/collections/schemas/registry";

export const PaystackPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.mode": {
      type: Boolean,
      defaultValue: true
    },
    "settings.apiPublicKey": {
      type: String,
      label: "API Public Key",
      optional: true
    }
  }
]);

export const PaystackPayment = new SimpleSchema({
  payerEmail: {
    type: String,
    label: "Email Address"
  }
});
