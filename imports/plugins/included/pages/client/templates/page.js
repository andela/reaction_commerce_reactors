import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Pages } from "/lib/collections";

Template.page.onCreated(function () {
  this.subscribe("Pages");
  this.state = new ReactiveDict();
  this.state.setDefault({
    page: {}
  });

  // Watch for updates to the subscription and query params
  // fetch available pages
  this.autorun(() => {
    const title = Reaction.Router.getParam("handle");
    const page = Pages.findOne({pageName: title}) || {};
    this.state.set("page", page);
  });
});

Template.page.events({

});

Template.page.helpers({
  isValidPage() {
    const page = Template.instance().state.get("page");
    return !(_.isEmpty(page));
  },
  pageDetails() {
    return Template.instance().state.get("page");
  }
});
