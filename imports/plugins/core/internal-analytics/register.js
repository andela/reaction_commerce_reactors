/**
 * Created by bolorundurowb on 11/28/16.
 */
import {Reaction} from "/server/api";

Reaction.registerPackage({
  label: "Internal Analytics",
  name: "reaction-internal-analytics",
  icon: "fa fa-bar-chart-o",
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
      icon: "fa fa-bar-chart-o",
      priority: 1,
      container: "core",
      workflow: "coreDashboardWorkflow",
      template: "internal-analytics"
    },
    {
      template: "internalAnalytics",
      provides: "analyticsMethod"
    }
  ]
});
