import { AnalyticsEvents } from "../../../lib/collections/";

export default function analytics(Api) {
  Api.addCollection(AnalyticsEvents);

  Api.addRoute("analytics", { authRequired: false }, {
    get: function () {
      return AnalyticsEvents.find().fetch();
    }
  });
}
