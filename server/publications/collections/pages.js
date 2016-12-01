import { Pages } from "/lib/collections";
import { Reaction } from "/server/api";

/**
 * pages
 */

Meteor.publish("Pages", function () {
  if (this.userId === null) {
    return this.ready();
  }
  return Pages.find();
});
