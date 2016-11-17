import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const WalletTransaction = new SimpleSchema({
  _id: {
    type: String
  },
  transactiontype: {
    type: String
  },
  amount: {
    type: Number,
    decimal: true
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
  },
  email: {
    type: String,
    optional: true
  }
});
