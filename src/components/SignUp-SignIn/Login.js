import React, { Component } from "react";
import logo from "../includes/silc logo HD - EN.png";
import logo2 from "../includes/SILC.Co-roundedLogo-W.png";

class Login extends Component {
  render() {
    return (
      <div>
        <img src={logo} alt="Logo" id="logoCol" />
        <small className="text-muted">
        silc.co is a product of The SILC Group, an Investment matchmaking and asset management platform. 
        One place to access Investment opportunities and manage all your assets. 
        Building a diversified portfolio has never been easier. 
        </small>
      </div>
    );
  }
}

class LoginAdmin extends Component {
  render() {
    return (
      <div>
        <img src={logo2} alt="Logo" id="logoCol" />
        <small style={{ color: "white" }}>
          silc.co is a product of The SILC Group, an Investment matchmaking and
          asset management platform. One place to access Investment
          opportunities and manage all your assets. Building a diversified
          portfolio has never been easier.
        </small>
      </div>
    );
  }
}

export { Login, LoginAdmin };
