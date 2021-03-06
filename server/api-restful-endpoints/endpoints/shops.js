import { Shops } from "../../../lib/collections/";

export function shops(Api) {
  Api.addCollection(Shops);

  Api.addRoute("shops", { authRequired: false }, {
    get() {
      return Shops.find().fetch();
    }
  });
  Api.addRoute("shops/:id", { authRequired: false }, {
    get() {
      return Shops.findOne(this.urlParams.id);
    },
    delete: {
      action() {
        if (Shops.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Shop removed" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Shop not found" }
        };
      }
    }
  });
}

