import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Wallet } from "/lib/collections";
import * as Schemas from "/lib/collections/schemas";
import { Logger, Reaction } from "/server/api";

/**
 * Reaction Order Methods
 */
Meteor.methods({

  // Creates new wallet for all users on sign up
  "wallet/createWallet": function (userId) {
    const userWallet = Wallet.findOne({userId: userId});
    if (!userWallet) {
      Wallet.insert({
        userId: userId
      }, function (err) {
        if (!err) {
          Logger.info(`Error occured wallet not created for: ${ userId }`);
        } else {
          Logger.info(`Wallet Created for user id: ${ userId }`);
        }
      });
    } else {
      Logger.info(`Wallet already exists for this user: ${ userId }`);
    }
  },

  // Get current users wallet
  "wallet/getUserWallet": function () {
    const userWallet = Wallet.findOne({userId: Meteor.userId()});
    return userWallet;
  },

  // Credits wallet when canceling orders at refund
  "wallet/refund/create": function (orderId, userId, paymentMethod, amount) {
    check(orderId, String);
    check(userId, String);
    check(paymentMethod, Object);
    check(amount, Number);

    const userWallet = Wallet.findOne({userId: userId});
    const newAmount = userWallet.amount + amount;
    const transaction = {
      _id: orderId,
      amount: amount,
      date: new Date(),
      transactiontype: "Credit",
      description: amount + " credit from " + paymentMethod.method + "for order " + orderId
    };

    Meteor.call("wallet/updateOnPayment", newAmount, transaction);

    const result = {
      success: true,
      message: "Refund of " + amount + " successfull " + " from " +  paymentMethod
    };

    Logger.info(`Credited wallet on refund for: ${ userId }`);

    return result;
  },

  // Updates wallet with a certain amount and transaction
  "wallet/updateOnPayment": function (amount, transaction) {
    check(amount, Number);
    check(transaction, Object);

    Wallet.update({
      userId: Meteor.userId()
    }, {
      $set: {
        amount: amount
      },
      $push: {transactionHistory: transaction}
    });
  },

  // Funds wallet
  "wallet/fundWallet": function (paymentMethod) {
    check(paymentMethod, Object);

    const userWallet = Wallet.findOne({ userId: Meteor.userId() });
    const newAmount = userWallet.amount + (paymentMethod.amount / 100);
    const transaction = {
      _id: paymentMethod.transactionId,
      amount: paymentMethod.amount / 100,
      date: new Date(),
      transactiontype: "Credit",
      description: paymentMethod.amount / 100 + " credit from Wallet top up by " + paymentMethod.method
    };

    Meteor.call("wallet/updateOnPayment", newAmount, transaction);
  }
});
