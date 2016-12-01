import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Text Messaging",
  name: "reaction-sms",
  icon: "fa fa-envelope-o",
  autoEnable: true,
  settings: {
    name: "SMS"
  },
  registry: [{
    route: "/dashboard/sms/status",
    provides: "dashboard",
    workflow: "coreSMSWorkflow",
    name: "SMS Status",
    label: "SMS",
    description: "SMS settings",
    icon: "fa fa-envelope-o",
    priority: 1,
    container: "core",
    template: "smsStatusPage"
  }, {
    label: "SMS Settings",
    name: "sms/settings",
    provides: "settings",
    template: "smsSettings"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreSMSWorkflow",
    theme: "default",
    enabled: true,
    structure: {
      template: "sms",
      layoutHeader: "layoutHeader",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      // dashboardHeaderControls: "smsDashboardTabs", // removed until needed for nav
      dashboardControls: "dashboardControls",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
