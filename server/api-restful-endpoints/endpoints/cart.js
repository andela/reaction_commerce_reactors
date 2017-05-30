import { Cart } from "../../../lib/collections/";

export function cart(Api) {
  Api.addCollection(Cart);

  Api.addRoute("cart", { authRequired: false }, {
    get: () => {
      return Cart.find().fetch();
    },
    post: {
      action: () => {
        if (Cart.insert(this.request.body)) {
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

  Api.addRoute("cart/:id", { authRequired: false }, {
    get: () => {
      return Cart.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: () => {
        if (Cart.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Cart items deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "No items in cart" }
        };
      }
    }
  });
}
