import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Pages } from "/lib/collections";
import { Logger } from "/server/api";

Meteor.methods({
  /**
   * pages/savePage
   * @summary wraps addTracking and triggers workflow update
   * @param {String} name - page name to save in the database
   * @param {String} title - page title to save in the database
   * @param {String} content - page content to save in the database
   * @return {null} no return value
   */
  "pages/savePage": function (name, title, content) {
    check(title, String);
    check(name, String);
    check(content, String);

    this.unblock();

    const pageId = Pages.findOne({pageName: name})._id;

    Pages.update(pageId, {
      $set: {
        pageTitle: title,
        pageName: name,
        pageContent: content,
        isVisible: true
      }
    });

    Logger.info("Page updated");
  },
  "pages/deletePage": function (name) {
    check(name, String);

    const pageId = Pages.findOne({pageName: name})._id;
    Pages.remove(pageId);
  }

});
