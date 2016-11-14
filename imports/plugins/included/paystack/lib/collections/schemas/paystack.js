/**
 * Created by bolorundurowb on 11/14/16.
 */
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {PackageConfig} from "/lib/collections/schemas/registry";

export const PaystackPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.mode": {
      type: Boolean,
      defaultValue: true
    },
    "settings.apiSecretKey": {
      type: String,
      label: "API Secret Key",
      optional: true
    },
    "settings.apiPublicKey": {
      type: String,
      label: "API Public Key",
      optional: true
    }
  }
]);

export const PaystackPayment = new SimpleSchema({
  payerName: {
    type: String,
    label: "Cardholder name"
  },
  cardNumber: {
    type: String,
    min: 13,
    max: 16,
    label: "Card number"
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
  cvv: {
    type: String,
    max: 4,
    label: "CVV"
  }
});

