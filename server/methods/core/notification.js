import { Meteor } from "meteor/meteor";
import { Notifications } from "/lib/collections";

Meteor.methods({
  "createNotification": function (order) {
    check(order, Object);
    let notifyUser = true;
    this.unblock();

    if (Meteor.user().roles[0].includes("admin")) {
      notifyUser = false;
    }

    Notifications.insert({
      userId: order.userId,
      orderId: order._id,
      action: order.status,
      orderUrl: order.orderUrl,
      read: false,
      notifyUser
    });

    // console.log("Here are the Notifications", Notifications.find().fetch());
  }
});
