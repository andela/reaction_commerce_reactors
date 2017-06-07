import { Inventory } from "../../../lib/collections/";

export function inventory(Api) {
  Api.addCollection(Inventory);

  Api.addRoute("inventory", { authRequired: false }, {
    get() {
      return Inventory.find().fetch();
    },
    post: {
      roleRequired: ["author", "admin"],
      action() {
        if (inventory.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Inventory updated"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to update inventory"
          }
        };
      }
    }
  });

  Api.addRoute("inventory/:id", { authRequired: false }, {
    get() {
      return inventory.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action() {
        if (Inventory.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Inventory item deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "inventory item not found" }
        };
      }
    }
  });
}
