import { Tags } from "../../../lib/collections/";

export function tags(Api) {
  Api.addCollection(Tags);

  Api.addRoute("tags", { authRequired: false }, {
    get: function () {
      return Tags.find().fetch();
    },
    post: {
      action: function () {
        if (Tags.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Tag added"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to add Tag"
          }
        };
      }
    }
  });

  Api.addRoute("tags/:id", { authRequired: false }, {
    get: function () {
      return Tags.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: function () {
        if (Tags.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Tag deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Tag not found" }
        };
      }
    }
  });
}
