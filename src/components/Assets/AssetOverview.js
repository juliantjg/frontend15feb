import React, { Component } from "react";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import {
  AssetDetails,
  AssetProgressBar,
  Investments,
  AssetStats,
  AssetHighlights,
  AssetIntro,
  AssetDocs,
} from "./assetDetails";
import { getAsset } from "../../actions/assetAction";
import ApplyInvestModal from "../Investment/investModal";
import AssetEnqModal from "./AssetEnqModal";
import Footer from "../Layout/Footer"

class AssetOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      load: false,
    };
  }
  componentDidMount() {
    this.setState({ load: true }, () => {
      this.props
        .getAsset(this.props.match.params.id)
        .then(() => {
          this.setState({ load: false });
        })
        .catch(() => {
          this.setState({ load: false });
        });
    });
  }

  render() {
    const asset = this.props.asset.data;
    console.log(asset);
    const { invData } = this.props.asset;
    const userType = localStorage.getItem("scopes");
    const dataCheck = typeof invData !== "undefined" && invData.length > 0;

    if (
      (userType == "AM" && dataCheck) ||
      (userType == "AM,investor" &&
        asset.user_id == localStorage.getItem("id") &&
        dataCheck)
    ) {
      var invCodeBlock = (
        <Tab eventKey="Investments" title="Investments">
          <div className="p-4" sm={12} md={6} lg={4} xl={4}>
            <h1 className="tabTitles">Investments</h1>
            <p className="text-muted">Details pertaining to individual investments.</p>
            <Row>
              {invData.map((invItem) => (
                <Col key={invItem.id} sm={12} md={6} lg={3} xl={3}>
                  <Investments asset={invItem} />
                </Col>
              ))}
            </Row>
          </div>
        </Tab>
      );
    }

    if (
      (userType == "investor" || userType == "AM,investor") &&
      asset.myInvestment != 0
    ) {
      var progressCodeBlock = <AssetProgressBar asset={asset} />;
    }

    if (
      (userType == "AM" && dataCheck) ||
      (userType == "AM,investor" && dataCheck && asset.user_id == localStorage.getItem("id"))
    ) {
      var lineCodeBlock = <AssetStats asset={asset} />;
    }

    return (
      <div>
        {(() => {
          if (this.state.load) {
            return (
              <>
                <Row className="assetView overviewAssetView">
                  <div
                    className="assetHeaderImage-Shimmer w-100 shimmerBG"
                    style={{ background: "gray" }}
                  ></div>
                  <div className="w-100 shimmerBG">
                    <div
                      className="w-100 content-line end"
                      style={{ background: "#696969" }}
                    ></div>
                    <div className="p-4">
                      <div className=" content-line end"></div>
                      <div className="content-line"></div>
                      <div className="content-line"></div>
                    </div>
                  </div>
                  <Col className="p-4">
                    <div
                      className="shimmerBG content-line end btn btn-primary"
                      id="submitBtn"
                      style={{ background: "#E8E8E8" }}
                    ></div>
                    <div
                      className="shimmerBG content-line end btn btn-primary"
                      id="submitBtn"
                      style={{ background: "#E8E8E8" }}
                    ></div>
                  </Col>
                </Row>
              </>
            );
          } else {
            return (
              <>
                <Row className="assetView overviewAssetView">
                  <div className="assetHeaderImageContainer fadeEffect">
                    <AssetDetails asset={asset} />
                  </div>
                  <div className="w-100 fadeEffect">
                    <Tabs
                      defaultActiveKey="Overview"
                      id="uncontrolled-tab-example"
                      justify
                    >
                      <Tab eventKey="Overview" title="Overview">
                        <div
                          className="p-4"
                          key={asset.id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                        >
                          <h1 className="tabTitles">Overview</h1>
                          <AssetIntro asset={asset} />
                          {lineCodeBlock}
                          {progressCodeBlock}
                        </div>
                      </Tab>
                      <Tab eventKey="Highlights" title="Highlights">
                        <div
                          className="p-4"
                          key={asset.id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                        >
                          <h1 className="tabTitles">Highlights</h1>
                          {<AssetHighlights asset={asset} />}
                        </div>
                      </Tab>
                      <Tab
                        eventKey="Documents"
                        title="Documents"
                      >
                        <div
                          className="p-4"
                          key={asset.id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                        >
                          <h1 className="tabTitles">Asset Documents</h1>
                  <AssetDocs asset={asset}/>
                        </div>
                      </Tab>
                      {invCodeBlock}
                      <Tab eventKey="Disclaimer" title="Disclaimer">
                        <div
                          className="p-4"
                          key={asset.id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                        >
                          <h1 className="tabTitles">Disclaimer</h1>
                          <p className="dark-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nam ac dignissim nisl, quis finibus nulla.
                            Donec sit amet consectetur magna, vitae tristique
                            ipsum. Aenean ac risus ut metus ornare dictum eget
                            non ante. Nullam consequat lacus ac erat tempor
                            consectetur. In hendrerit elit vel dolor suscipit,
                            sed congue risus accumsan. Sed a sagittis erat.
                            Vivamus blandit, risus eu ultrices porta, sem ligula
                            accumsan ligula, lacinia consectetur odio orci ac
                            quam. Maecenas pulvinar tempor ex quis vehicula.
                            Maecenas nec nisi ac nisi ultricies varius id quis
                            elit. Proin ornare lorem nec mattis gravida.
                            Suspendisse iaculis vulputate sapien, vel interdum
                            velit tempus vel. Maecenas hendrerit auctor elit
                            sagittis accumsan. Integer ut viverra urna, id
                            malesuada lectus. Suspendisse hendrerit in lectus
                            nec fermentum. Quisque magna enim, malesuada ut
                            dolor commodo, porttitor sollicitudin quam. Nunc
                            ullamcorper felis sed nisi fringilla, in mollis quam
                            iaculis.<br/><br/> Cras imperdiet magna nulla, sit amet
                            laoreet ligula lacinia id. Mauris rutrum vestibulum
                            luctus. Sed dapibus finibus tellus, ac mollis mauris
                            tempor non. Duis porttitor et odio nec convallis.
                            Vestibulum quis auctor tellus. Phasellus mollis nunc
                            nec justo aliquam, sit amet ornare arcu vehicula.
                            Phasellus ullamcorper massa sed vehicula cursus.<br/><br/>
                            Nulla cursus, tellus ac fringilla faucibus, arcu
                            justo cursus nisi, vitae faucibus odio neque ut
                            elit. Aenean vehicula fermentum ex, eget tincidunt
                            ante pharetra eget. Nam semper a lacus sed bibendum.
                            Donec pretium sit amet justo at eleifend. Curabitur
                            quis maximus lorem. Sed posuere lectus non sem
                            pretium, non sodales enim ultricies. Nunc mattis
                            vehicula tempor. Proin eu nisl a mi molestie
                            dignissim.<br/><br/> Vestibulum finibus sit amet dui quis
                            mattis. Nulla dictum nulla nec metus bibendum
                            lacinia. Vestibulum purus magna, viverra et sapien
                            rhoncus, bibendum pretium elit. Vestibulum ante
                            ipsum primis in faucibus orci luctus et ultrices
                            posuere cubilia curae; Mauris vitae eleifend magna,
                            nec mollis massa. Proin elementum semper nisl nec
                            dapibus. Maecenas feugiat magna tortor, at hendrerit
                            magna ornare a. Vestibulum fringilla lectus sit amet
                            dignissim gravida. Nulla facilisi. Vestibulum
                            viverra mollis diam, sit amet dictum odio tempor
                            vel. Praesent et gravida ligula. Quisque commodo
                            massa et libero sagittis tincidunt. Pellentesque et
                            mattis nulla. Maecenas id dolor neque.
                          </p>
                        </div>
                      </Tab>
                    </Tabs>
                    <div className="p-4">
                      {userType != "AM" ? (<ApplyInvestModal id={this.state.id} />):("")}
                      <AssetEnqModal id={this.state.id} asset={asset}/>
                    </div>
                  </div>
                </Row>
              </>
            );
          }
        })()}
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  asset: state.asset,
});

export default connect(mapStateToProps, { getAsset })(AssetOverview);
