import { composeWithTracker, composeAll } from "react-komposer";
import { useDeps } from "react-simple-di";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import { Loading } from "/imports/plugins/core/ui/client/components";
import actions from "../actions";
import SMSSettings from "../components/sms_settings";

const providers = ["Nexmo", "Esendex", "Sinch"];

const composer = ({}, onData) => {
  if (Meteor.subscribe("Packages").ready()) {
    const settings = Reaction.getShopSettings().sms || {};

    onData(null, { providers, settings });
  }
};

const depsMapper = () => ({
  saveSettings: actions.settings.saveSettings
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(SMSSettings);
