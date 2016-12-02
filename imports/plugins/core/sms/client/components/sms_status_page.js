import React from "react";
import { Grid, Row } from "react-bootstrap";
import SMSLogs from "../containers/sms_logs";

const SMSStatus = () => (
  <Grid fluid style={{ marginTop: "1rem" }}>
    <Row>
      <SMSLogs/>
    </Row>
  </Grid>
);


export default SMSStatus;
