import Alert from "sweetalert2";
import { Reaction, i18next } from "/client/api";

export default {

  /**
   * Open the sms settings menu
   * @return {Boolean} returns true if action view toggled
   */
  toggleSettings() {
    Reaction.showActionView({
      label: i18next.t("sms.headers.smsSettings"),
      template: "smsSettings"
    });
    return true;
  },

  /**
   * Save sms settings
   * @param {Object} settings - object of sms provider settings
   * @param {Function} callback - optional callback
   * @return {Boolean} returns true if all fields provided and update method called
   */
  saveSettings(settings, callback) {
    const service = settings.service;
    if (!service) {
      Alert(i18next.t("app.error"), i18next.t("sms.alerts.missingService"), "error");
      return callback();
    }

    const save = () => {
      Meteor.call("sms/saveSettings", settings, (err) => {
        if (err) {
          return Alert(i18next.t("app.error"),
            i18next.t("sms.alerts.saveFailed", { error: err.reason }),
            "error");
        }
        return Alert({
          title: i18next.t("app.success"),
          text: i18next.t("sms.alerts.saveSuccess"),
          type: "success",
          timer: 1700
        }).catch(() => null);
      });
    };

    save();

    return true;
  }
};
