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
  registry: [{}]
})
