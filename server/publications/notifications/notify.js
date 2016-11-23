import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import {Notifications} from "/lib/collections/"

Meteor.publish("notificationList", (uid) => {
  check(uid, Match.Any);

  let currentUser = Meteor.users.findOne(uid);
  let isAdmin = currentUser.roles[Object.keys(currentUser.roles)[0]].includes('admin');

  if(!uid){
    return this.ready();
  }

  if(isAdmin) {
    return Notifications.find({
      nofifyUser: false
    });
  } else {
    return Notifications.find({
      userId: uid
    });
  }

});
