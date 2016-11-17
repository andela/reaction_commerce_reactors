import _ from "lodash";
import path from "path";
import moment from "moment";
import accounting from "accounting-js";
import Future from "fibers/future";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Wallet } from "/lib/collections";
import * as Schemas from "/lib/collections/schemas";
import { Logger, Reaction } from "/server/api";

/**
 * Reaction Order Methods
 */
Meteor.methods({

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
      transactiontype: amount + " credit from " + paymentMethod.method
    };

    Wallet.update({
      userId: userId
    }, {
      $set: {
        amount: newAmount
      },
      $push: {transactionHistory: transaction}
    });

    const result = {
      success: true,
      message: "Refund of " + amount + " successfull " + " from " +  paymentMethod
    };

    Logger.info(`Credited wallet on refund for: ${ userId }`);

    return result;
  }

});
