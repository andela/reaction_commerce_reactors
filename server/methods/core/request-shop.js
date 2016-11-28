import { Meteor } from "meteor/meteor";
import { Shops, RequestShop } from "/lib/collections";
import { check } from "meteor/check";

Meteor.methods({
  "shop/apply"(requestData) {
    check(requestData, {
      shopName: String,
      shopFullname: Match.Optional(String),
      shopDescription: String,
      shopAddress: String,
      shopEmail: String,
      userId: String
    });
    requestData.status = "new";
    try {
      RequestShop.insert(requestData);
      return true;
    } catch (err) {
      return false;
    }
  },

  "shop/approve"(requestId) {
    check(requestId, String);
    const requestData = RequestShop.find({ _id: requestId }).fetch()[0];
    const shopData = {};
    const newShopAdmin = requestData.userId;

    shopData.name = requestData.shopName;
    shopData.emails = requestData.shopEmail;
    shopData.description = requestData.shopDescription;
    shopData.addressBook = requestData.shopAddress;

    try {
      console.log("shopData is", shopData);
      Meteor.call("shop/createShop", newShopAdmin, shopData);
      RequestShop.update(requestId, {
        $set: { status: "approved" }
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  "shop/reject"(requestId) {
    check(requestId, String);
    // const requestData = RequestShop.find({ _id: requestId }).fetch();

    try {
      // RequestShop.remove({ _id: requestId });
      RequestShop.update(requestId, {
        $set: { status: "rejected" }
      });
      return true;
    } catch (err) {
      return false;
    }
  },

  "shop/getRequests"() {
    return RequestShop.find({ status: "new" }).fetch();
  }
});
