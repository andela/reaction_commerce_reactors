import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Pages",
  name: "pages",
  icon: "fa fa-cubes",
  autoEnable: true,
  registry: [{
    route: "/page/:handle",
    name: "page",
    template: "page",
    workflow: "corePageWorkflow"
  }, {
    label: "Pages",
    provides: "settings",
    route: "/page/:handle",
    container: "core",
    template: "PageAdmin"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreProductWorkflow",
    collection: "Pages",
    theme: "default",
    enabled: true,
    structure: {
      template: "page",
      layoutHeader: "layoutHeader",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "",
      dashboardControls: "",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
