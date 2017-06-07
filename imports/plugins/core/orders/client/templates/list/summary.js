import { Template } from "meteor/templating";
import { NumericInput } from "/imports/plugins/core/ui/client/components";

/**
 * ordersListSummary helpers
 *
 * @returns paymentInvoice
 */
Template.ordersListSummary.helpers({
  invoice() {
    return this.invoice;
  },

  numericInputProps(value) {
    const { currencyFormat } = Template.instance().data;

    return {
      component: NumericInput,
      value,
      format: currencyFormat,
      isEditing: false
    };
  },
  displayCancelButton() {
    return !(this.order.workflow.status === "canceled"
     || this.order.workflow.status === "coreOrderWorkflow/canceled");
  },
  orderStatus() {
    return this.order.workflow.status === "canceled";
  }
});
Template.ordersListSummary.events({
  /** @param {Event} event
   * @param {Template} instance
   * @return {void}
   *
  */
  "click button[name=cancel]"(event, instance) {
    event.stopPropagation();
    const state = instance.state; const order = state.get("order");
    swal({
      title: "Are you sure?",
      text: "You want to cancel the order placed!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: ".btn-danger",
      confirmButtonText: "Yes!"
    })
      .then(() => {
        Meteor.call("orders/cancelOrder", order, (error) => {
          if (error) {
            swal("Order cancellation unsuccesful.", "success");
          }
        });
      });
  }
});
