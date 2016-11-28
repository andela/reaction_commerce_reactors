/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { i18next } from "/client/api";
import { RequestShop } from "/lib/collections";
import "./vendor.html";


Template.adminVendorTemplate.onCreated(function () {
  this.state = new ReactiveDict();
  this.state.setDefault({
    shopRequests: []
  });

  this.autorun(() => {
    this.subscribe("shopRequest");
    const requests = RequestShop.find().fetch();
    this.state.set("shopRequests", requests);
  });
});


Template.adminVendorTemplate.helpers({
  getShopRequest() {
    const instance = Template.instance();
    return instance.state.get("shopRequests");
  }
});

Template.vendorApplication.events({
  "submit .submitRequest": function (event) {
    event.preventDefault();
    const requestData = {};
    requestData.shopName = document.getElementById("shopname").value;
    requestData.shopEmail = document.getElementById("shopemail").value;
    requestData.shopAddress = document.getElementById("shopaddress").value;
    requestData.shopDescription = document.getElementById("shopdescription").value;
    requestData.userId = Meteor.userId();
    try {
      Meteor.call("shop/apply", requestData);
      Alerts.toast(i18next.t("Your request was sent successfully"), "success");
    } catch (error) {
      Alerts.toast(i18next.t(`Your was not sent. Try again. ${error.message}`), "error");
    }
  }
});

Template.adminVendorTemplate.events({
  "click .accept": function () {
    // const succeed = Meteor.call("shop/approve", this._id);
    Meteor.call("shop/approve", this._id, (err, result) => {
      if (result) {
        Alerts.toast(i18next.t("Shop created"), "success");
      } else {
        Alerts.toast(i18next.t("Shop not created"), "error");
      }
    });
  },

  "click .reject": function () {
    // const succeed = Meteor.call("shop/reject", this._id);
    // console.log("value of succeed:", succeed);
    Meteor.call("shop/reject", this._id, (err, result) => {
      if (result) {
        Alerts.toast(i18next.t("Request rejected"), "success");
      } else {
        Alerts.toast(i18next.t("Request not rejected"), "error");
      }
    });
  }
});
