import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const WalletTransaction = new SimpleSchema({
  _id: {
    type: String
  },
  transactiontype: {
    type: String
  },
  amount: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate && !this.isSet) {
        return new Date;
      }
      this.unset();
    },
    denyUpdate: true
  }
});


export const Wallet = new SimpleSchema({
  userId: {
    type: String,
    unique: true
  },
  amount: {
    type: Number,
    defaultValue: 0,
    label: "Amount",
    min: 0,
    decimal: true
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
