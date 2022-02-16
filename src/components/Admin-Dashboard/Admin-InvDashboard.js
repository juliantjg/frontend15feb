import React, { Component } from "react";
import { Table, Tab, Tabs, Badge } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import { getInvestmentsAdmin } from "../../actions/investmentAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import VerifyInv from "../Admin-Assets/Admin-VerifyInv";

class AdminInvDashboard extends Component {
  componentDidMount() {
    this.props.getInvestmentsAdmin();
  }
  render() {
    console.log(this.props);
    const { data } = this.props.investments;
    const pendingApprovals = (sum, obj) => sum + (obj.status == false ? 1 : 0);
    const count = data.reduce(pendingApprovals, 0);

    const tabData = [
      {
        id: 0,
        title: <b>Approved</b>,
      },
      {
        id: 1,
        title: (
          <React.Fragment>
            <b>Pending</b>
            {count > 0 ? (
              <Badge className="admin-pendingBadge" variant="light">
                {count}
              </Badge>
            ) : (
              ""
            )}
          </React.Fragment>
        ),
      },
    ];

    const tabHeader = (
      <thead>
        <tr>
          <th>Status</th>
          <th>No</th>
          <th>Asset Title</th>
          <th>Investor Id</th>
          <th>Investor Name</th>
          <th>Group Name</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Approve</th>
        </tr>
      </thead>
    );

    return (
      <div>
        <div>
          <h1 className="primary-header">Investments</h1>
          {/*  <VerifyInv/> */}
        </div>
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
                      {tabHeader}
                      <tbody>
                        {data.map((invItem) => (
                          <tr key={invItem.id}>
                            {invItem.status == 1 ? (
                              <>
                                <td>
                                  {invItem.status != 0 ? (
                                    <FontAwesomeIcon
                                      className="verifiedUserBadge-Profile"
                                      icon={faCheckCircle}
                                      size="lg"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td>{invItem.id}</td>

                                <td>
                                  <a
                                    href={`/AdminAssetDashboard/AdminAssetOverview/${invItem.asset_id}`}
                                    id="cardNav"
                                  >
                                    {invItem.assetName}
                                  </a>
                                </td>
                                <td>{invItem.user_id}</td>
                                <td>{invItem.investorName}</td>
                                <td>{invItem.groupName}</td>
                                <td>{invItem.created_at_formatted}</td>
                                <td>&#36;{invItem.amount}</td>
                                <td>
                                  <VerifyInv
                                    id={invItem.id}
                                    amount={invItem.amount}
                                    status={invItem.status}
                                  />
                                </td>
                              </>
                            ) : (
                              ""
                            )}
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
                      {tabHeader}
                      <tbody>
                        {data.map((invItem) => (
                          <tr key={invItem.id}>
                            {invItem.status == 0 ? (
                              <>
                                <td>
                                  {invItem.status == 0 ? (
                                    <FontAwesomeIcon
                                      className="pendingUserBadge-Profile"
                                      icon={faExclamationCircle}
                                      size="lg"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td>{invItem.id}</td>

                                <td>
                                  <a
                                    href={`/AdminAssetDashboard/AdminAssetOverview/${invItem.asset_id}`}
                                    id="cardNav"
                                  >
                                    {invItem.assetName}
                                  </a>
                                </td>
                                <td>{invItem.user_id}</td>
                                <td>{invItem.investorName}</td>
                                <td>{invItem.groupName}</td>
                                <td>{invItem.created_at_formatted}</td>
                                <td>&#36;{invItem.amount}</td>
                                <td>
                                  <VerifyInv
                                    id={invItem.id}
                                    amount={invItem.amount}
                                    status={invItem.status}
                                  />
                                </td>
                              </>
                            ) : (
                              ""
                            )}
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

        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  investments: state.investments,
});

export default connect(mapStateToProps, { getInvestmentsAdmin })(
  AdminInvDashboard
);
