import { composeWithTracker, composeAll } from "react-komposer";
import { useDeps } from "react-simple-di";
import { Meteor } from "meteor/meteor";
import actions from "../actions";
import SMSLogs from "../components/sms_logs";
import { Loading } from "/imports/plugins/core/ui/client/components";
import { Router } from "/client/api";
import { Jobs } from "/lib/collections";

const composer = ({}, onData) => {
  const limit = Router.getQueryParam("limit");

  if (Meteor.subscribe("SMSJobs", Number(limit)).ready()) {
    const smss = Jobs.find({ type: "sendSMS" }, {
      sort: {
        updated: -1
      }
    }).fetch();
    onData(null, { smss, limit });
  }
};

const depsMapper = () => ({
  resend: actions.logs.resend,
  updateLimit: actions.logs.updateLimit
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(SMSLogs);
