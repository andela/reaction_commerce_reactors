import { Shops } from "../../../lib/collections/";

export function shops(Api) {
  Api.addCollection(Shops);

  Api.addRoute("shops", { authRequired: false }, {
    get: function () {
      return Shops.find().fetch();
    }
    // post: function () {
    //   Products.insert(this.request.body, (err, id) => {
    //     if (err) console.log(err);
    //     return id;
    //   });
    // }
  });
}
