import React, { Component } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {Login} from "./Login";
import { connect } from "react-redux";
import { resetPwEmail } from "../../actions/securityActions";
import store from "../../store";
import {GET_ERRORS} from "../../actions/types";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import {ErrorToasts, SuccessToasts} from "../stylesheet/ErrorToasts";
import Footer from "../Layout/Footer"


class ResetPwVerification extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      load: false,
      show: false,
    };

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

  setShow(){
    this.setState({show: true});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const EmailRequest = {
      email: this.state.email,
    };
    this.setState({ load: true }, () => {
      this.props
        .resetPwEmail(EmailRequest)
        .then(() => {
          this.setState({ load: false });
        })
        .catch(() => {
          this.setState({ load: false });
          this.setShow();
        });
        this.setShow();
    });
    /* this.props.history.push("/ResetPassword"); */
   /*  alert("Reset password link sent to your email"); */
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
            {/*   <small className="text-muted">
                {(() => {
                    if (error.success == false) {
                      return <p id="authFailed">{error.message}</p>;
                    } else if(error.success == true) {
                      return <p className="authSuccess">{error.message}</p>;
                    }
                  })()}
              </small> */}
              <Form.Text className="text-muted">
                A password reset link will be sent to your email.
              </Form.Text>
              <br />
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    id="formFocus"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" id="loginBtn">
                {(() => {
                    if (this.state.load) {
                      return <LoaderOnConfirm />;
                    } else {
                      return <>Submit</>;
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

export default withRouter(connect(mapStateToProps, { resetPwEmail })(ResetPwVerification));