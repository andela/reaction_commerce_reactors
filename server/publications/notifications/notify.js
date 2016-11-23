import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import {Notifications} from "/lib/collections/";

Meteor.publish("notificationList", (uid) => {
  check(uid, Match.Any);
  // console.log("logged in user", uid);
  if (!Meteor.users.findOne(uid)) {
    return;
  }
  const currentUser = Meteor.users.findOne(uid);
  const currentUserRoleKey = Object.keys(currentUser.roles);
  const isAdmin = currentUser.roles[currentUserRoleKey[0]].includes('admin');

  // if (!uid) {
  //   return this.ready();
  // }

  if (isAdmin) {
    return Notifications.find({
      notifyUser: false
    });
  } else {
    return Notifications.find({
      userId: uid,
      notifyUser: true
    });
  }

});
