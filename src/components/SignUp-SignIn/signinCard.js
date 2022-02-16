import React, { Component } from "react";
import { Form, Button, Card, Row, Col, InputGroup } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Login } from "./Login";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import { ErrorToasts } from "../stylesheet/ErrorToasts";
import store from "../../store";
import { GET_ERRORS } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import Footer from "../Layout/Footer"

class SigninCard extends Component {
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
  }

  /* timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } */

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.security.validToken) {
      /* nextProps.history.push("/Marketplace"); */
     setTimeout(() => {
        const userType = localStorage.getItem("scopes");
        if (userType == "AM") {
          nextProps.history.push("/AMdashboard");
        } else if (userType == "investor") {
          nextProps.history.push("/SelectGroup");
        } else if (userType == "AM,investor" || userType == "investor,AM") {
          nextProps.history.push("/SelectGroup");
        } else if (userType == "basic") {
          nextProps.history.push("/BasicUserDashboard");
        }
      }, 1000);
    }

    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  setShow() {
    this.setState({ show: true });
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
          .login(LoginRequest)
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
    /*  console.log(LoginRequest, this.props.history); */
  }

  render() {
    const error = this.props.errors;
    if (this.state.load) {
      var loadBtn = "loginBtnProcessing";
      var disableField = true;
    } else {
      loadBtn = "loginBtn";
      disableField = false;
    }

    if (!this.state.load && localStorage.getItem("userName") != null) {
      var loginSuccess = "loginSuccess";
      disableField = true;
    } else {
      loginSuccess = "loginFail";
    }

    var userName = localStorage.getItem("userName");
    if (userName != null) {
      var fName = userName.split(" ").slice(0, 1);
      var lName = userName.split(" ").slice(1, 2);
      var userInitials =
        String(fName).toUpperCase().charAt(0) +
        String(lName).toUpperCase().charAt(0);
    }
    return (
      <div>
        {(() => {
          if (error.message && !this.state.load) {
            return (
              <ErrorToasts errors={error.message} setShow={this.setShow} />
            );
          }
        })()}
        <Row className="loginRow">
          <Col className="loginCol">
            <Login />
          </Col>
          <Col className="loginCol">
            <Card className="my-3 p-5" id="loginCard">
              {/* <Card className={loginSuccess}>
                <text className="text-center">
                  <h1 className="userImage userProfInitials mb-3">{userInitials}</h1>
                  <h6>Welcome</h6>
                  <h6>{userName}</h6>
                </text>
              </Card> */}

              <Card.Title style={{ marginBottom: "30px" }}>
                Sign In to <b>silc.</b>co
              </Card.Title>
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
                      disabled={disableField}
                    />
                  </InputGroup>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
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
                      disabled={disableField}
                    />
                  </InputGroup>
                  {/* <p className="pwShow" onClick={this.handleClick}>
                    {this.state.type === "text" ? "Hide" : "Show"}
                  </p>  */}
                  {/* <Link to="/verifyEmail" className="float-left mb-2">
                    <small>Forgot Password?</small>
                  </Link> */}
                </Form.Group>
               {/* <Form.Group id="mutedTextLabel">
                   <Form.Group id="loginformCheckbox" className="float-left">
                    <Form.Check
                      className="text-muted"
                      type="checkbox"
                      label="Remember Me"
                      disabled={disableField}
                    />
                  </Form.Group>
                  <Link to="/verifyEmail" className="float-right">
                    Forgot Password
                  </Link>
                </Form.Group>*/}
                 <br /> 
                <div className="loginBtnContainer">
                  <Button
                    variant="primary"
                    type="submit"
                    id={loadBtn}
                    disabled={disableField}
                  >
                    {(() => {
                      if (this.state.load) {
                        return <LoaderOnConfirm />;
                      }/*  else if (!this.state.load && userName != null) {
                        return (
                          <text style={{ whiteSpace: "nowrap" }}>Welcome</text>
                        );
                      } */ else {
                        return <>Login</>;
                      }
                    })()}
                  </Button>
                </div>
              </Form>
              <small className="text-muted" id="mutedTextLabel">
                Not a member?{" "}
                <Link to="/SignUp" style={{ marginLeft: "0.25rem" }}>
                  Register
                </Link>
              </small>
              <small id="mutedTextLabel">
               {/*  <Link to="/SignUp" style={{ marginLeft: "0.25rem" }}>
                  Privacy Policy
                </Link>
                <Link to="/SignUp" style={{ marginRight: "0.25rem" }}>
                  Terms &#38; Conditions
                </Link> */}
                 <Link to="/verifyEmail" className="float-left">
                   Forgot Password?
                  </Link>
              </small>
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

export default withRouter(connect(mapStateToProps, { login })(SigninCard));
