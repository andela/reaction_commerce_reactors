import { RequestShop } from "/lib/collections";

Meteor.publish("shopRequest", function () {
  return RequestShop.find({
    status: "new"
  });
});
