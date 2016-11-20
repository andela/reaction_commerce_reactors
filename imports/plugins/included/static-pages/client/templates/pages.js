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
    const page = this;
    Template.instance().state.set("page", page);
    setTimeout(() => {
      CKEDITOR.instances.pageContent.setData(page.pageContent);
    }, 500);
  },
  "click [data-event-action=viewPage]": function (event) {
    event.preventDefault();
    const path = `/reaction/page/${this.pageName}`;
    Reaction.Router.go(path);
  },
  "click [data-event-action=deletePage]": function (event) {
    event.preventDefault();
    Meteor.call("pages/deletePage", this.pageName);
  },
  "submit form#pageForm": function (event) {
    event.preventDefault();

    const pageTitle = document.querySelector("#pageTitle").value;
    const pageName = this.pageName;
    const pageContent = document.querySelector("#pageContent").value;

    Meteor.call("pages/savePage", pageName, pageTitle, pageContent);
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
