import { Accounts } from "../../../lib/collections/";

export function accounts(Api) {
  Api.addCollection(Accounts);

  Api.addRoute("accounts", { authRequired: false }, {
    get: function () {
      return Accounts.find().fetch();
    },
    post: {
      action: function () {
        if (Accounts.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Account created"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Failed to create account"
          }
        };
      }
    }
  });

  Api.addRoute("accounts/:id", { authRequired: false }, {
    get: function () {
      return Accounts.findOne(this.urlParams.id);
    },
    delete: {
      action: function () {
        if (Accounts.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Account deleted" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Account not found" }
        };
      }
    }
  });
}
