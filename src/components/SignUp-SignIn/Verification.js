import React, { Component } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Login } from "./Login";
import store from "../../store";
import { GET_ERRORS } from "../../actions/types";
import { ErrorToasts, SuccessToasts } from "../stylesheet/ErrorToasts";
import { verifyEmail } from "../../actions/securityActions";
import { connect } from "react-redux";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import Footer from "../Layout/Footer"

class Verification extends Component {
  constructor() {
    super();
    this.state = {
      token: window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      ),
      load: false,
      show: false,
    };

    this.setShow = this.setShow.bind(this);
  }

  setShow() {
    this.setState({ show: true });
  }

  /* timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  } */

  componentDidMount() {
    store.dispatch({
      type: GET_ERRORS,
      payload: {},
    });

    const TokenRequest = {
      token: this.state.token,
    };
    this.setState({ load: true }, () => {
      this.props
        .verifyEmail(TokenRequest)
        .then(() => {
          this.setState({ load: false });
        })
        .catch(() => {
          this.setState({ load: false });
          this.setShow();
        });
      this.setShow();
    });
  }

  render() {
    const error = this.props.errors;
    return (
      <div>
        {(() => {
          if (error.message && !this.state.load) {
            if (error.success == false) {
              return (
                <ErrorToasts errors={error.message} setShow={this.setShow} />
              );
            } else if (error.success == true) {
              setTimeout(() => {
                window.location.href = "/SignIn";
              }, 2000);

              return (
                <SuccessToasts
                  style={{ background: "#FFD2D2", color: "#4F8A10" }}
                  errors={error.message}
                  setShow={this.setShow}
                />
              );
            }
          }
        })()}
        <Row className="loginRow">
          <Col className="loginCol">
            <Login />
          </Col>
          <Col className="loginCol">
            <Card className="my-3 p-5" id="loginCard">
              <div>
                {(() => {
                  if (this.state.load) {
                    return (
                      <div
                        className="position-absolute"
                        style={{ top: "0", right: "10px" }}
                      >
                        <LoaderOnConfirm />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="position-absolute"
                        style={{ top: "0", right: "10px" }}
                      ></div>
                    );
                  }
                })()}
              </div>
              <Card.Title>Verify Account</Card.Title>
              <Form.Text className="text-muted">
                Give it a few seconds for the system to verify your email.
              </Form.Text>
              <Form.Text className="text-muted">
                <div>
                  Once verified you will be redirected to{" "}
                  <a href="/SignIn" className="float-none">
                    Login
                  </a>
                  .
                </div>
              </Form.Text>
              <br />
            </Card>
          </Col>
        </Row>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default withRouter(
  connect(mapStateToProps, { verifyEmail })(Verification)
);
