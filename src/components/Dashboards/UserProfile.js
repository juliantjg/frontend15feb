import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import UserDetails from "../Profile/UserDetails";
import UserSettings from "../Profile/UserSettings";
import { getUser } from "../../actions/securityActions";
import { connect } from "react-redux";
import Footer from "../Layout/Footer";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
    };
  }

  componentDidMount() {
    /* this.props.getUser(localStorage.getItem('id')); */
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

    return (
      <div>
        <hr id="hr" />
        <h1 className="primary-header">Profile</h1>
        {(() => {
          if (this.state.load) {
            return (
              <>
                {/* <div className="shimmerBG title-line"></div> */}
                <Row className="userCardContainer">
                  <Col
                    className="shimmerBG userCardCol"
                    id="userSettingCol"
                    style={{ background: "#E8E8E8" }}
                  ></Col>
                  <Col className="userCardCol" sm={3.5}>
                    <Card style={{ width: "17rem" }}>
                      <div id="shimmerBG" style={{ background: "grey" }}>
                        <Card.Img
                          variant="top"
                          className="shimmerBG userImage"
                          style={{ marginTop: "10px" }}
                        />
                        &nbsp;
                        <Card.Title>
                          <center>
                            <div
                              className="shimmerBG content-line"
                              style={{ width: "60%" }}
                            ></div>
                          </center>
                        </Card.Title>
                      </div>
                      <Card.Body className="userDetailsContainer">
                        <Card.Text>
                          <div className="shimmerBG content-line"></div>&nbsp;
                          <div className="shimmerBG content-line"></div>&nbsp;
                          <div className="shimmerBG content-line"></div>&nbsp;
                          <div className="shimmerBG content-line"></div>
                        </Card.Text>
                      </Card.Body>

                      <Card.Body></Card.Body>
                    </Card>
                  </Col>
                </Row>
                <br />
              </>
            );
          } else {
            return (
              <>
                {/* <div>
                  <h1 className="primary-header">Profile &#x26; Settings</h1>
                </div> */}
                <Row className="userCardContainer">
                  <Col className="userCardCol fadeEffect" id="userSettingCol">
                    <UserSettings />
                  </Col>
                  <Col className="userCardCol fadeEffect" sm={3.5}>
                    <UserDetails user={userData} />
                  </Col>
                </Row>
                <br />
                <Footer />
              </>
            );
          }
        })()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { getUser })(UserProfile);
