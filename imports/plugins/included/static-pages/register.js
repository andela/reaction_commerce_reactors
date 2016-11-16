import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Pages",
  name: "static-pages",
  icon: "fa fa-file",
  autoEnable: true,
  settings: {
    name: "Pages"
  },
  registry: [{
    route: "/dashboard/pages",
    provides: "dashboard",
    workflow: "corePageWorkflow",
    name: "pages",
    label: "Static Pages",
    description: "Create static pages",
    icon: "fa fa-file",
    priority: 1,
    container: "core",
    template: "pages"
  }, {
    route: "/dashboard/pages",
    name: "dashboard/pages",
    provides: "shortcut",
    label: "Static Pages",
    description: "Create static pages",
    icon: "fa fa-file",
    priority: 1
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "corePageWorkflow",
    collection: "Pages",
    theme: "default",
    enabled: true,
    structure: {
      template: "pages",
      layoutHeader: "layoutHeader",
      layoutFooter: "layoutFooter",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      dashboardHeaderControls: "",
      dashboardControls: "dashboardControls",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
