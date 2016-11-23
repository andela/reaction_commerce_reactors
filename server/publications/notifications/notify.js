import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import {Notifications} from "/lib/collections/"

Meteor.publish("notificationList", (uid) => {
  check(uid, Match.Any);

  let currentUser = Meteor.users.findOne(uid);
  let currentUserRoleKey = Object.keys(currentUser.roles);
  let isAdmin = currentUser.roles[currentUserRoleKey[0]].includes('admin');

  console.log('Current user', currentUser);
  console.log('Current user role', currentUser.roles[currentUserRoleKey]);
  //console.log('Meteor.user', Meteor.user());
  console.log('is current user admin?', isAdmin);

  if(!uid){
    return this.ready();
  }

  if(isAdmin) {
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
