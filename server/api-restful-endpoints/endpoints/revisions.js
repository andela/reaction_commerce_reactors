import { Revisions } from "../../../lib/collections/";

export function revisions(Api) {
  Api.addCollection(Revisions);

  Api.addRoute("revisions", { authRequired: false }, {
    get: function () {
      return Revisions.find().fetch();
    },
    post: {
      action: function () {
        if (Revisions.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Revisions added"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to add revision"
          }
        };
      }
    }
  });

  Api.addRoute("revisions/:id", { authRequired: false }, {
    get: function () {
      return Revisions.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: function () {
        if (Revisions.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Revision deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Revision not found" }
        };
      }
    }
  });
}
