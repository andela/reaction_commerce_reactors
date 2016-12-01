import Nexmo from "nexmo";
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Packages } from "/lib/collections";
import { Logger, Reaction } from "/server/api";

Meteor.methods({

  /**
   * Save new sms configuration
   * @param {Object} settings - sms provider settings
   * @return {Boolean} - returns true if update succeeds
   */
  "sms/saveSettings"(settings) {
    if (!Roles.userIsInRole(this.userId, ["owner", "admin", "dashboard"])) {
      Logger.error("sms/saveSettings: Access Denied");
      throw new Meteor.Error("access-denied", "Access Denied");
    }

    check(settings, {
      service: String,
      apiKey: Match.Optional(String),
      apiSecret: Match.Optional(String)
    });

    Packages.update({ name: "core", shopId: Reaction.getShopId() }, {
      $set: {
        "settings.sms": settings
      }
    });

    Logger.info("SMS settings updated");

    return true;
  },

  "sms/sendMessage"(from, to, message) {
    check(from, String);
    check(to, String);
    check(message, String);

    const smsSettings = Reaction.getShopSettings().sms;

    switch (smsSettings.service) {
      case "Nexmo":
        Meteor.call("sms/Nexmo", smsSettings, from, to, message);
        break;
      case "Esendex":
        Meteor.call("sms/Esendex", smsSettings, from, to, message);
        break;
      case "Sinch":
        Meteor.call("sms/Sinch", smsSettings, from, to, message);
        break;
      default:
        break;
    }
  },

  "sms/Nexmo"(smsSettings, from, to, message) {
    check(smsSettings, {
      service: String,
      apiKey: Match.Optional(String),
      apiSecret: Match.Optional(String)
    });
    check(from, String);
    check(to, String);
    check(message, String);

    const nexmo = new Nexmo({
      apiKey: smsSettings.apiKey,
      apiSecret: smsSettings.apiSecret
    });

    nexmo.message.sendSms(from, to, message, (err, responseData) => {
      if (err) {
        Logger.error(`sms/sendMessage: ${err}`);
      } else {
        Logger.info(`Message sent. sms/sendMessage: ${responseData}`);
      }
    });
  },

  "sms/Esendex"(from, to, message) {
    check(smsSettings, {
      service: String,
      apiKey: Match.Optional(String),
      apiSecret: Match.Optional(String)
    });
    check(from, String);
    check(to, String);
    check(message, String);
  },

  "sms/Sinch"(from, to, message) {
    check(smsSettings, {
      service: String,
      apiKey: Match.Optional(String),
      apiSecret: Match.Optional(String)
    });
    check(from, String);
    check(to, String);
    check(message, String);
  }
});
