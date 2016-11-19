/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Cart, Shops, Order} from "/lib/collections";
import { Wallet } from "/lib/collections";

import "./wallet.html";

Template.walletCheckout.onCreated(function () {
  this.subscribe("Wallet");
});

function canAfford(walletBalance, cartTotal) {
  return walletBalance >= cartTotal;
}

Template.walletCheckout.helpers({
  wallet: function () {
    const userWallet = Wallet.findOne({userId: Meteor.userId()});
    return userWallet;
  },
  isEmpty: function (amount) {
    if (amount === 0) {
      return true;
    }
    return false;
  }
});

Template.walletCheckout.events({
  "click #top-up-wallet": function () {
    // Meteor.Router.to('/checkout/wallet');
    console.log("in")
  },

  "click #btn-wallet-pay": function () {
    const cartTotal = parseFloat(Cart.findOne().cartTotal());
    const userWallet = Wallet.findOne({userId: Meteor.userId()});
    const cartId = Cart.findOne()._id;

    if (canAfford(userWallet.amount, cartTotal)) {
      const newAmount = userWallet.amount - cartTotal;
      const transaction = {
        _id: cartId,
        amount: cartTotal,
        date: new Date(),
        transactiontype: cartTotal + "debit for transaction, cartId: " + cartId
      };

      Meteor.call("wallet/updateOnPayment", newAmount, transaction);

      const paymentMethod = {
        processor: "Wallet",
        method: "Wallet",
        transactionId: cartId,
        amount: cartTotal,
        status: "Success",
        mode: "void",
        createdAt: new Date(),
        updatedAt: new Date(),
        transactions: [transaction]
      };

      Meteor.call("cart/submitPayment", paymentMethod);
    } else {
      Alerts.toast("Insufficient funds. Top up wallet first. ", {
        html: true,
        timeout: 10000
      });
    }
  }
});
