import React, { Component } from "react";
import { Row, Col, Tooltip, OverlayTrigger, Card } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faChartBar, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import FeedbackModal from "../Profile/FeedbackModal";
import SelectEntityModal from "../Profile/SelectEntityModal";
import ResetPwModal from "./ResetPwModal";
import AmApplicationModal from "./AmApplicationModal";

class UserSettings extends Component {
  constructor() {
    super();
    this.state = {
      entityType: "",
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Your password will be updated instantly, no other action required.
      </Tooltip>
    );
    return (
      <div>
        {/*   <Card className="userCardStyle">
          <Card.Body>
            <Card.Title>
              <h1 className="secondary-header">Settings</h1>
              <hr />
            </Card.Title> */}
        <div>
          <h1 className="secondary-header">Manage</h1>
          <hr />
        </div>
        <br />

        <Row>
          <Col xs={6}>
            <div className="form-group">
              <small className="text-muted"> Help us to improve SILC.Co.</small>
              <br />
              {/* <SelectEntityModal /> */}
              <FeedbackModal />
            </div>
          </Col>
          <Col xs={6}>
            <div className="form-group">
              <small className="text-muted">
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <FontAwesomeIcon id="infoIcon" icon={faInfoCircle} />
                </OverlayTrigger>
                Change Password
              </small>
              <Row className="align-items-center">
                <Col>
                  <ResetPwModal />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
          <AmApplicationModal />
          </Col>
          <Col>
            <SelectEntityModal />
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserSettings;
