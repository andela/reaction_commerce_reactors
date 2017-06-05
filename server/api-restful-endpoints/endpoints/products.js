import { Products } from "../../../lib/collections/";

export function products(Api) {
  Api.addCollection(Products);

  Api.addRoute("products", { authRequired: false }, {
    get: () => {
      return Products.find().fetch();
    },
    post: {
      action: () => {
        if (Products.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Product added"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to add product"
          }
        };
      }
    }
  });

  Api.addRoute("products/:id", { authRequired: false }, {
    get: () => {
      return Products.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: () => {
        if (Products.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Product deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Product not found" }
        };
      }
    }
  });
}
