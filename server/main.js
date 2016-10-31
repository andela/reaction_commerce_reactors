import "./methods";
import Startup from "./startup";
import Security from "./security";
import CreateEndpoint from "./rest-endpoints";

Meteor.startup(() => {
  Startup();
  Security();
  CreateEndpoint();
});
