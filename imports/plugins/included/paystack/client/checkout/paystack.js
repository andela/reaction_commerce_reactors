/* eslint camelcase: 0 */
import {Meteor} from "meteor/meteor";
import {Random} from "meteor/random";
import {Template} from "meteor/templating";
import {Cart, Shops, Accounts} from "/lib/collections";
import {PaystackPayment} from "../../lib/collections/schemas";
import {HTTP} from "meteor/http";

import "./paystack.html";

function paymentAlert(errorMessage) {
  return $(".alert").removeClass("hidden").text(errorMessage);
}

function hidePaymentAlert() {
  return $(".alert").addClass("hidden").text("");
}

function handlePaystackSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    paymentAlert("Oops! " + serverError);
  } else if (error) {
    paymentAlert("Oops! " + error, null, 4);
  }
}

Template.paystackPaymentForm.onCreated(function () {
  Meteor.call("settings/getPaystack", (error, data) => {
    Window.KEYS = data;
  });
});

Template.paystackPaymentForm.helpers({
  PaystackPayment() {
    return PaystackPayment;
  },
  getTransactionId() {
    return Random.id();
  },
  getEmailAddress() {
    const userId = Meteor.userId();
    const account = Accounts.findOne({
      userId: userId
    });
    if (account.emails.length === 0) {
      return "";
    }
    return account.emails[0].address;
  },
  getPhoneNumber() {
    const userId = Meteor.userId();
    const account = Accounts.findOne({
      userId: userId
    });
    if (account.profile.addressBook.length === 0) {
      return "";
    }
    return account.profile.addressBook[0].phone;
  },
  getAmount() {
    const cart = Cart.findOne();
    const shop = Shops.find({_id: cart.shopId}).fetch();
    const costInLocalCurrency = Cart.findOne().cartTotal();
    const currency = Shops.findOne().currency;
    const exchangeRateToTheDollar = shop[0].currencies[currency];
    const costInDollars = costInLocalCurrency / exchangeRateToTheDollar.rate;
    const nairaExchangeRateToTheDollar = shop[0].currencies.NGN.rate;
    return Math.ceil(costInDollars * nairaExchangeRateToTheDollar * 100);
  },
  paymentSuccessful(transactionDetails) {
    const transactionRef = transactionDetails.reference;
    const secretKey = Window.KEYS[0].apiSecretKey;
    //
    HTTP.call("GET", `https://api.paystack.co/transaction/verify/${transactionRef}`, {headers: {Authorization: `Bearer ${secretKey}`}}, function (error, response) {
      if (error) {
        handlePaystackSubmitError(error);
        uiEnd(template, "Resubmit payment");
      } else {
        const res = response.data.data;
        const data = {
          payerName: res.customer.first_name + " " + res.customer.last_name,
          payerEmail: res.customer.email,
          payerNumber: res.metadata.custom_fields[0].value,
          cardNumber: res.authorization.last4,
          expireMonth: res.authorization.exp_month,
          expireYear: res.authorization.exp_year,
          transactionReference: res.reference
        };

        if (res.status) {
          const paymentMethod = {
            processor: "Paystack",
            storedCard: data.cardNumber,
            method: "Paystack Payment",
            transactionId: data.transactionReference,
            currency: "NGN",
            amount: res.amount,
            status: res.status,
            mode: "authorize",
            createdAt: new Date(),
            transactions: []
          };
          paymentMethod.transactions.push({
            currency: "NGN",
            transactionId: data.transactionReference,
            amount: paymentMethod.amount
          });
          Meteor.call("cart/submitPayment", paymentMethod);
        }
      }
    });
  },
  windowClosed() {
    paymentAlert("The payment wasn't completed.");
  }
});

AutoForm.addHooks("paystack-payment-form", {
  onSubmit: function (doc) {
    //
  },
  beginSubmit: function () {
    this.template.$(":input").attr("disabled", true);
    this.template.$("#btn-complete-order").text("Submitting ");
    return this.template.$("#btn-processing").removeClass("hidden");
  },
  endSubmit: function () {
    if (!submitting) {
      return uiEnd(this.template, "Complete your order");
    }
  }
});
