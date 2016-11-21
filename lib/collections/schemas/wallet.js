import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { CartItem } from "./cart"
export const WalletTransaction = new SimpleSchema({
  _id: {
    type: String
  },
  transactiontype: {
    type: String
  },
  description: {
    type: String
  },
  items: {
    type: [CartItem],
    optional: true
  },
  amount: {
    type: Number,
    decimal: true,
    min: 0.00
  },
  date: {
    type: Date
  }
});


export const Wallet = new SimpleSchema({
  userId: {
    type: String,
    unique: true
  },
  amount: {
    type: Number,
    decimal: true,
    defaultValue: 0.00,
    label: "Amount",
    min: 0.00
  },
  currency: {
    type: String,
    defaultValue: "USD",
    label: "Currency"
  },
  transactionHistory: {
    type: [WalletTransaction],
    optional: true
  }
});
