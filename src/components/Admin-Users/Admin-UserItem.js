import React, { Component } from "react";
import { Card, Badge, Row, Col } from "react-bootstrap";
import userImg from "../includes/user.png";

class AdminUserItem extends Component {
  render() {
    let user = this.props.security;

    let unverifiedUserMsg = "Pending Verification";
    let AssetManager = "Asset Manager";
    /* let userBlocked = "User Blocked"; */
    let id = "verifiedUserBadge";
    var userType = "";
    const copyInvTypes = [];

    var mapObj = {
      australian_company: "Australian Company",
      individual: "Individual",
      company_trustee: "Company Trustee",
      individual_trustee: "Individual Trustee",
    };

    if (user.investorTypes != null) {
      user.investorTypes.map((invType) =>
        copyInvTypes.push(
          // Julian update: removed replacing the investorTypes with vars from mapObj (to fix bug that says undefined Feb 16 2022)
          // Now the badge will retrieve investorTypes straight from backend
          invType
        )
      );
    }

    if (user.userState === 0) {
      id = "";
      userType = unverifiedUserMsg;
    }

    var url = `/AdminUserDashboard/AdminAMOverview/${user.id}`;
    if (user.investor === 1) {
      url = `/AdminUserDashboard/AdminInvOverview/${user.id}`;
      userType = copyInvTypes.map((invTypes) => (
        <Badge className={id} variant="secondary" style={{ marginLeft: "6px" }}>
          {invTypes}
        </Badge>
      ));
      console.log(userType);
    }
    if (user.AM === 1) {
      url = `/AdminUserDashboard/AdminAMOverview/${user.id}`;
      userType = (
        <Badge className={id} variant="secondary" style={{ marginLeft: "6px" }}>
          {AssetManager}
        </Badge>
      );
    }
    if (user.investor === 1 && user.AM === 1) {
      url = `/AdminUserDashboard/AdminAM+InvOverview/${user.id}`;
    }

    var codeBlockBadge = userType;
    if (user.investor === 1 && user.AM === 1) {
      codeBlockBadge = (
        <div>
          {copyInvTypes.map((invTypes) => (
            <Badge
              className={id}
              variant="secondary"
              style={{ marginLeft: "6px" }}
            >
              {invTypes}
            </Badge>
          ))}
          <Badge
            className={id}
            variant="secondary"
            style={{ marginLeft: "6px" }}
          >
            Asset Manager
          </Badge>
        </div>
      );
    }
    if (user.investor === 0 && user.AM === 0) {
      codeBlockBadge = (
        <div>
          <Badge className={id} variant="secondary">
            {unverifiedUserMsg}
          </Badge>
        </div>
      );
    }

    return (
      <a href={url} id="cardNav">
        <Card className="my-3" id="assetCards">
          <Card.Img id="assetImg" src={userImg} />

          <Card.Body>
            <Card.Text as="div">
              <div className="my-2">{codeBlockBadge}</div>
            </Card.Text>
            <Card.Title as="div">
              <a href={url}>
                <strong id="assetTitle">{user.name}</strong>
                <br />
              </a>
              <small className="text-muted">{user.email}</small>
            </Card.Title>
          </Card.Body>
        </Card>
      </a>
    );
  }
}

class AdminUserDetails extends Component {
  render() {
    const { userData } = this.props.security;
    let unverifiedUserMsg = "Pending Verification";

    const copyInvTypes = [];

    var mapObj = {
      australian_company: "Australian Company",
      individual: "Individual",
      company_trustee: "Company Trustee",
      individual_trustee: "Individual Trustee",
    };

    if (userData.investorTypes != null) {
      userData.investorTypes.map((invType) =>
        copyInvTypes.push(
          // Julian update: removed replacing the investorTypes with vars from mapObj (to fix bug that says undefined Feb 16 2022)
          // Now the badge will retrieve investorTypes straight from backend
          invType
        )
      );
    }

    var userInfo = [
      copyInvTypes,
      userData.contact_no,
      userData.userState,
      userData.address,
      userData.investor,
      userData.AM,
      userData.name,
      userData.email,
    ];

    for (var i = 0; i < userInfo.length; i++) {
      if (userInfo[i] === null && userInfo[2] != 2) {
        userInfo[i] = unverifiedUserMsg;
      } else if (userInfo[i] === null && userInfo[2] == 2) {
        userInfo[i] = "Detail not provided";
      }
    }

    if (userInfo[5] === 1 && userInfo[4] === 0) {
      var codeBlock_userType = (
        <small className="text-muted">Asset Manager</small>
      );
    } else if (userInfo[4] === 1 && userInfo[5] === 0) {
      codeBlock_userType = (
        <small className="text-muted">{userInfo[0].join(", ")}</small>
      );
    } else if (userInfo[4] === 1 && userInfo[5] === 1) {
      codeBlock_userType = (
        <small className="text-muted">Asset Manager + Investor</small>
      );
    }

    if (userInfo[4] === 0 && userInfo[5] === 0) {
      codeBlock_userType = (
        <small className="text-muted">{unverifiedUserMsg}</small>
      );
    }

    if (userInfo[2] !== 0 && userInfo[2] !== 1 && userInfo[2] !== 3) {
      var codeBlock = <Badge className="verifiedBadge">Verified</Badge>;
    }

    if (
      userInfo[6] == null ||
      userInfo[7] == null ||
      userInfo[3] == null ||
      userInfo[1] == null ||
      codeBlock_userType == null
    ) {
      userInfo[6] = "Loading...";
      userInfo[7] = "Loading...";
      userInfo[3] = "Loading...";
      userInfo[1] = "Loading...";
      codeBlock_userType = "Loading...";
    }

    return (
      <div>
        <div className="admin-userTitleTag">
          <h6 className="text-muted">
            {codeBlock_userType}
            {codeBlock}
          </h6>
          <h4>
            <strong>{userInfo[6]}</strong>
          </h4>
        </div>
        <div className="admin-userTitleTag">
          <h6
            style={{
              backgroundColor: "#a6192e",
              color: "white",
              textAlign: "center",
            }}
          >
            Contact Details
          </h6>

          <p>
            <small className="text-muted">Email: </small>
            {userInfo[7]}
          </p>
          <p>
            <small className="text-muted">Contact: </small>
            {userInfo[1]}
          </p>
          <p>
            <small className="text-muted">Address: </small>
            {userInfo[3]}
          </p>
        </div>
      </div>
    );
  }
}

export { AdminUserItem, AdminUserDetails };
