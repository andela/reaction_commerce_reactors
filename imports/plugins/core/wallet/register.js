// /* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Wallet",
  name: "wallet-paymentmethod",
  icon: "fa fa-ticket",
  autoEnable: true,
  settings: {
    mode: false,
    name: "Wallet Payment"
  },
  registry: [
    // Dashboard card
    {
      provides: "dashboard",
      label: "Pay by Wallet",
      description: "Wallet",
      icon: "fa fa-ticket",
      priority: 3,
      container: "paymentMethod",
      workflow: "coreDashboardWorkflow"
    },

    // Payment form for checkout
    {
      template: "walletCheckout",
      provides: "paymentMethod"
    }
  ]
});
