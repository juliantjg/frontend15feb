import React, { Component } from "react";
import { Form, Button, Card, Row, Col, InputGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { adminLogin } from "../../actions/securityActions";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import store from "../../store";
import {GET_ERRORS} from "../../actions/types";
import {ErrorToasts} from "../stylesheet/ErrorToasts"; 
import logo from "../includes/SILC.Co-roundedLogo-W.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
class AdminSigninCard extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      type: "password",
      load: false,
      show: false,
    };

    this.handleClick = this.onChangeType.bind(this);
    this.handleSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setShow = this.setShow.bind(this);
  }

  componentDidMount() {
    store.dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    if (this.props.security.validToken) {
      this.props.history.push("/AdminUserDashboard");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.security.validToken) {
      nextProps.history.push("/AdminUserDashboard");
    }

    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }

    return null;
  }

  setShow(){
    this.setState({show: true});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeType() {
    this.setState(({ type }) => ({
      type: type === "text" ? "password" : "text",
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({ load: true }, () => {
      setTimeout(() => {   
      this.props
        .adminLogin(LoginRequest)
        .then(() => {
          this.setState({ load: false });
        })
        .catch(() => {
          this.setState({ load: false });
          this.setShow();
        });}, 2000);
        this.setShow();
    });
  }

  render() {
    const error = this.props.errors;

    if (this.state.load) {
      var loadBtn = "loginBtnProcessing";
    } else {
     loadBtn = "loginBtn";
    }
    return (
      <div style={{ color: "white", background: "black"}}>
        {(() => {
           if (error.message && !this.state.load) {
            return <ErrorToasts errors={error.message} setShow={this.setShow} />;
          }
        })()}
        <Row className="loginRow" style={{margin: "0"}}>
          {/* <Col className="loginCol">
            <LoginAdmin />
          </Col> */}
          <Col style={{marginTop: "15px"}}>
          <center><img src={logo} alt="Logo" style={{width: "20%", marginTop: "40px", position: "relative"}} /></center>

            <Card
              className="my-3 p-5"
              /* id="loginCard" */
              style={{ background: "#383c44", width: "35%", margin: "0 auto"}}
            >
              <Card.Title style={{marginBottom: "30px"}}>Admin Portal</Card.Title>
             {/*  <small className="text-muted">
                <p id="authFailed">{error.message}</p>
              </small> */}
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Text className="inputGroup">
                      {" "}
                      <div className="text-muted">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>{" "}
                    </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    id="formFocus"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                  </InputGroup>
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="position-relative d-inline-block w-100">
                  <Form.Label>Password</Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Text className="inputGroup">
                      {" "}
                      <div
                        className="pwShow text-muted"
                        onClick={this.handleClick}
                      >
                        {this.state.type === "text" ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                      </div>{" "}
                    </InputGroup.Text>
                  <Form.Control
                    type={this.state.type}
                    placeholder="Password"
                    id="formFocus"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                  </InputGroup>
                 {/*  <p
                    className="pwShow"
                    onClick={this.handleClick}
                    style={{ color: "white" }}
                  >
                    {this.state.type === "text" ? "Hide" : "Show"}
                  </p> */}
                </Form.Group>
                <div className="loginBtnContainer">
                <Button variant="primary" type="submit" id={loadBtn}>
                {(() => {
                    if (this.state.load) {
                      return <LoaderOnConfirm />;
                    } else {
                      return <>Login</>;
                    }
                  })()}
                </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default withRouter(
  connect(mapStateToProps, { adminLogin })(AdminSigninCard)
);
