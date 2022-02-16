import React, { Component } from "react";
import AdminAssetItem from "../Admin-Assets/Admin-AssetItem";
import { Row, Col, Jumbotron } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import { getAdminAssets } from "../../actions/assetAction";
import { getUsers } from "../../actions/securityActions";
import { Loader } from "../stylesheet/Loader";

class AdminAssetDashboard extends Component {
  componentDidMount() {
    this.props.getAdminAssets();
    this.props.getUsers();
  }
  render() {
    console.log(this.props);
    const { allData } = this.props.asset;
    const { stats } = this.props.asset;

    if (stats.totalAssets == null || stats.totalAssetManagers == null) {
      stats.totalAssets = <Loader />;
      stats.totalAssetManagers = <Loader />;
      stats.totalInvestors = <Loader />;
    }

    return (
      <div>
        <div>
          <h1 className="primary-header">Recently Added Assets</h1>
        </div>
        <Row className="mt-3 position-relative">
          <Col>
            <Jumbotron id="admin-userStatsCard">
              <div className="admin-userStats">
                <h2>{stats.totalAssets}</h2>
                <h6>Total Assets</h6>
              </div>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron id="admin-userStatsCard">
              <div className="admin-userStats">
                <h2>{stats.totalAssetManagers}</h2>
                <h6>Total Asset Managers</h6>
              </div>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron id="admin-userStatsCard">
              <div className="admin-userStats">
                <h2>{stats.totalInvestors}</h2>
                <h6>Total Investors</h6>
              </div>
            </Jumbotron>
          </Col>
        </Row>
        <div className="assetCardContainer">
          <div className="flexCol2">
            <Row>
              {allData.map((assetItem) => (
                <Col key={assetItem.id} sm={12} md={6} lg={3} xl={3}>
                  <AdminAssetItem asset={assetItem} />
                </Col>
              ))}
            </Row>
          </div>
          <br />
        </div>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  asset: state.asset,
  security: state.security,
});

export default connect(mapStateToProps, { getAdminAssets, getUsers })(
  AdminAssetDashboard
);
