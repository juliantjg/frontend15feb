import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Navbar, NavDropdown, Container, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import IdleTimer from "react-idle-timer";
import Notification from "../Notifications/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

class NavbarHeader extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      time = today.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    this.state = {
      currentTime: time,
      hours: today.getHours(),

      timeout: 1000 * 15 * 60, //15 mins in ms
      showModal: false,
      userLoggedIn: false,
      isTimedOut: false,
      notifs: [],
      notifCount: 0,
    };
    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
    this.handleNotif = this.handleNotif.bind(this);
  }

  counter() {
    const notifCount = (sum, obj) => sum + (obj.status != "read" ? 1 : 0);
    const count = this.state.notifs.reduce(notifCount, 0);
    this.setState({ notifCount: count });
  }

  async notifApi() {
    await axios
      .get(`http://localhost:8000/api/notification/showAll`)
      .then((res) => {
        this.setState({ notifs: res.data.data });
        this.counter();
      });
  }

  componentDidMount() {
    this.notifApi();
    /*   await axios
      .get(`http://localhost:8000/api/notification/showAll`)
      .then((res) => {
        this.setState({ notifs: res.data.data });
        this.counter();
      }); */
  }

  handleNotif() {
    this.notifApi();
    /* await axios
      .get(`http://localhost:8000/api/notification/showAll`)
      .then((res) => {
        this.setState({ notifs: res.data.data });
        this.counter();
        
      }); */
  }

  _onAction(e) {
    // console.log('user did something', e)
    this.setState({ isTimedOut: false });
  }

  _onActive(e) {
    // console.log('user is active', e)
    this.setState({ isTimedOut: false });
  }

  _onIdle(e) {
    // console.log('user is idle', e)
    const isTimedOut = this.state.isTimedOut;
    if (isTimedOut) {
      this.props.logout(this.props.history).then(() => {
        alert("Logged out due to inactivity.");
      });
    } else {
      this.setState({ showModal: true });
      this.idleTimer.reset();
      this.setState({ isTimedOut: true });
    }
  }

  handleClick = () => {
    this.props.logout(this.props.history);
  };

  render() {
    var userName = localStorage.getItem("userName");
    if (userName != null) {
      var fName = userName.split(" ").slice(0, 1);
      var lName = userName.split(" ").slice(1, 2);
      var userInitials =
        String(fName).toUpperCase().charAt(0) +
        String(lName).toUpperCase().charAt(0);
    }
    return (
      <div className="content" id="navMain">
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={this.state.timeout}
        />
        <br />
        <Navbar className="header-navbar">
          <Navbar.Brand style={{ color: "white" }}>
            {(() => {
              if (this.state.hours >= 6 && this.state.hours < 12) {
                return (
                  <>
                    <h3>Good Morning,</h3>
                    <small>Lets get started. What is today's agenda ?</small>
                  </>
                );
              } else if (this.state.hours >= 12 && this.state.hours <= 17) {
                return (
                  <>
                    <h3>Good Afternoon,</h3>
                    <small>
                      Assistance required ? Call or send us an email.
                    </small>
                  </>
                );
              } else {
                return (
                  <>
                    <h3>Good Evening,</h3>
                    <small>Do your thing, if necessary send us an email.</small>
                  </>
                );
              }
            })()}
          </Navbar.Brand>
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
              className="notifDropdown"
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
                        content={notif.content.slice(0, 70).concat("...")}
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

            <NavDropdown
              title={
                <>
                  <h6 className="dropdownUserImg userProfInitials-Navbar">
                    {userInitials}
                  </h6>
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.ItemText className="dropdownUserName">
                <strong>
                  {userName}
                  <br />
                </strong>
                <small>inv@silc.com</small>
              </NavDropdown.ItemText>
              <NavDropdown.Item href="/selectGroup">
                User Group
              </NavDropdown.Item>
              <NavDropdown.Item href="/Profile">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleClick}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Container>
        </Navbar>
        <br />
      </div>
    );
  }
}

export default connect(null, { logout })(withRouter(NavbarHeader));
