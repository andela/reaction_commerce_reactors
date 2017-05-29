import { Translations } from "../../../lib/collections/";

export function translations(Api) {
  Api.addCollection(Translations);

  Api.addRoute("translations", { authRequired: false }, {
    get: function () {
      return Translations.find().fetch();
    },
    post: {
      action: function () {
        if (Translations.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Transation added"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to add Translation"
          }
        };
      }
    }
  });

  Api.addRoute("translations/:id", { authRequired: false }, {
    get: function () {
      return Translations.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: function () {
        if (Translations.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Translation deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Translation not found" }
        };
      }
    }
  });
}
