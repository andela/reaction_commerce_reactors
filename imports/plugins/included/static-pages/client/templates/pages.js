import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Pages } from "/lib/collections";

Template.pages.onCreated(function () {
  this.state = new ReactiveDict();
  this.state.setDefault({
    pages: [],
    page: {},
    edit: false,
    create: false
  });

  // Watch for updates to the subscription and query params
  // fetch available pages
  this.autorun(() => {
    this.subscribe("Pages");
    this.state.set("pages", Pages.find().fetch());
  });
});

Template.pages.events({
  "click [data-event-action=createPage]": function (event) {
    event.preventDefault();

    Template.instance().state.set("edit", false);
    Template.instance().state.set("create", true);
  },
  "click [data-event-action=editPage]": function (event) {
    event.preventDefault();

    Template.instance().state.set("edit", true);
    Template.instance().state.set("create", false);

    const page = this;
    Template.instance().state.set("page", this);
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
  "submit form#edit-page": function (event) {
    event.preventDefault();

    const pageTitle = document.querySelector("#pageTitle").value;
    const pageName = document.querySelector("#pageName").value;
    const pageContent = document.querySelector("#pageContent").value;

    Meteor.call("pages/savePage", pageName, pageTitle, pageContent);
  },
  "submit form#create-page": function (event) {
    event.preventDefault();

    const pageTitle = document.querySelector("#pageTitle").value;
    const pageName = document.querySelector("#pageName").value;
    const pageContent = document.querySelector("#pageContent").value;

    Meteor.call("pages/createPage", pageName, pageTitle, pageContent);
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
  },
  createPage() {
    return {};
  },
  showCreatePage() {
    return Template.instance().state.get("create");
  },
  showEditPage() {
    return Template.instance().state.get("edit");
  },
  pageEdit() {
    return "edit";
  },
  pageCreate() {
    return "create"
  }
});

Template.pageContent.helpers({

});
