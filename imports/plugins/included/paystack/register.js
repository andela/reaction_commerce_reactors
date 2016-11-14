/**
 * Created by bolorundurowb on 11/14/16.
 */
/* eslint camelcase: 0 */
import {Reaction} from "/server/api";

Reaction.registerPackage({
  label: "Paystack",
  name: "paystack",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
    mode: false,
    apiPublicKey: "",
    apiSecretKey: ""
  },
  registry: [
    // Dashboard card
    {
      provides: "dashboard",
      label: "Paystack",
      description: "Paystack payments",
      icon: "fa fa-credit-card",
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
      template: "paystackForm",
      provides: "paymentMethod"
    }
  ]
});
