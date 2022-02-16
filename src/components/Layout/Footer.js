import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <hr />
        <div className="mb-3 text-center">
          <small>silc.co &#169; {new Date().getFullYear()}</small>
          <br />
          <a href="http://localhost:3000/" target="_blank">
            <small>Listing Rules</small>
          </a>
          &emsp;
          <a href="http://localhost:3000/" target="_blank">
            <small>User Guide</small>
          </a>
          &emsp;
          <a href="http://betatest.silc.co/terms-conditions/" target="_blank">
            <small>Terms of Use</small>
          </a>
          &emsp;
          <a href="http://betatest.silc.co/privacy-policy/" target="_blank">
            <small>Privacy Policy</small>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
