import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Packages } from "/lib/collections";

import "./wallet.html";


// Template.walletSettings.helpers({
//   WalletPackageConfig() {
//     return WalletPackageConfig;
//   },
//   packageData() {
//     return Packages.findOne({
//       name: "wallet-paymentmethod",
//       shopId: Reaction.getShopId()
//     });
//   }
// });
//
//
// Template.wallet.helpers({
//   packageData: function () {
//     return Packages.findOne({
//       name: "wallet-paymentmethod",
//       shopId: Reaction.getShopId()
//     });
//   }
// });

Template.wallet.events({
  "click [data-event-action=showWalletSettings]": function () {
    Reaction.showActionView();
  }
});

AutoForm.hooks({
  "wallet-update-form": {
    onSuccess: function () {
      Alerts.removeSeen();
      return Alerts.add("Wallet Payment Method settings saved.", "success");
    },
    onError: function (operation, error) {
      Alerts.removeSeen();
      return Alerts.add("Wallet Payment Method settings update failed. " + error, "danger");
    }
  }
});
