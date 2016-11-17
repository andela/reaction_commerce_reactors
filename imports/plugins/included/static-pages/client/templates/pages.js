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
    const page = this
    Template.instance().state.set("page", page);
    setTimeout(() => {
      console.log(page)
      CKEDITOR.instances.pageContent.setData(page.pageContent);
    }, 500);
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

Template.pageContent.helpers({
  showPage() {
    return (Template.instance().data.pageName);
  }
});
