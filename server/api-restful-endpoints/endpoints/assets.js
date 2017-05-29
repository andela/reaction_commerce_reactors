import { Assets } from "../../../lib/collections/";

export function assets(Api) {
  Api.addCollection(Assets);

  Api.addRoute("assets", { authRequired: false }, {
    get: function () {
      return Assets.find().fetch();
    },
    post: {
      action: function () {
        if (Assets.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Language successfully added"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to add Language"
          }
        };
      }
    }
  });

  Api.addRoute("assets/:id", { authRequired: false }, {
    get: function () {
      return Assets.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: function () {
        if (Assets.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Language removed" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Language not existent" }
        };
      }
    }
  });
}
