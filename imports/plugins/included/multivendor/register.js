// /* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Vendor",
  name: "vendor-application",
  icon: "fa fa-ticket",
  autoEnable: true,
  settings: {
    mode: false,
    name: "Vendor"
  },
  registry: [
    // Dashboard card
    {
      provides: "dashboard",
      label: "Multi-Vendor",
      description: "Multi-Vendor",
      icon: "fa fa-ticket",
      priority: 3,
      container: "core",
      route: "/reaction/vendor"
    },

    {
      route: "/vendor",
      name: "vendor",
      description: "Vendor",
      label: "Vendor",
      template: "vendor-application",
      icon: "fa fa-ticket",
      priority: 0,
      permissions: [{
        label: "Vendor",
        permission: "vendor"
      }]
    }]
});
