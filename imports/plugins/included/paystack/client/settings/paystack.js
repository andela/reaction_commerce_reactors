import {Template} from "meteor/templating";
import {Reaction} from "/client/api";
import {Packages, PaystackSettings} from "/lib/collections";
import {PaystackPackageConfig} from "../../lib/collections/schemas";

import "./paystack.html";


Template.paystackSettings.helpers({
  PaystackPackageConfig() {
    return PaystackPackageConfig;
  },
  packageData() {
    return Packages.findOne({
      name: "reaction-paystack",
      shopId: Reaction.getShopId()
    });
  }
});


Template.paystack.helpers({
  packageData: function () {
    return Packages.findOne({
      name: "reaction-paystack",
      shopId: Reaction.getShopId()
    });
  }
});

Template.paystack.events({
  "click [data-event-action=showPaystackSettings]": function () {
    Reaction.showActionView();
  }
});

AutoForm.hooks({
  "paystack-update-form": {
    before: {
      update: function (doc) {
        const id = Meteor.userId();
        const publicKey = doc.$set["settings.apiPublicKey"];
        const secretKey = doc.$set["settings.apiSecretKey"];
        Meteor.call("settings/paystack", id, publicKey, secretKey);
        return doc;
      }
    },
    onSuccess: function () {
      Alerts.removeSeen();
      return Alerts.toast("Paystack settings saved.", "success");
    },
    onError: function (operation, error) {
      Alerts.removeSeen();
      return Alerts.toast("Paystack settings update failed. " + error, "danger");
    }
  }
});
