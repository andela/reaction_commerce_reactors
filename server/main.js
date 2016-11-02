import "./methods";
import Startup from "./startup";
import Security from "./security";
import Api from "/api";

Meteor.startup(() => {
  Api();
  Startup();
  Security();
});
