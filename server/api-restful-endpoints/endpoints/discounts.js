import { Discounts } from "../../../lib/collections/";

export function discounts(Api) {
  Api.addCollection(Discounts);

  Api.addRoute("discounts", { authRequired: false }, {
    get: () => {
      return Discounts.find().fetch();
    },
    post: {
      action() {
        if (Discounts.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Item successfully added to cart"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to add item to cart"
          }
        };
      }
    }
  });

  Api.addRoute("discounts/:id", { authRequired: false }, {
    get() {
      return Discounts.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action() {
        if (Discounts.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Discounts items deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "No items in cart" }
        };
      }
    }
  });
}
