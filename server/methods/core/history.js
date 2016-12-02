/**
 * Created by bolorundurowb on 12/2/16.
 */
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {History} from "/lib/collections";
import {Logger} from "/server/api";

History.allow({});

Meteor.methods({
  "history/addView": function (productId) {
    check(productId, String);

    this.unblock();

    const userId = this.userId;
    const currentDate = new Date().toISOString().slice(0, 10);
    const history = History.findOne({date: currentDate});
    console.log(userId, currentDate, history);

    Logger.info("Product view has been logged.");
  },

  "history/addPurchase": function (userId, productId) {
    check(userId, String);
    check(productId, String);

    this.unblock();

    Logger.info("Product purchase has been logged");
  },

  "history/getDate": function (date) {
    return History.findOne({date: date});
  },

  "history/getAll": function () {
    return History.find().fetch();
  }
});
