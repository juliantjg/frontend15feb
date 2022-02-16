import React, { Component } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import {Login} from "./Login";
import { resetPw } from "../../actions/securityActions";
import { connect } from "react-redux";
import store from "../../store";
import {GET_ERRORS} from "../../actions/types";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import {ErrorToasts, SuccessToasts} from "../stylesheet/ErrorToasts";
import Footer from "../Layout/Footer"


class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      token: window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1),
      resetPassword:"",
      c_resetPassword: "",
      type: "password",
      load: false,
      show: false,
    };

    this.handleClick = this.onChangeType.bind(this);
    this.handleSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setShow = this.setShow.bind(this);
  }

  componentDidMount(){
    store.dispatch({
      type: GET_ERRORS,
      payload: {},
    });
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
    e.preventDefault();
    const PasswordRequest = {
      token: this.state.token ,
      resetPassword: this.state.resetPassword,
      c_resetPassword: this.state.c_resetPassword,
    };

    this.setState({ load: true }, () => {
      this.props
        .resetPw(PasswordRequest)
        .then(() => {
          this.setState({ load: false });
        })
        .catch(() => {
          this.setState({ load: false });
          this.setShow();
        });
        this.setShow();
    });
   /*  console.log(PasswordRequest) */
  }

  render() {
    const  error  = this.props.errors;
    return (
      <div>
        {(() => {
           if (error.message && !this.state.load) {
             if(error.success == false){
            return <ErrorToasts errors={error.message} setShow={this.setShow} />;
             } else if(error.success == true){
              return<SuccessToasts style={{background: "#FFD2D2", color: "#4F8A10"}} errors={error.message} setShow={this.setShow} />;
             }
          }
        })()} 
        <Row className="loginRow">
          <Col className="loginCol">
            <Login />
          </Col>
          <Col className="loginCol">
            <Card className="my-3 p-5" id="loginCard">
              <Card.Title>Reset Password</Card.Title>
             {/*  <small className="text-muted">
                {(() => {
                    if (error.success == false) {
                      return <p id="authFailed">{error.message}</p>;
                    } else if(error.success == true) {
                      return <p className="authSuccess">{error.message}  <Link to="/SignIn">Sign In</Link></p>
                     ;
                    }
                  })()}
              </small> */}
              <small className="text-muted">
                {(() => {
                    if(error.success == true) {
                      return <p><Link to="/SignIn" style={{float: "left", whiteSpace: "nowrap"}}>Return to Sign In</Link></p>;
                     ;
                    }
                  })()}
              </small> 
              <Form.Text className="text-muted">
                You will be redirected to login page on a successful password
                reset.
              </Form.Text>
              <br />
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type={this.state.type}
                    placeholder="Password"
                    id="formFocus"
                    name="resetPassword"
                    value={this.state.resetPassword}
                    onChange={this.onChange}
                    required
                  />
                </Form.Group>
                <Form.Group >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={this.state.type}
                    placeholder="Confirm Password"
                    id="formFocus"
                    name="c_resetPassword"
                    value={this.state.c_resetPassword}
                    onChange={this.onChange}
                    required
                  />
                  <p className="pwShow" onClick={this.handleClick}>
                    {this.state.type === "text" ? "Hide" : "Show"}
                  </p>
                </Form.Group>

                <Button variant="primary" type="submit" id="loginBtn">
                {(() => {
                    if (this.state.load) {
                      return <LoaderOnConfirm />;
                    } else {
                      return <>Confirm</>;
                    }
                  })()}
                </Button>
              </Form>
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

export default withRouter(connect(mapStateToProps, { resetPw })(ResetPassword));
