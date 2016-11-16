/* eslint camelcase: 0 */
import {Meteor} from "meteor/meteor";
import {Random} from "meteor/random";
import {Template} from "meteor/templating";
import {Reaction} from "/client/api";
import {Cart, Shops} from "/lib/collections";
import {Paystack} from "../../lib/api";
import {PaystackPayment} from "../../lib/collections/schemas";

import "./paystack.html";

let submitting = false;

function uiEnd(template, buttonText) {
  template.$(":input").removeAttr("disabled");
  template.$("#btn-complete-order").text(buttonText);
  return template.$("#btn-processing").addClass("hidden");
}

function paymentAlert(errorMessage) {
  return $(".alert").removeClass("hidden").text(errorMessage);
}

function hidePaymentAlert() {
  return $(".alert").addClass("hidden").text("");
}

function handlePaystackSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error, null, 4);
  }
}


Template.paystackPaymentForm.helpers({
  PaystackPayment() {
    return PaystackPayment;
  },
  getTransactionId() {
    return Random.id();
  }
});

AutoForm.addHooks("paystack-payment-form", {
  onSubmit: function (doc) {
    submitting = true;
    const template = this.template;
    hidePaymentAlert();
    // const cart = Cart.findOne();
    // const shop = Shops.find({_id: cart.shopId}).fetch();
    // console.log(shop[0].currencies);
    // const exchangeRate =  shop[0].currencies.NGN.rate;
    // console.log(exchangeRate);
    // console.log(Paystack.accountOptions());
    console.log({
      total: Cart.findOne().cartTotal(),
      currency: Shops.findOne().currency
    });
    const transactionId = Random.id();
    const cost = Cart.findOne().cartTotal();
    const currency = Shops.findOne().currency;
    console.log(cost, currency);
    // const costInNaira = fx.convert(cost, {from: currency, to: "NGN"});
    // console.log(cost, costInNaira);
    //
    const handler = PaystackPop.setup({
      key: Paystack.accountOptions(),
      email: doc.payerEmail,
      amount: cost,
      ref: transactionId,
      metadata: {
        custom_fields: [
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: doc.payerNumber
          }
        ]
      },
      callback: function (response) {
        alert("success. transaction ref is " + response.reference);
        //
        // submitting = false;
        // const paymentMethod = {
        //   processor: "Paystack",
        //   storedCard: "",
        //   method: "Paystack Payment",
        //   transactionId: transactionId,
        //   currency: currency,
        //   amount: costInNaira,
        //   status: transaction.status,
        //   mode: "authorize",
        //   createdAt: new Date(),
        //   transactions: []
        // };
        // paymentMethod.transactions.push(transaction.response);
        // Meteor.call("cart/submitPayment", paymentMethod);
        // return false;
      },
      onClose: function () {
        alert("window closed");
        // //
        // submitting = false;
        // handlePaystackSubmitError(error);
        // uiEnd(template, "Resubmit payment");
        // return false;
      }
    });
    handler.openIframe();
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
