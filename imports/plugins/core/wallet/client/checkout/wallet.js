/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Cart} from "/lib/collections";
import { Wallet } from "/lib/collections";

import "./wallet.html";

Template.walletCheckout.onCreated(function () {
  this.subscribe("Wallet");
});

function canAfford(walletBalance, cartTotal) {
  return walletBalance >= cartTotal;
}

function handlePaystackSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    paymentAlert("Oops! " + serverError);
  } else if (error) {
    paymentAlert("Oops! " + error, null, 4);
  }
}

Template.walletCheckout.helpers({
  wallet: () => {
    const userWallet = Wallet.findOne({userId: Meteor.userId()});
    return userWallet;
  },

  isEmpty: (amount) => {
    if (amount === 0) {
      return true;
    }
    return false;
  },

  getPublicKey: () => {
    // return Paystack.accountOptions().apiPublicKey;
    return "pk_test_5bc8b75198effa35216aed4bde2fa22369032618";
  },

  getTransactionId: () => {
    return Random.id();
  },

  paymentSuccessful: (transactionDetails) => {
    document.getElementById("fundWallet").style.display = "none";
    const transactionRef = transactionDetails.reference;
    // const secretKey = Paystack.accountOptions().apiSecretKey;
    const secretKey = "sk_test_0ca30dadae80323e7d8a95b94c229d563c467f2e";

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
          Meteor.call("wallet/fundWallet", paymentMethod);
        }
      }
    });
  },

  windowClosed: () => {
    Alerts.toast("Cancelled. Wallet not funded. ", {
      html: true,
      timeout: 10000
    });  }
});

Template.walletCheckout.events({
  "click #top-up-wallet": function () {
    const display = document.getElementById("fundWallet").style.display;
    console.log(display);
    if (display === "block") {
      document.getElementById("fundWallet").style.display = "none";
      return;
    }
    document.getElementById("fundWallet").style.display = "block";
  },

  "click #btn-wallet-pay": function () {
    const cartTotal = parseFloat(Cart.findOne().cartTotal());
    const userWallet = Wallet.findOne({userId: Meteor.userId()});
    const cartId = Cart.findOne()._id;

    if (canAfford(userWallet.amount, cartTotal)) {
      const newAmount = userWallet.amount - cartTotal;
      const transaction = {
        _id: cartId,
        amount: cartTotal,
        date: new Date(),
        transactiontype: cartTotal + "debit for transaction, cartId: " + cartId
      };

      Meteor.call("wallet/updateOnPayment", newAmount, transaction);

      const paymentMethod = {
        processor: "Wallet",
        method: "Wallet",
        transactionId: cartId,
        amount: cartTotal,
        status: "Success",
        mode: "void",
        createdAt: new Date(),
        updatedAt: new Date(),
        transactions: [transaction]
      };

      Meteor.call("cart/submitPayment", paymentMethod);
    } else {
      Alerts.toast("Insufficient funds. Top up wallet first. ", {
        html: true,
        timeout: 10000
      });
    }
  }
});
