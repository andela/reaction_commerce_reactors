/**
 * Created by bolorundurowb on 11/23/16.
 */
import {Meteor} from "meteor/meteor";
import {PaystackSettings} from "/lib/collections";
import {Logger} from "/server/api";

PaystackSettings.allow({});

Meteor.methods({
  "settings/paystack": function (id, publicKey, secretKey) {
    check(id, String);
    check(publicKey, String);
    check(secretKey, String);

    this.unblock();

    let paystackSetting = PaystackSettings.findOne({userId: id});
    if (paystackSetting) {
      PaystackSettings.update({userId: id}, {
        $set: {
          apiPublicKey: publicKey,
          apiSecretKey: secretKey
        }
      });
    } else {
      PaystackSettings.insert({
        userId: id,
        apiPublicKey: publicKey,
        apiSecretKey: secretKey
      });
    }

    Logger.info("Paystack API Keys stored");
  },

  "settings/getPaystack": function () {
    return PaystackSettings.find().fetch();
  }
});
