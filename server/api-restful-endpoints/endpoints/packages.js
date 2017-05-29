import { Packages } from "../../../lib/collections/";

export function packages(Api) {
  Api.addCollection(Packages);

  Api.addRoute("packages", { authRequired: false }, {
    get: function () {
      return Packages.find().fetch();
    },
    post: {
      action: function () {
        if (Packages.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Package added"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to add package"
          }
        };
      }
    }
  });

  Api.addRoute("packages/:id", { authRequired: false }, {
    get: function () {
      return Packages.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: function () {
        if (Packages.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Package deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Package not found" }
        };
      }
    }
  });
}
