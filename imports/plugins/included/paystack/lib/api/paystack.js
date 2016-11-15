import {Packages} from "/lib/collections";

export const Paystack = {
  accountOptions: function () {
    const settings = Packages.findOne({
      name: "reaction-paystack"
    }).settings;
    if (!settings.apiPublicKey) {
      throw new Meteor.Error("403", "Invalid Credentials");
    }
    return settings.apiPublicKey;
  },

  authorize: function (cardInfo, paymentInfo, callback) {
    Meteor.call("paystackSubmit", "authorize", cardInfo, paymentInfo, callback);
  }
};
