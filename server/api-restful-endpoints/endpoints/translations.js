import { Translations } from "../../../lib/collections/";

export function translations(Api) {
  Api.addCollection(Translations);

  Api.addRoute("translations", { authRequired: false }, {
    get() {
      return Translations.find().fetch();
    },
    post: {
      action() {
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
    get() {
      return Translations.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action() {
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
