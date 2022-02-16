import React, { Component } from "react";
import { Row, Col, Table, Card, Tabs, Tab } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import AdminAddUser from "./Admin-AddUser";
import { getGroup, getGroupMembers } from "../../actions/groupAction";
import { Loader } from "../stylesheet/Loader";
import AdminGroupDetail from "./Admin-GroupDetail";
import ActivateUser from "./Admin-ActivateUser";

class AdminGroupOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: this.props.match.params.id,
    };
  }
  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
    this.props.getGroupMembers(this.props.match.params.id);
  }

  render() {
    const { userData } = this.props.groups;
    const { data } = this.props.groups;

    let unverifiedUserMsg = "Pending Verification";

    var userInfo = [
      userData.userState,
      userData.num_accepted_assets,
      userData.num_pending_assets,
    ];

    const userInvs = [];

    if (userData.investmentsReceived != null) {
      userData.investmentsReceived.map((invs) => userInvs.push(invs));
    }

    const tabData = [
      {
        id: 0,
        title: <b>Members</b>,
      },
      {
        id: 1,
        title: <b>Investments</b>,
      },
    ];

    for (var i = 0; i < userInfo.length; i++) {
      if (userInfo[i] === null && userInfo[0] != 2) {
        userInfo[i] = unverifiedUserMsg;
      } else if (userInfo[i] === null && userInfo[0] == 2) {
        userInfo[i] = "Detail not provided";
      }
    }

    if (userInfo[1] == null || userInfo[2] == null) {
      userInfo[1] = <Loader />;
      userInfo[2] = <Loader />;
    }

    return (
      <div>
        <Row>
          <Col sm={8}>
            <Row>
              <Col>
                <h1 className="primary-header">Members</h1>
                <AdminAddUser groupId={this.state.groupId} />

                <div className="flexCol2">
                  <div>
                    <div className="invTableContainer">
                      <div>
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
                                          <th>Name</th>
                                          <th>Email</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {data.map((members) => (
                                          <tr>
                                            <td>{members.name}</td>
                                            <td>{members.email}</td>
                                            <td><ActivateUser 
                                            userId={members.id}
                                            groupId={this.state.groupId}
                                            status = {members.groupStatus}
                                            /></td>
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
                                          <th>User Id</th>
                                          <th>Asset Id</th>
                                          <th>Asset Name</th>
                                          <th>Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {userInvs.map((invs) => (
                                          <tr>
                                            <td>{invs.user_id}</td>

                                            <td>
                                              <a
                                                href={`/AdminAssetDashboard/AdminAssetOverview/${invs.asset_id}`}
                                                id="cardNav"
                                              >
                                                {invs.asset_id}
                                              </a>
                                            </td>

                                            <td>{invs.assetName}</td>
                                            <td>${invs.amount}</td>
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
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
                <br />
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <h1 className="primary-header">Group</h1>

            <Card className="userStatsCard">
              <div>
                <div className="flexCol2">
                  <AdminGroupDetail groups={this.props.groups} />
                </div>
                <br />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.groups,
});

export default connect(mapStateToProps, { getGroup, getGroupMembers })(
  AdminGroupOverview
);
