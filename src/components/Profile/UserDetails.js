import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
/* import userImg from "../includes/user_Fm.jpg";
import userImg2 from "../includes/user_M.jpg"; */

class UserDetails extends Component {
  render() {
    let userInfo = this.props.user;
    console.log(userInfo);

    let unverifiedUserMsg = "Pending Verification";
    const userType = localStorage.getItem("scopes");

    const copyInvTypes = [];
    var mapObj = {
      australian_company: "Australian Company",
      individual: "Individual",
      company_trustee: "Company Trustee",
      individual_trustee: "Individual Trustee",
    };

    if (userInfo.investorTypes != null) {
      userInfo.investorTypes.map((invType) =>
        copyInvTypes.push(
          invType.replace(
            /\b(?:australian_company|individual|company_trustee|individual_trustee)\b/gi,
            (matched) => mapObj[matched]
          )
        )
      );
    }

    var userData = [
      copyInvTypes,
      userInfo.contact_no,
      userInfo.userState,
      userInfo.address,
      userInfo.investor,
      userInfo.AM,
      userInfo.name,
      userInfo.email,
    ];

    if (userInfo.name != null) {
      var fName = userInfo.name.split(" ").slice(0, 1);
      var lName = userInfo.name.split(" ").slice(1, 2);
      var userInitials =
        String(fName).toUpperCase().charAt(0) +
        String(lName).toUpperCase().charAt(0);
    }

    /*  if(localStorage.getItem("userG") == "Mrs." || localStorage.getItem("userG") == "Miss."){
      var userProf = userImg;
    }else if(localStorage.getItem("userG") == "Mr.") {
      userProf = userImg2
    }else{
      userProf = userImg2;
    } */

    /* for (var j = 0; j < userData.length; j++) {
      if (userData[j] == null) {
        userData[j] = "Loading...";
      }
    } */

    for (var i = 0; i < userData.length; i++) {
      /* if (userData[i] === null) {
        userData[i] = unverifiedUserMsg;
      } */
      if (userType == "basic") {
        userData[i] = unverifiedUserMsg;
      }
    }
    /* userData[2] = 2; */
    if (userData[2] == 2) {
      var codeBlock = (
        <FontAwesomeIcon
          className="verifiedUserBadge-Profile"
          icon={faCheckCircle}
          size="xs"
        />
      );
    }

    var codeBlock2 = "";

    if (userData[4] === 1 && userData[5] === 1) {
      codeBlock2 = (
        <div>
          <Card.Text className="userDetails">
            <small className="text-muted">User Type:</small>
            <h6>Asset Manager</h6>
            <br />
            <br />
            <small className="text-muted">Investor Type:</small>
            <h6>
              {" "}
              {userData[0].map((invTypes) => (
                <div>{invTypes}</div>
              ))}
            </h6>
          </Card.Text>
        </div>
      );
    } else if (userData[4] === 1) {
      codeBlock2 = (
        <Card.Text className="userDetails">
          <small className="text-muted">Investor Type:</small>
          <h6>
            {userData[0].map((invTypes) => (
              <div>{invTypes}</div>
            ))}
          </h6>
        </Card.Text>
      );
    } else if (userData[5] === 1) {
      codeBlock2 = (
        <Card.Text className="userDetails">
          <small className="text-muted">User Type:</small>
          <h6>Asset Manager</h6>
        </Card.Text>
      );
    } else {
      codeBlock2 = (
        <Card.Text className="userDetails">
          <small className="text-muted">User Type:</small>
          <h6>Pending Verification</h6>
        </Card.Text>
      );
    }

    return (
      <div>
        <Card className="userCardStyle">
          <div className="userImageContainer">
            {/* <Card.Img variant="top" src={userProf} className="userImage" /> */}
            <h1 className="userImage userProfInitials">{userInitials}</h1>
            <Card.Title>
              <h3 className="text-center">
                {codeBlock}
                {userData[6]}
              </h3>
            </Card.Title>
          </div>
          <Card.Body className="userDetailsContainer">
            {codeBlock2}
            <br />
            <Card.Text className="userDetails">
              <small className="text-muted">Email:</small>
              <h6>{userData[7]}</h6>
            </Card.Text>
            <br />
            <Card.Text className="userDetails">
              <small className="text-muted">Contact:</small>
              <h6>{userData[1]}</h6>
            </Card.Text>
            <br />
            <Card.Text className="userDetails">
              <small className="text-muted">Address:</small>
              <h6>{userData[3]}</h6>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default UserDetails;
