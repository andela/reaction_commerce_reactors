import { LoginFormSharedHelpers } from "/client/modules/accounts/helpers";
import { Template } from "meteor/templating";

/**
 * onCreated: Login form sign up view
 */
Template.loginFormSignUpView.onCreated(() => {
  const template = Template.instance();

  template.uniqueId = Random.id();
  template.formMessages = new ReactiveVar({});
  template.type = "signUp";
});
/**
 * Helpers: Login form sign up view
 */
Template.loginFormSignUpView.helpers(LoginFormSharedHelpers);

/**
 * Events: Login form sign up view
 */
Template.loginFormSignUpView.events({
  /**
   * Submit sign up form
   * @param  {Event} event - jQuery Event
   * @param  {Template} template - Blaze Template
   * @return {void}
   */

  "submit form": function (event, template) {
    event.preventDefault();

    // var usernameInput = template.$(".login-input--username");
    const emailInput = template.$(".login-input-email");
    const passwordInput = template.$(".login-input-password");
    const registerRole = template.$(".register-role");

    const email = emailInput.val().trim();
    const password = passwordInput.val().trim();
    const role = registerRole.val();

    const validatedEmail = LoginFormValidation.email(email);
    const validatedPassword = LoginFormValidation.password(password);

    const templateInstance = Template.instance();
    const errors = {};

    templateInstance.formMessages.set({});

    if (validatedEmail !== true) {
      errors.email = validatedEmail;
    }

    if (validatedPassword !== true) {
      errors.password = validatedPassword;
    }

    if ($.isEmptyObject(errors) === false) {
      templateInstance.formMessages.set({
        errors: errors
      });
      // prevent signup
      return;
    }

    const newUserData = {
      // username: username,
      email: email,
      password: password
    };

    Accounts.createUser(newUserData, function (error) {
      if (error) {
        // Show some error message
        templateInstance.formMessages.set({
          alerts: [error]
        });
      }
    });

    const userRoles = {
      email: email,
      userRole: role
    };

    Meteor.call("accounts/roleOption", userRoles, (err, res) => {
      if (err) {
        return err;
      }
      if (userRoles.userRole === "Vendor") {
        const userId = Meteor.users.findOne({ "emails.address": userRoles.email })._id;
        // creates a new shop when a vendor user signs up
        Meteor.call("shop/newVendorShop", userId, (error, response) => {
          if (error) {
            alert(error);
          }
          const shopId = response;
          const updateRole = {
            shopId: shopId,
            userId: userId
          };
          Meteor.call("accounts/updateRoles", updateRole, (error2, res2) => {
          });
        });
      }
    });
  }
});
