/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "WalletPayment",
  name: "wallet-paymentmethod",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
    mode: false,
    apiKey: ""
  },
  registry: [
    // Dashboard card
    {
      provides: "dashboard",
      label: "Wallet Payment Provider",
      description: "Wallet payment provider",
      icon: "fa fa-credit-card-alt",
      priority: 3,
      container: "paymentMethod"
    },

    // Settings panel
    {
      label: "Wallet Payment Settings", // this key (minus spaces) is used for translations
      route: "/dashboard/wallet",
      provides: "settings",
      container: "dashboard",
      template: "walletSettings"
    },

    // Payment form for checkout
    {
      template: "walletPaymentForm",
      provides: "paymentMethod"
    }
  ]
});
