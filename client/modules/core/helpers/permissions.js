import { Reaction } from "../";
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

/*
 * Methods for the reaction permissions
 * helpers for roles, uses alanning:meteor-roles
 * see: http://alanning.github.io/meteor-roles/classes/Roles.html
 * use: {{hasPermission admin userId}}
 */

/**
 * hasPermission template helper
 * @summary check current user hasPermission
 * @param  {String|Array} "permissions"
 * @param  {String} checkUserId - optional Meteor.userId, default to current
 * @return {Boolean}
 */
Template.registerHelper("hasPermission", function (permissions, options) {
  // default to checking this.userId
  let userId = Meteor.userId();
  const shopId = Reaction.getShopId();
  // we don't necessarily need to check here
  // as these same checks and defaults are
  // also performed in Reaction.hasPermission
  if (typeof options === "object") {
    if (options.hash.userId) {
      userId = options.hash.userId;
      return Reaction.hasPermission(permissions, userId, shopId);
    }
  }
  return Reaction.hasPermission(permissions, userId, shopId);
});

/**
 * hasOwnerAccess template helper
 * @summary check if user has owner access
 * @return {Boolean} return true if owner
 */
Template.registerHelper("hasOwnerAccess", function () {
  return Reaction.hasOwnerAccess();
});

/**
 * hasAdminAccess template helper
 * @summary check if user has admin access
 * @return {Boolean} return true if admin
 */
Template.registerHelper("hasAdminAccess", function () {
  return Reaction.hasAdminAccess();
});

/**
 * hasDashboardAccess template helper
 * @summary check if user has dashboard access
 * @return {Boolean} return true if user has dashboard permission
 */
Template.registerHelper("hasDashboardAccess", function () {
  return Reaction.hasDashboardAccess();
});

/**
 * hasTakenTour template helper
 * @summary check if user has taken tour
 * @return {Boolean} return true if user has taken tour
 */
Template.registerHelper("hasTakenTour", function () {
  return Reaction.hasTakenTour();
});

/**
 * setHasTakenTour template helper
 * @summary change user taken tour state
 * @return {Null} return undefined
 */
Template.registerHelper("setHasTakenTour", function () {
  return Reaction.setHasTakenTour();
});

/**
 * allowGuestCheckout template helper
 * @summary check if guest users are allowed to checkout
 * @return {Boolean} return true if shop has guest checkout enabled
 */
Template.registerHelper("allowGuestCheckout", function () {
  return Reaction.allowGuestCheckout();
});
