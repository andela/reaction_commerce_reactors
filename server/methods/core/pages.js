import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Pages } from "/lib/collections";
import { Logger } from "/server/api";

Pages.allow({});

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

    Pages.remove(pageId);
    Pages.rawCollection().insert({
      pageTitle: title,
      pageName: name,
      pageContent: content,
      isVisible: true
    });

    Logger.info("Page updated");
  },
  "pages/createPage": function (name, title, content) {
    check(title, String);
    check(name, String);
    check(content, String);

    this.unblock();

    if (Pages.findOne({pageName: name})) {
      Logger.info("Page already exists");
      return false;
    } else {
      Pages.rawCollection().insert({
        pageTitle: title,
        pageName: name,
        pageContent: content,
        isVisible: true
      });
      Logger.info("Page created");
      return true;
    }
  },
  "pages/deletePage": function (name) {
    check(name, String);

    const pageId = Pages.findOne({pageName: name})._id;
    Pages.remove(pageId);
  },
  "pages/getPages": function () {
    return Pages.find().fetch();
  }

});
