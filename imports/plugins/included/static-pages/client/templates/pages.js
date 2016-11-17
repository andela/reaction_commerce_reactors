import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Pages } from "/lib/collections";

Template.pages.onCreated(function () {
  this.state = new ReactiveDict();
  this.state.setDefault({
    pages: [],
    page: {}
  });

  // Watch for updates to the subscription and query params
  // fetch available pages
  this.autorun(() => {
    this.subscribe("Pages");
    this.state.set("pages", Pages.find().fetch());
  });
});

Template.pages.events({
  "click [data-event-action=editPage]": function (event) {
    event.preventDefault();
    CKEDITOR.instances.pageContent.setData(this.pageContent);
    Template.instance().state.set("page", this);
  }
});

/**
 * pages helpers
 */
Template.pages.helpers({
  displayPages() {
    return Template.instance().state.get("pages");
  },
  editPage() {
    return Template.instance().state.get("page");
  }
});
