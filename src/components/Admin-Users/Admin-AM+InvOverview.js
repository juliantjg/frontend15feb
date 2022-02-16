import React, { Component } from "react";
import { Row, Col, Card, Jumbotron, Table, Tab, Tabs } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import VerifyUserModal from "./Admin-VerifyUserModal";
import ConfirmationModal from "./Admin-ConfirmModal";
import { getUser } from "../../actions/securityActions";
import { Loader } from "../stylesheet/Loader";
import { AdminUserDetails } from "../Admin-Users/Admin-UserItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheck } from "@fortawesome/free-solid-svg-icons";

class AdminAMInvOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
    };
  }
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    const { userData } = this.props.security;
    const { userAssets } = this.props.security;
    const { userInvestments } = this.props.security;

    let unverifiedUserMsg = "Pending Verification";

    const tabData = [
      {
        id: 0,
        title: <b>Assets</b>,
      },
      {
        id: 1,
        title: <b>Investments</b>,
      },
    ];

    var userInfo = [
      userData.userState,
      userData.num_accepted_assets,
      userData.num_pending_assets,
      userData.numOfApprovedInvestments,
      userData.numOfPendingInvestments,
    ];

    for (var i = 0; i < userInfo.length; i++) {
      if (userInfo[i] === null && userInfo[0] != 2) {
        userInfo[i] = unverifiedUserMsg;
      } else if (userInfo[i] === null && userInfo[0] == 2) {
        userInfo[i] = "Detail not provided";
      }
    }

    if (
      userInfo[1] == null ||
      userInfo[2] == null ||
      userInfo[3] == null ||
      userInfo[4] == null
    ) {
      userInfo[1] = <Loader />;
      userInfo[2] = <Loader />;
      userInfo[3] = <Loader />;
      userInfo[4] = <Loader />;
    }

    return (
      <div>
        <div>
          <Row>
            <Col>
              <Jumbotron id="admin-userStatsCard">
                <div className="admin-userStats">
                  <h2>{userInfo[1]}</h2>
                  <h6>Assets Listed</h6>
                </div>
              </Jumbotron>
            </Col>
            <Col>
              <Jumbotron id="admin-userStatsCard">
                <div className="admin-userStats">
                  <h2>{userInfo[2]}</h2>
                  <h6>Assets in Verification</h6>
                </div>
              </Jumbotron>
            </Col>
            <Col>
              <Jumbotron id="admin-userStatsCard">
                <div className="admin-userStats">
                  <h2>{userInfo[3]}</h2>
                  <h6>Invested Asset</h6>
                </div>
              </Jumbotron>
            </Col>
            <Col>
              <Jumbotron id="admin-userStatsCard">
                <div className="admin-userStats">
                  <h2>{userInfo[4]}</h2>
                  <h6>Application In Verification</h6>
                </div>
              </Jumbotron>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col sm={8}>
              <Row>
                <Col>
                  <Tabs
                    defaultActiveKey={0}
                    id="uncontrolled-tab-example"
                    className="mb-3 mt-3 invTable-Tabs"
                  >
                    {tabData.map((tabs) => (
                      <Tab eventKey={tabs.id} title={tabs.title}>
                        {tabs.id == 0 ? (
                          <div className="invTableContainer">
                            <div>
                              <Table>
                                <thead>
                                  <tr>
                                    <th>Verified</th>
                                    <th>Asset Id</th>
                                    <th>Asset Name</th>
                                    <th>Asset Type</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userAssets.map((assets) => (
                                    <tr>
                                      <td>
                                        {assets.isVerified == 1 ? (
                                          <FontAwesomeIcon
                                            id="verifiedUserBadge"
                                            style={{
                                              color: "rgba(0, 128, 0, 1)",
                                            }}
                                            icon={faCheck}
                                            size="1x"
                                          />
                                        ) : (
                                          <FontAwesomeIcon
                                            style={{
                                              color: "rgba(242, 147, 57, 1)",
                                            }}
                                            icon={faClock}
                                            size="1x"
                                          />
                                        )}
                                      </td>
                                      <td>{assets.id}</td>
                                      <td>
                                        <a
                                          href={`/AdminAssetDashboard/AdminAssetOverview/${assets.id}`}
                                          id="cardNav"
                                        >
                                          {assets.assetTitle}
                                        </a>
                                      </td>
                                      <td>{assets.assetType}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                            <br />
                          </div>
                        ) : (
                          <div className="invTableContainer">
                            <div>
                              <Table>
                                <thead>
                                  <tr>
                                    <th>Verified</th>
                                    <th>Inv Id</th>
                                    <th>Inv Name</th>
                                    <th>Inv Type</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userInvestments.map((inv) => (
                                    <tr>
                                      <td>
                                        {inv.isVerified == 1 ? (
                                          <FontAwesomeIcon
                                            style={{
                                              color: "rgba(0, 128, 0, 1)",
                                            }}
                                            icon={faCheck}
                                            size="1x"
                                          />
                                        ) : (
                                          <FontAwesomeIcon
                                            style={{
                                              color: "rgba(242, 147, 57, 1)",
                                            }}
                                            icon={faClock}
                                            size="1x"
                                          />
                                        )}
                                      </td>
                                      <td>{inv.id}</td>
                                      <td>
                                        <a
                                          href={`/AdminAssetDashboard/AdminAssetOverview/${inv.id}`}
                                          id="cardNav"
                                        >
                                          {inv.assetTitle}
                                        </a>
                                      </td>
                                      <td>{inv.assetType}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                            <br />
                          </div>
                        )}
                      </Tab>
                    ))}
                  </Tabs>

                  <br />
                </Col>
              </Row>
            </Col>
            <Col sm={4}>
              <Card className="userStatsCard">
                <div>
                  <div className="flexCol2">
                    <AdminUserDetails security={this.props.security} />
                  </div>
                  <br />
                </div>
                <div className="d-flex justify-content-center">
                  <ConfirmationModal userId={this.state.userId} />
                  <VerifyUserModal userId={this.state.userId} />
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { getUser })(AdminAMInvOverview);
