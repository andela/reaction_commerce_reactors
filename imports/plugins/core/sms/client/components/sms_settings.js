import React, { Component, PropTypes } from "react";
import { Panel, Button } from "react-bootstrap";
import { FieldGroup } from "/imports/plugins/core/ui/client/components";

class SMSSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.settings,
      isSaving: false
    };

    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStateChange(e) {
    const { settings } = this.state;
    settings[e.target.name] = e.target.value;
    this.setState({ settings });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { saveSettings } = this.props;
    const { settings } = this.state;
    this.setState({ isSaving: true });
    saveSettings(settings);
    this.setState({ isSaving: false });
  }

  render() {
    const { providers } = this.props;
    const { settings, isSaving } = this.state;

    return (
      <Panel header={<h3 data-i18n="sms.headers.settings">SMS Provider</h3>}>
        <form onSubmit={this.handleSubmit}>
          <FieldGroup
            label="Service"
            componentClass="select"
            name="service"
            value={settings.service}
            onChange={this.handleStateChange}>
            <option value="" data-i18n="sms.settings.selectService">Select a Service...</option>
            {providers.map((name, i) => (
              <option key={i} value={name}>{name}</option>
            ))}
          </FieldGroup>
          {settings.service === "Nexmo" &&
            <div>
            <hr />
              <FieldGroup
                label="Api key"
                i18n="sms.settings.apiKey"
                type="text"
                name="apiKey"
                value={settings.apiKey}
                onChange={this.handleStateChange} />
              <FieldGroup
                label="Api Secret"
                i18n="sms.settings.apiSecret"
                type="password"
                name="apiSecret"
                value={settings.apiSecret}
                onChange={this.handleStateChange} />
            </div>}
          {settings.service !== "" &&
            <Button bsStyle="primary" className="pull-right" type="submit" disabled={isSaving}>
              {isSaving ?
                <i className="fa fa-refresh fa-spin" />
                : <span data-i18n="app.save">Save</span>}
            </Button>
          }
        </form>
      </Panel>
    );
  }
}

SMSSettings.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    service: PropTypes.string,
    apiKey: PropTypes.string,
    apiSecret: PropTypes.string
  })
};

export default SMSSettings;
