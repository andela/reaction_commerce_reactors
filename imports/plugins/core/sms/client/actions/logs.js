import { Router, i18next } from "/client/api";

export default {

  /**
   * Update the limit query param in the URL
   * @param {Object} event - sythetic React event
   * @return {String} returns the updated limit
   */
  updateLimit(event) {
    return _.debounce(() => {
      const limit = event.target.value;
      if (!limit) {
        Router.setQueryParams({ limit: null });
      } else {
        Router.setQueryParams({ limit });
      }
    }, 300, { maxWait: 1000 })();
  },


  /**
   * Restart a failed or cancelled sms job
   * @param {Object} sms - the sms job object
   * @return {null} triggers an alert
   */
  resend(sms) {
    Meteor.call("smss/retryFailed", sms._id, (err) => {
      if (err) {
        return Alerts.toast(i18next.t("app.error", { error: err.reason }), "error");
      }
      return Alerts.toast(i18next.t("sms.alerts.resendSuccess", { sms: sms.data.to }), "success");
    });
  }
};
