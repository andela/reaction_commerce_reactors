/**
 * Created by bolorundurowb on 11/28/16.
 */
import {Reaction} from "/server/api";

Reaction.registerPackage({
  label: "Internal Analytics",
  name: "reaction-internal-analytics",
  icon: "fa fa-line-chart",
  autoEnable: true,
  settings: {
    name: "Internal Analytics"
  },
  registry: [
    {
      provides: "dashboard",
      route: "/dashboard/internal-analytics",
      name: "internal-analytics",
      label: "Internal Analytics",
      description: "Provides internal analytics",
      icon: "fa fa-line-chart",
      priority: 1,
      container: "core",
      workflow: "coreAnalyticsWorkflow",
      template: "internalAnalytics"
    }
  ],
  layout: [
    {
      layout: "coreLayout",
      layoutHeader: "layoutHeader",
      layoutFooter: "layoutFooter",
      collection: "History",
      label: "Internal Analytics",
      workflow: "coreAnalyticsWorkflow",
      theme: "default",
      enabled: true,
      structure: {
        notFound: "notFound",
        template: "internalAnalytics",
        dashboardHeader: "dashboardHeader",
        dashboardControls: "dashboardControls",
        adminControlsFooter: "adminControlsFooter"
      }
    }
  ]
});
