import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Notifications, Accounts } from "/lib/collections";

Meteor.methods({
  "createNotification": function (title, message, userId, url, notifyUser) {
    check(title, String);
    check(message, String);
    check(userId, String);
    check(url, String);
    check(notifyUser, Boolean);
    this.unblock();

    Notifications.insert({
      userId,
      title,
      message,
      url,
      time: Date.now(),
      read: false,
      notifyUser
    });

    // console.log("Here are the Notifications", Notifications.find().fetch());
  },

  "markAsRead": function (notifyId) {
    check(notifyId, String);
    Notifications.update({_id: notifyId}, {
      $set: { read: true }
    });
  },

  "deleteNotification": function (notifyId) {
    check(notifyId, String);
    Notifications.remove({_id:notifyId});
  }
});
