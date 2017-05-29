import { Templates } from "../../../lib/collections/";

export function templates(Api) {
  Api.addCollection(Templates);

  Api.addRoute("templates", { authRequired: false }, {
    get: function () {
      return Templates.find().fetch();
    },
    post: {
      action: function () {
        if (Templates.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Template added"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to add Template"
          }
        };
      }
    }
  });

  Api.addRoute("templates/:id", { authRequired: false }, {
    get: function () {
      return Templates.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: function () {
        if (Templates.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Template deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Template not found" }
        };
      }
    }
  });
}
