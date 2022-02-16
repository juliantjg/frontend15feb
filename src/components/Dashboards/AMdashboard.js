import React, { Component } from "react";
import AssetItem from "../Assets/AssetItem";
import { Row, Col, Jumbotron, Badge, Card } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import { getCurrUserAssets } from "../../actions/assetAction";
import AddAssetButton from "../Assets/AddAssetButton";
import { getUser } from "../../actions/securityActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Loader, ShimmerCard, ShimmerJumbotron } from "../stylesheet/Loader";
import { Bar } from "react-chartjs-2";
import Footer from "../Layout/Footer"


class AMdashboard extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
    };
  }
  componentDidMount() {
    /*  this.props.getCurrUserAssets();
    this.props.getUser(localStorage.getItem("id")); */

    this.setState({ load: true }, () => {
      this.props.getCurrUserAssets();
      this.props
        .getUser(localStorage.getItem("id"))
        .then(() => {
          this.setState({ load: false });
        })
        .catch(() => {
          this.setState({ load: false });
        });
    });
  }
  render() {
    console.log(this.props);
    const { allData } = this.props.asset;
    const { userData } = this.props.security;

    const barChart = {
      labels: ["Property", "Private Equity", "Private Debt"],
      datasets: [
        {
          data: [
            userData.propertyCountAM,
            userData.equityCountAM,
            userData.debtCountAM,
          ],
          backgroundColor: [
            "rgba(0,0,0,0.5)",
            "rgba(119,156,171,0.5)",
            "rgba(172,22,44,0.5)",
          ],
          // "rgba(255,160,122,0.5)"
          hoverBackgroundColor: [
            "rgba(0,0,0,0.8)",
            "rgba(119,156,171,0.8)",
            "rgba(172,22,44,0.8)",
          ],
        },
      ],
    };

    var chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          labels: {
            usePointStyle: true,
          },
        },
        title: { display: true, text: "User Statistics", align: "start" },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      hover: {
        mode: "nearest",
        intersect: false,
      },
      scale: {
        ticks: {
          precision: 0,
        },
      },
    };
    /* var totalAssets = 0;

    for(var j = 0; j < allData.length; j++){
      totalAssets = j + 1;
     }

    const assetInVerification = (sum, obj) => sum + (obj.isVerified == false ? 1 : 0);
    const count = allData.reduce(assetInVerification, 0);
    
    var assetsListed = totalAssets - count; */

    if (userData.userState == 2) {
      var codeBlock = (
        <Badge
          variant="success"
          style={{
            marginTop: "-30px",
            float: "right",
            padding: "6px",
          }}
        >
          <FontAwesomeIcon
            icon={faUserCheck}
            size="lg"
            style={{ marginRight: "4px" }}
          />{" "}
          Verified
        </Badge>
      );
    }

    if (
      userData.num_accepted_assets == null ||
      userData.num_pending_assets == null ||
      userData.name == null
    ) {
      userData.num_accepted_assets = <Loader />;
      userData.num_pending_assets = <Loader />;
      userData.name = "Loading...";
    }

    if (userData.name != null) {
      var firstName = userData.name.split(" ").slice(0, 1).join("") + "'s";
    }

    if (
      userData.numOfApprovedInvestments == null ||
      userData.numOfPendingInvestments == null ||
      firstName == null
    ) {
      userData.numOfApprovedInvestments = <Loader />;
      userData.numOfPendingInvestments = <Loader />;
      firstName = "Loading...";
    }

    return (
      <div>
        <hr id="hr" />
        {(() => {
          if (this.state.load) {
            return (
              <>
                <ShimmerJumbotron />

                <div>
                  <Row style={{ position: "relative", width: "100" }}>
                    <Col>
                      <Jumbotron id="admin-userStatsCard" className="shimmerBG">
                        <div className="admin-userStats">
                          <div className=" content-line"></div>
                          <div className=" content-line"></div>
                        </div>
                      </Jumbotron>
                    </Col>
                    <Col>
                      <Jumbotron id="admin-userStatsCard" className="shimmerBG">
                        <div className="admin-userStats">
                          <div className=" content-line"></div>
                          <div className=" content-line"></div>
                        </div>
                      </Jumbotron>
                    </Col>
                  </Row>
                </div>
                <div
                  className="assetCardContainer"
                  style={{ marginTop: "50px" }}
                >
                  <div className="flexCol2">
                    <div className="shimmerBG title-line"></div>
                    <ShimmerCard />
                  </div>
                  <br />
                </div>
              </>
            );
          } else {
            return (
              <>
                <div>
                  <h1 className="primary-header">
                    <small className="text-muted" style={{ fontWeight: "600" }}>
                      {firstName}
                    </small>{" "}
                    Portfolio
                  </h1>
                  <AddAssetButton />
                </div>
                <div>
                  <Jumbotron>
                    {codeBlock}
                    <h5 className="display-5">Verification Details</h5>
                    <p>Your account has been verified as an Asset Manager.</p>
                    <p>
                      The application form for verification can be found in
                      <b> My Profile</b> &#10132;
                      <b> Become an Asset Manager.</b>
                    </p>
                    <hr className="my-2" />
                  </Jumbotron>
                </div>
                <div>
                  <Row className="position-relative">
                    <Col>
                      <Card className="userStatsCard">
                        <Card.Header>
                          <h6>
                            Asset Listed
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="userStatsCardIcon"
                            />
                          </h6>
                        </Card.Header>
                        <Card.Body className="admin-userStats">
                          {/* <small className="text-muted">
                            Assets made available in the marketplace
                          </small> */}
                          <h2>{userData.num_accepted_assets}</h2>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="userStatsCard">
                        <Card.Header>
                          <h6>
                            Assets in Verification
                            <FontAwesomeIcon
                              icon={faClock}
                              className="userStatsCardIcon"
                            />
                          </h6>
                        </Card.Header>
                        <Card.Body className="admin-userStats">
                          {/* <small className="text-muted">
                            Assets awaiting admin confirmation
                          </small> */}
                          <h2>{userData.num_pending_assets}</h2>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  {userData.num_accepted_assets != 0 ? (
                    <Row style={{ marginTop: "2rem" }}>
                      <Col>
                        <Card className="userStatsCard">
                          {/*  <Card.Header >
                         <h6> Performace Chart
                         </h6>
                         </Card.Header> */}
                          <Card.Body className="admin-userStats">
                            <Bar
                              id="chartJSContainer"
                              data={barChart}
                              height="100"
                              options={chartOptions}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                </div>
                {(() => {
                  if (Array.isArray(allData) && allData.length > 0) {
                    return (
                      <>
                        <hr />
                        <div className="assetCardContainer">
                          <div className="flexCol2">
                            <h1 className="primary-header">Your Assets</h1>
                            <Row>
                              {allData.map((assetItem) => (
                                <Col
                                  key={assetItem.id}
                                  sm={12}
                                  md={6}
                                  lg={3}
                                  xl={3}
                                >
                                  <AssetItem asset={assetItem} />
                                </Col>
                              ))}
                            </Row>
                          </div>
                          <br />
                        </div>
                      </>
                    );
                  } else {
                    return;
                  }
                })()}
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
  security: state.security,
});

export default connect(mapStateToProps, { getCurrUserAssets, getUser })(
  AMdashboard
);
