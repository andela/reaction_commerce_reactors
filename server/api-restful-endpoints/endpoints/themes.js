import { Themes } from "../../../lib/collections/";

export function themes(Api) {
  Api.addCollection(Themes);

  Api.addRoute("themes", { authRequired: false }, {
    get: function () {
      return Themes.find().fetch();
    },
    post: {
      action: function () {
        if (Themes.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Theme added"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to add theme"
          }
        };
      }
    }
  });

  Api.addRoute("themes/:id", { authRequired: false }, {
    get: function () {
      return Themes.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: function () {
        if (Themes.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Theme deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Theme not found" }
        };
      }
    }
  });
}
