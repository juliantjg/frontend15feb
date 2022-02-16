import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import userImg from "../includes/user.png";


class AdminGroupItem extends Component {
  render() {
    let group = this.props.groups;

    let unverifiedUserMsg = "Pending Verification";
    let AssetManager = "Asset Manager";
    /* let userBlocked = "User Blocked"; */
    let id = "verifiedUserBadge";
    var userType = "";
    const copyInvTypes = [];

    /* var mapObj = {
      australian_company: "Australian Company",
      individual: "Individual",
      company_trustee: "Company Trustee",
      individual_trustee: "Individual Trustee",
    };
 */
    /* if (group.investorTypes != null) {
      group.investorTypes.map((invType) =>
        copyInvTypes.push(
          invType.replace(
            /\b(?:australian_company|individual|company_trustee|individual_trustee)\b/gi,
            (matched) => mapObj[matched]
          )
        )
      );
    }
 */
   /*  if (group.userState === 0) {
      id = "";
      userType = unverifiedUserMsg;
    } */

    /* var url = `/AdminUserDashboard/AdminAMOverview/${group.id}`;
    if (group.investor === 1) {
      url = `/AdminUserDashboard/AdminInvOverview/${group.id}`;
      userType = copyInvTypes.map((invTypes) => (
        <Badge className={id} variant="secondary" style={{ marginLeft: "6px" }}>
          {invTypes}
        </Badge>
      ));
      console.log(userType);
    }
    if (group.AM === 1) {
      url = `/AdminUserDashboard/AdminAMOverview/${group.id}`;
      userType = (
        <Badge className={id} variant="secondary" style={{ marginLeft: "6px" }}>
          {AssetManager}
        </Badge>
      );
    }
    if (group.investor === 1 && group.AM === 1) {
      url = `/AdminUserDashboard/AdminAM+InvOverview/${group.id}`;
    }

    var codeBlockBadge = userType;
    if (group.investor === 1 && group.AM === 1) {
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
    if (group.investor === 0 && group.AM === 0) {
      codeBlockBadge = (
        <div>
          <Badge className={id} variant="secondary">
            {unverifiedUserMsg}
          </Badge>
        </div>
      );
    } */

    return (
      <a href={`/AdminGroupDashboard/AdminGroupOverview/${group.id}`} id="cardNav">
        <Card className="my-3" id="assetCards">
          <Card.Img id="assetImg" src={userImg}/>
          <Card.Body>
          <Card.Text as="div">
              <div className="my-2"> <Badge
            variant="primary"
          >
            {group.numOfMembers} {group.numOfMembers <= 1 ? ("Member"):("Members")}
          </Badge></div>
            </Card.Text>
            <Card.Title as="div">
              <a href={`/AdminGroupDashboard/AdminGroupOverview/${group.id}`}>
                <strong id="assetTitle">{group.groupName}</strong>
                <br />
              </a>
              <small className="text-muted">{group.groupType}</small>
            </Card.Title>
          </Card.Body>
        </Card>
      </a>
    );
  }
}


export default AdminGroupItem;