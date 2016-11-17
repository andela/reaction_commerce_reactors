import { Wallet } from "/lib/collections";
import { Reaction } from "/server/api";

/**
 * wallet
 */

Meteor.publish("Wallet", function () {
  return Wallet.find({
    userId: this.userId
  });
});
