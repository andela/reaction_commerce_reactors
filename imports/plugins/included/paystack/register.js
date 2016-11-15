/* eslint camelcase: 0 */
import {Reaction} from "/server/api";

Reaction.registerPackage({
  label: "PaystackPayment",
  name: "reaction-paystack",
  icon: "fa fa-cc-mastercard",
  autoEnable: true,
  settings: {
    mode: false,
    apiKey: ""
  },
  registry: [
    // Dashboard card
    {
      provides: "dashboard",
      label: "Paystack",
      description: "Paystack payments",
      icon: "fa fa-cc-mastercard",
      priority: 3,
      container: "paymentMethod"
    },

    // Settings panel
    {
      label: "Paystack Settings", // this key (minus spaces) is used for translations
      route: "/dashboard/paystack",
      provides: "settings",
      container: "dashboard",
      template: "paystackSettings"
    },

    // Payment form for checkout
    {
      template: "paystackPaymentForm",
      provides: "paymentMethod"
    }
  ]
});
