import React, { Component } from "react";
import { Router } from "/client/api";

class SMSDashboardTabs extends Component {
  render() {
    return (
      <div>
        <a href={Router.pathFor("SMS Status")} data-i18n="sms.headers.status">Status</a>
      </div>
    );
  }
}

export default SMSDashboardTabs;
