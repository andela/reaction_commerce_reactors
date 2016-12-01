import {Packages, PaystackSettings} from "/lib/collections";

export const Paystack = {
  accountOptions: function () {
    const settings = Packages.findOne({
      name: "reaction-paystack"
    }).settings;
    if (!settings.apiPublicKey || !settings.apiSecretKey) {
      throw new Meteor.Error("403", "Invalid Credentials");
    }
    return settings;
  },

  accountSettings: function () {
    return PaystackSettings.find().fetch();
  },

  authorize: function (cardInfo, callback) {
    Meteor.call("paystackSubmit", "authorize", cardInfo, paymentInfo, callback);
  }
};
