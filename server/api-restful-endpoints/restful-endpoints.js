// import * as Collections from "../../lib/collections/";
import * as Endpoints from "./endpoints";

if (Meteor.isServer) {
  // Global API configuration
  const Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  for (const endpoint in Endpoints) {
    if (Endpoints.hasOwnProperty(endpoint)) {
      Endpoints[endpoint](Api);
    }
  }

  Api.addCollection(Meteor.users, {
    excludedEndpoints: ["put"],
    routeOptions: {
      authRequired: true
    },
    endpoints: {
      post: {
        authRequired: false
      },
      delete: {
        roleRequired: "admin"
      }
    }
  });
}
