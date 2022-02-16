import React, { Component } from "react";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import {
  AdminAssetDetails,
  AdminAssetImages,
  AdminInvestments,
  AdminAssetHighlights,
  ActivityLog,
  AdminAssetDocs,
} from "./Admin-AssetDetails";
import { getAdminAsset } from "../../actions/assetAction";
import PullFromMarket from "./Admin-PullAssetModal";
import VerifyAsset from "./Admin-VerifyAssets";
import UploadFile from "./Admin-UploadFile";

class AdminAssetOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.getAdminAsset(this.props.match.params.id);
    console.log(this.props.location);
  }
  render() {
    console.log("user ID Asset: " + this.state.userId);
    console.log(this.props);
    const asset = this.props.asset.data;
    const { invData } = this.props.asset;

    if (asset.isVerified == false) {
      var buttonCodeBlock = <VerifyAsset userId={this.state.userId} />;
    } else if (asset.isVerified == true) {
      buttonCodeBlock = <PullFromMarket userId={this.state.userId} />;
    }
    return (
      <div>
        <div>
          <h1 className="primary-header">Asset Overview</h1>
        </div>
        <Row className="assetView mt-4">
          <Col>
            <AdminAssetImages asset={asset} />
            <UploadFile assetId={asset.id} />
          </Col>
          <Col>
            <Tabs
              defaultActiveKey="Overview"
              id="uncontrolled-tab-example"
              className="marketplaceTabs"
            >
              <Tab eventKey="Overview" title="Overview">
                <div key={asset.id} sm={12} md={6} lg={4} xl={4}>
                  <AdminAssetDetails asset={asset} />
                  {buttonCodeBlock}
                </div>
              </Tab>
              <Tab eventKey="Highlights" title="Highlights">
                <div key={asset.id} sm={12} md={6} lg={4} xl={4}>
                  <AdminAssetHighlights asset={asset} />
                </div>
              </Tab>

              <Tab eventKey="Investments" title="Investments">
                <div sm={12} md={6} lg={4} xl={4}>
                  {invData.map((invItem) => (
                    <Col key={invItem.id} sm={12} md={6} lg={3} xl={3}>
                      <AdminInvestments asset={invItem} />
                    </Col>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="activityLog" title="Activity Log">
                <div key={asset.id} sm={12} md={6} lg={4} xl={4}>
                  <ActivityLog asset={asset} />
                </div>
              </Tab>
              <Tab eventKey="documents" title="Documents">
                <div key={asset.id} sm={12} md={6} lg={4} xl={4}>
                  <AdminAssetDocs asset={asset} />
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  asset: state.asset,
});

export default connect(mapStateToProps, { getAdminAsset })(AdminAssetOverview);
