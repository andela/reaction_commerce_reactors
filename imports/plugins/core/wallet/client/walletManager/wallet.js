/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Cart, Shops} from "/lib/collections";
import { Wallet } from "/lib/collections";
import Paystack from "/imports/plugins/included/paystack/lib/api";

import "./wallet.html";

Template.walletManager.onCreated(function () {
  this.subscribe("Wallet");
  Meteor.call("settings/getPaystack", (error, data) => {
    Window.KEYS = data;
  });
});

Template.walletManager.helpers({
  wallet: () => {
    const userWallet = Wallet.findOne({userId: Meteor.userId()});
    return userWallet;
  }
});

Template.walletManager.events({
  "click #top-up-wallet": function () {
    document.getElementById("fundWallet").style.display = "block";
    document.getElementById("history-bar").style.display = "none";
    document.getElementById("show-history").style.display = "block";
  },
  "click #history-button": function () {
    document.getElementById("fundWallet").style.display = "none";
    document.getElementById("history-bar").style.display = "block";
    document.getElementById("show-history").style.display = "none";
  }
});
