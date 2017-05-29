import { Orders } from "../../../lib/collections/";

export function orders(Api) {
  Api.addCollection(Orders);

  Api.addRoute("orders", { authRequired: false }, {
    get: function () {
      return Orders.find().fetch();
    },
    post: {
      action: function () {
        if (Orders.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Order was made"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to make order"
          }
        };
      }
    }
  });

  Api.addRoute("orders/:id", { authRequired: false }, {
    get: function () {
      return Orders.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: function () {
        if (Orders.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "order was deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "order not found" }
        };
      }
    }
  });
}
