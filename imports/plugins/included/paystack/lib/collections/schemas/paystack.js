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
  },
  payerNumber: {
    type: String,
    label: "Mobile Number"
  },
  payerName: {
    type: String,
    label: "Name"
  },
  cardNumber: {
    type: String,
    min: 4,
    max: 16,
    label: "Card last 4 digits"
  },
  expireMonth: {
    type: String,
    max: 2,
    label: "Expiration month"
  },
  expireYear: {
    type: String,
    max: 4,
    label: "Expiration year"
  },
  transactionReference: {
    type: String,
    label: "Transaction Reference"
  }
});
