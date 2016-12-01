import React, { Component, PropTypes } from "react";
import { Col, Panel, Table, Button } from "react-bootstrap";
import moment from "moment";

class SMSLogs extends Component {

  renderNoSMSs() {
    return (
      <div>
        <h4 className="text-center" data-i18n="sms.logs.noSMSs">No SMS sent yet</h4>
      </div>
    );
  }

  renderSMSs() {
    return (
      <div>
        <div className="table-controls">
          <div className="table-filter">
            <h5 data-i18n="sms.logs.limit">Quantity</h5>
            <input
              defaultValue={this.props.limit || 10}
              onChange={this.props.updateLimit}
              type="number"/>
          </div>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th data-i18n="sms.logs.headers.sms">SMS</th>
              <th data-i18n="sms.logs.headers.subject">Subject</th>
              <th data-i18n="sms.logs.headers.sent">Sent</th>
              <th data-i18n="sms.logs.headers.status">Status</th>
              <th data-i18n="sms.logs.headers.actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.smss.map((sms) => (
              <tr key={sms._id}>
                <td>{sms.data.to}</td>
                <td>{sms.data.subject}</td>
                <td>{moment(sms.updated).format("LLL")}</td>
                <td>{sms.status}</td>
                <td>
                  {sms.status === "failed" || sms.status === "waiting" ?
                    <Button
                      onClick={this.props.resend.bind(this, sms)}
                      data-i18n="sms.logs.retry">
                      Retry
                    </Button>
                    : <span data-i18n="sms.logs.noneAvailble">None available</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    return (
      <Col md={8} sm={12}>
        <Panel>
          <h3 className="text-center" data-i18n="sms.logs.headers.smsLogs">SMS Logs</h3>
          <hr/>
          {this.props.smss.length === 0 ?
              this.renderNoSMSs()
            : this.renderSMSs()}
        </Panel>
      </Col>
    );
  }
}

SMSLogs.propTypes = {
  limit: PropTypes.string,
  resend: PropTypes.func.isRequired,
  smss: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    data: PropTypes.shape({
      to: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired
    }),
    status: PropTypes.string.isRequired
  })),
  updateLimit: PropTypes.func.isRequired
};

export default SMSLogs;
