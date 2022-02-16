import React, { Component } from "react";

class AdminGroupDetail extends Component {
  render() {
    const { userData } = this.props.groups;

    var userInfo = [
      userData.groupType,
      userData.groupName,
      userData.contact,
      userData.email,
      userData.street,
      userData.suburb,
      userData.state,
      userData.postcode,
      userData.accountName,
      userData.bsb,
      userData.accountNumber,
      userData.abn,
      userData.acn,
    ];

    for (var i = 0; i < userInfo.length; i++) {
      if (userInfo[i] === null) {
        userInfo[i] = "Detail not provided";
      } else if (userInfo[i] == null) {
        userInfo[i] = "Loading...";
      }
    }

    return (
      <div>
        <div className="admin-userTitleTag">
          <strong>
            <small className="text-muted">{userInfo[0]}</small>
          </strong>
          <br />
          <h4>
            <strong>{userInfo[1]}</strong>
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
            Primary Contact
          </h6>

          <p>
            <small className="text-muted">Contact: </small>
            {userInfo[2]}
          </p>
          <p>
            <small className="text-muted">Email: </small>
            {userInfo[3]}
          </p>
          <p>
            <small className="text-muted">Address: </small>
            {userInfo[4] +
              " " +
              userInfo[5] +
              " " +
              userInfo[6] +
              " " +
              userInfo[7]}
          </p>
          <h6
            style={{
              backgroundColor: "#a6192e",
              color: "white",
              textAlign: "center",
            }}
          >
            Account Details
          </h6>
          <p>
            <small className="text-muted">Account Name: </small>
            {userInfo[8]}
          </p>
          <p>
            <small className="text-muted">BSB: </small>
            {userInfo[9]}
          </p>
          <p>
            <small className="text-muted">Account Number: </small>
            {userInfo[10]}
          </p>
          <h6
            style={{
              backgroundColor: "#a6192e",
              color: "white",
              textAlign: "center",
            }}
          >
            Other Details
          </h6>
          <p>
            <small className="text-muted">ABN: </small>
            {userInfo[11]}
          </p>
          <p>
            <small className="text-muted">ACN: </small>
            {userInfo[12]}
          </p>
        </div>
      </div>
    );
  }
}

export default AdminGroupDetail;
