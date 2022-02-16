import React, { Component } from "react";
import logo from "../includes/silc logo HD - EN.png";

class NotFound extends Component {
  render() {
    return (
      <div>
            <img src={logo} alt="Logo" id="logoCol" />
            <small className="text-muted">
              Not Found
            </small>
         
      </div>
    );
  }
}

export default NotFound;
