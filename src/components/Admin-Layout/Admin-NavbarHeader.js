import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Navbar, NavDropdown, Container, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Notification from "../Notifications/Notification";
import axios from "axios";

class AdminNavbarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifs: [],
      notifCount: 0,
    };
    this.handleNotif = this.handleNotif.bind(this);
  }

  counter() {
    const notifCount = (sum, obj) => sum + (obj.status != "read" ? 1 : 0);
    const count = this.state.notifs.reduce(notifCount, 0);
    this.setState({ notifCount: count });
  }

  async notifApi() {
    await axios
      .get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/notification/showAll`)
      .then((res) => {
        this.setState({ notifs: res.data.data });
        console.log(res.data.data);
        this.counter();
      });
  }

  componentDidMount() {
    this.notifApi();
  }

  handleNotif() {
    this.notifApi();
  }

  /* handleClick = () => {
    store.dispatch(logout());
    window.location.href = "/adminSignIn";
  };
 */
  render() {
    return (
      <div className="content">
        <Navbar className="header-navbar pb-0">
          <Container
            className="ml-auto"
            id="navDropdown"
            style={{ justifyContent: "flex-end" }}
          >
            <NavDropdown
              onClick={this.handleNotif}
              title={
                <>
                  {this.state.notifCount > 0 ? (
                    <Badge className="notifCountBadge">
                      {this.state.notifCount}
                    </Badge>
                  ) : (
                    ""
                  )}
                  <h6 className="dropdownUserImg userProfInitials-Navbar">
                    <FontAwesomeIcon icon={faBell} />
                  </h6>
                </>
              }
              id="basic-nav-dropdown"
              className="notifDropdown adminNotif"
            >
              <div>
              <div
                  className="text-left mb-2 mt-2"
                  style={{ padding: "0.25rem 1.5rem" }}
                >
                  <strong>Notifications</strong>
                </div>
                <NavDropdown.Divider />
                {this.state.notifs.length != 0 ? (
                  [...this.state.notifs].reverse().map((notif) => (
                    <>
                      {" "}
                      <Notification
                        title={notif.title}
                        created_at={notif.created_at}
                        id={notif.id}
                        status={notif.status}
                        content={notif.content.slice(0, 70).concat('...')}
                      />
                    </>
                  ))
                ) : (
                  <NavDropdown.Item>
                    <small>
                      <strong className="dark-text">Nothing yet</strong>
                    </small>
                  </NavDropdown.Item>
                )}
              </div>
            </NavDropdown>
          </Container>
        </Navbar>
        <hr id="hr" />
        <br />
      </div>
    );
  }
}

export default withRouter(AdminNavbarHeader);
