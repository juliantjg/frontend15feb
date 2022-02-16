import React, { Component } from "react";
import { Form, Button, Card, Row, Col, InputGroup } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Login } from "./Login";
import { createNewUser } from "../../actions/securityActions";
import { connect } from "react-redux";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import { ErrorToasts, SuccessToasts } from "../stylesheet/ErrorToasts";
import store from "../../store";
import { GET_ERRORS } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import Footer from "../Layout/Footer"


class SignupCard extends Component {
  constructor() {
    super();
    this.state = {
      type: "password",

      // user details
      name: "",
      email: "",
      password: "",
      c_password: "",
      role: "admin",
      load: false,
      show: false,
    };

    this.handleClick = this.onChangePasswordShow.bind(this);
    this.handleSubmit = this.onSubmit.bind(this);
    this.handleLink = this.onLink.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setShow = this.setShow.bind(this);
  }

  componentDidMount() {
    store.dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }

  /* timeout(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms));
  } */

  setShow() {
    this.setState({ show: true });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangePasswordShow() {
    this.setState(({ type }) => ({
      type: type === "text" ? "password" : "text",
    }));
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      c_password: this.state.c_password,
      role: "basic",
    };

    /* this.props.createNewUser(newUser, this.props.history); */
    this.setState({ load: true }, () => {
      setTimeout(() => {
        this.props
          .createNewUser(newUser, this.props.history)
          .then(() => {
            this.setState({ load: false });
          })
          .catch(() => {
            this.setState({ load: false });
            this.setShow();
          });
      }, 2000);
      this.setShow();
    });
  }

  onLink(e) {
    this.props.history.push("/SignIn");
  }

  render() {
    const error = this.props.errors;
    if (this.state.load) {
      var loadBtn = "loginBtnProcessing";
    } else {
      loadBtn = "loginBtn";
    }
    return (
      <div>
        {(() => {
          if (error.message && !this.state.load) {
            if(error.success == false){
              return (
                <ErrorToasts errors={error.message} setShow={this.setShow} />
              );
            }else{
              return (
                <SuccessToasts errors={error.message} setShow={this.setShow} />
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
              <Card.Title>Create New Account</Card.Title>
              {/* <small className="text-muted">
                <p id="authFailed">{error.message}</p>
              </small> */}
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Text className="inputGroup">
                      {" "}
                      <div className="text-muted">
                        <FontAwesomeIcon icon={faUser} />
                      </div>{" "}
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      id="formFocus"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
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
                </Form.Group>

                <Form.Group>
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
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
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
                      placeholder="Confirm Password"
                      id="formFocus"
                      name="c_password"
                      value={this.state.c_password}
                      onChange={this.onChange}
                      required
                    />
                  </InputGroup>
                  {/*  <div className="pwShow text-muted" onClick={this.handleClick}>
                    {this.state.type === "text" ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </div>  */}
                </Form.Group>
                <Form.Group
                  controlId="formBasicCheckbox"
                  id="loginformCheckbox"
                >
                  <Form.Check
                    className="text-muted"
                    type="checkbox"
                    label="I agree with the terms and conditions"
                    required
                  />
                </Form.Group>
                <div className="loginBtnContainer">
                  <Button variant="primary" type="submit" id={loadBtn}>
                    {(() => {
                      if (this.state.load) {
                        return <LoaderOnConfirm />;
                      } else {
                        return <>Sign Up</>;
                      }
                    })()}
                  </Button>
                </div>
              </Form>
              <small className="text-muted" id="mutedTextLabel">
                Already have an account?
                <span style={{ marginRight: 5 }} />
                <Link to="/SignIn"> Sign In</Link>
              </small>
             {/*  <small id="mutedTextLabel">
                <Link to="/SignUp" style={{ marginLeft: "0.25rem" }}>
                  Privacy Policy
                </Link>
                <Link to="/SignUp" style={{ marginRight: "0.25rem" }}>
                  Terms &#38; Conditions
                </Link>
              </small> */}
            </Card>
          </Col>
        </Row>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default withRouter(
  connect(mapStateToProps, { createNewUser })(SignupCard)
);
