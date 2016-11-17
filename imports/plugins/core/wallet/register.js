// /* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Wallet",
  name: "wallet-paymentmethod",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
   name: "Wallet Payment"
  },
  registry: [
    // Dashboard card
    {
      provides: "dashboard",
      route: "/dashboard/wallet",
      name: "Wallet",
      label: "Pay by Wallet",
      description: "Wallet",
      icon: "fa fa-credit-card-alt",
      priority: 3,
      container: "paymentMethod",
      workflow: "coreDashboardWorkflow",
      template: "wallet"
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
      template: "walletCheckout",
      provides: "paymentMethod"
    }
  ]
});
