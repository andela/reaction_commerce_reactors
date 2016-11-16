/* eslint camelcase: 0 */
import {Meteor} from "meteor/meteor";
import {Random} from "meteor/random";
import {Template} from "meteor/templating";
import {Reaction} from "/client/api";
import {Cart, Shops, Accounts} from "/lib/collections";
import {Paystack} from "../../lib/api";
import {PaystackPayment} from "../../lib/collections/schemas";
<<<<<<< 90ce53d0ddbad99fd6c3f2848100d413d28e2307
import {HTTP} from "meteor/http";
=======
>>>>>>> feature(paystack-option): adds paystack popup when pay with paystack is clicked

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


Template.paystackPaymentForm.helpers({
  PaystackPayment() {
    return PaystackPayment;
  },
  getTransactionId() {
    return Random.id();
<<<<<<< 90ce53d0ddbad99fd6c3f2848100d413d28e2307
  },
  getPublicKey() {
    return Paystack.accountOptions().apiPublicKey;
    // return "pk_test_867ed4f0ca26373dc638cc61c2ebbd6b340e4ae3";
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
    const secretKey = Paystack.accountOptions().apiSecretKey;
    // const secretKey = "sk_test_fb0ebf87ce4491621dbcee625c09143254749051";
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
=======
>>>>>>> feature(paystack-option): adds paystack popup when pay with paystack is clicked
  }
});

AutoForm.addHooks("paystack-payment-form", {
  onSubmit: function (doc) {
<<<<<<< 90ce53d0ddbad99fd6c3f2848100d413d28e2307
    //
=======
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
>>>>>>> feature(paystack-option): adds paystack popup when pay with paystack is clicked
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
