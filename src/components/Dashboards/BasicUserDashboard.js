import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import { getUser } from "../../actions/securityActions";
import { ShimmerJumbotron } from "../stylesheet/Loader";
import Footer from "../Layout/Footer"

class BasicUserDashboard extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
    };
  }

  componentDidMount() {
    /*  this.props.getUser(localStorage.getItem("id")); */
    this.setState({ load: true }, () => {
      this.props
        .getUser(localStorage.getItem("id"))
        .then(() => {
          this.setState({ load: false });
        })
        .catch(() => {
          this.setState({ load: false });
        });
    });
  }

  render() {
    console.log(this.props);
    const { userData } = this.props.security;

    if (userData.name != null) {
      var firstName = userData.name.split(" ").slice(0, 1).join("") + "'s";
    } else if (userData.name == null || firstName == null) {
      userData.name = "Loading...";
      firstName = "Loading...";
    }

    return (
      <div>
        <hr id="hr" />
        {(() => {
          if (this.state.load) {
            return (
              <>
                <ShimmerJumbotron />
              </>
            );
          } else {
            return (
              <>
                <div>
                  <h1 className="primary-header">
                    <small className="text-muted" style={{ fontWeight: "600" }}>
                      {firstName}
                    </small>{" "}
                    Portfolio
                  </h1>
                </div>

                <div>
                  <Jumbotron>
                    <h5 className="display-5">Verification Details</h5>
                    <h6>Your account has not been verified yet.</h6>
                    <p>
                      Your account will have{" "}
                      <b>
                        <i>Basic user</i>
                      </b>{" "}
                      functionality, where:
                    </p>
                    <ul>
                      <li>Marketplace will only show 4 assets.</li>
                      <li>
                        Investing and creating assets functinoality will be made
                        available upon complete verification and processing of
                        your application.
                      </li>
                    </ul>
                    <p>
                      The application form for verification can be found in <b>My
                      Profile</b> &#10132; <a href="/profile"><b>Entity Types.</b></a>
                    </p>
                    <hr className="my-2" />
                  </Jumbotron>
                </div>
                <hr />
              </>
            );
          }
        })()}
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { getUser })(BasicUserDashboard);
