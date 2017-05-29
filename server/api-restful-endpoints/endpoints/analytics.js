import { AnalyticsEvents } from "../../../lib/collections/";

export function analytics(Api) {
  Api.addCollection(AnalyticsEvents);

  Api.addRoute("analytics", { authRequired: false }, {
    get: function () {
      return AnalyticsEvents.find().fetch();
    }
    // post: {
    //   action: function () {
    //     if (AnalyticsEvents.insert(this.request.body)) {
    //       return {
    //         status: "success",
    //         data: {
    //           message: "Account created"
    //         }
    //       };
    //     }
    //     return {
    //       status: "fail",
    //       data: {
    //         message: "Failed to create account"
    //       }
    //     };
    //   }
    // }
  });

  // Api.addRoute("accounts/:id", { authRequired: false }, {
  //   get: function () {
  //     return AnalyticsEvents.findOne(this.urlParams.id);
  //   },
  //   delete: {
  //     action: function () {
  //       if (AnalyticsEvents.remove(this.urlParams.id)) {
  //         return { status: "success", data: { message: "Account deleted" } };
  //       }
  //       return {
  //         statusCode: 404,
  //         body: { status: "fail", message: "Account not found" }
  //       };
  //     }
  //   }
  // });
}
