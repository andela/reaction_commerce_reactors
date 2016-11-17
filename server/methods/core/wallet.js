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
  "wallet/getUserWallet": function () {
    const userWallet = Wallet.findOne({userId: Meteor.userId()});
    return userWallet;
  },
  "wallet/creditWalletOnRefund": function () {
    
  }
});
