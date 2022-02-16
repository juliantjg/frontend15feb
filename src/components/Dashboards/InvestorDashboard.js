import React, { Component } from "react";
import InvestmentItem from "../Investment/investmentItem";
import { Row, Col, Jumbotron, Badge, Card } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import { getInvestments } from "../../actions/investmentAction";
import { getUser } from "../../actions/securityActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faCheck, faClock, faCaretUp, faWallet, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { Loader, ShimmerCard, ShimmerJumbotron } from "../stylesheet/Loader";
import { Doughnut } from "react-chartjs-2";
import Footer from "../Layout/Footer"

class InvestorDashboard extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
    };
  }

  componentDidMount() {
    this.setState({ load: true }, () => {
      this.props.getInvestments();
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
    const { data } = this.props.investments;
    const { stats } = this.props.investments;
    const { userData } = this.props.security;

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

    if (userData.groupName != null) {
      // var firstName = userData.groupName.split(" ").slice(0, 1).join("") + "'s";
      var accountGroup = userData.groupName.split(" ").join(" ") + "'s";
    }

    if (
      userData.numOfApprovedInvestments == null ||
      userData.numOfPendingInvestments == null ||
      accountGroup == null
    ) {
      userData.numOfApprovedInvestments = <Loader />;
      userData.numOfPendingInvestments = <Loader />;
      accountGroup = "Loading...";
    }

    const chartState = {
      labels: ["Property", "Private Debt", "Private Equity"],
      datasets: [
        {
          data: [stats.propertyCount, stats.debtCount, stats.equityCount],
         backgroundColor: ["rgba(0,0,0,0.5)",
         "rgba(172,22,44,0.5)",
        "rgba(119,156,171,0.5)"],
        // "rgba(255,160,122,0.5)"
          hoverBackgroundColor: ["rgba(0,0,0,0.8)",
          "rgba(172,22,44,0.8)",
          "rgba(119,156,171,0.8)"],
        },
      ],
    };

    var chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "center",
          labels: {
            usePointStyle: true,
          },
        },
      
      },
    
      
    };

    if (
      stats.propertyCount > 0 ||
      stats.debtCount > 0 ||
      stats.equityCount > 0
    ) {
      var chartCodeBlock = (
        <Doughnut data={chartState} options={chartOptions}/>
      );
    } else {
      chartCodeBlock = "No data to display";
    }

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
          invType.replace(
            /\b(?:australian_company|individual|company_trustee|individual_trustee)\b/gi,
            (matched) => mapObj[matched]
          )
        )
      );
    }

    return (
      <div>
        <hr id="hr" />
        {(() => {
          if (this.state.load) {
            var arr = [];
            for (var i = 0; i < 4; i++) {
              arr.push(i + 1);
            }
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
                      <Col>
                        <Jumbotron
                          id="admin-userStatsCard"
                          className="shimmerBG"
                        >
                          <div className="admin-userStats">
                            <div className=" content-line"></div>
                            <div className=" content-line"></div>
                          </div>
                        </Jumbotron>
                      </Col>
                      <Col
                        style={{
                          marginTop: "50px",
                          position: "relative",
                        }}
                      >
                        <Jumbotron
                          id="admin-userStatsCard"
                          className="shimmerBG"
                        >
                          <div className="admin-userStats">
                            <div className=" content-line"></div>
                            <div className=" content-line"></div>
                          </div>
                        </Jumbotron>
                      </Col>
                    </Col>

                    <Col>
                      <Col>
                        <Jumbotron
                          id="admin-userStatsCard"
                          className="shimmerBG"
                        >
                          <div className="admin-userStats">
                            <div className=" content-line"></div>
                            <div className=" content-line"></div>
                          </div>
                        </Jumbotron>
                      </Col>
                      <Col
                        style={{
                          marginTop: "50px",
                          position: "relative",
                        }}
                      >
                        <Jumbotron
                          id="admin-userStatsCard"
                          className="shimmerBG"
                        >
                          <div className="admin-userStats">
                            <div className=" content-line"></div>
                            <div className=" content-line"></div>
                          </div>
                        </Jumbotron>
                      </Col>
                    </Col>
                  </Row>
                </div>
                <div
                  className="assetCardContainer"
                  style={{ marginTop: "50px" }}
                >
                  <div className="flexCol2">
                    <div className="shimmerBG title-line"></div>
                    <Jumbotron
                      className="shimmerBG"
                      style={{ height: "30vh", width: "76vw" }}
                    ></Jumbotron>
                  </div>
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
                {" "}
                <div>
                  <h1 className="primary-header">
                    <small className="text-muted" style={{ fontWeight: "600" }}>
                      {accountGroup}
                    </small>{" "}
                    Portfolio
                  </h1>
                </div>
                <div>
                  <Jumbotron>
                    {codeBlock}
                    <h5 className="display-5">Verification Details</h5>
                    <p>
                      {/* Your account has been verified as: <b>{copyInvTypes.join(', ')}</b>. */}
                      Logged in as: <b>{userData.groupType}</b>.<br/>
                      All investments will represent: <b>{userData.groupName}</b>.
                    </p>
                    <p>
                      The application form for verification can be found in <b>My
                      Profile</b> &#10132;<b> Become an Investor.</b>
                    </p>
                    <hr className="my-2" />
                  </Jumbotron>
                </div>
                <div>
                
                  <Row>
                    <Col>
                    <Card className="userStatsCard" >
                         <Card.Header >
                         <h6> Performace Chart
                         <FontAwesomeIcon
                            icon={faChartPie}
                            className="userStatsCardIcon"
                          />
                         </h6>
                         </Card.Header>
                          <Card.Body className="admin-userStats">
                          {chartCodeBlock}
                          </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                      <Col>
                      <Card className="userStatsCard">
                         <Card.Header>
                         <h6>Projects Invested In
                         <FontAwesomeIcon
                            icon={faCheck}
                            className="userStatsCardIcon"
                          />
                         </h6>
                         </Card.Header>
                          <Card.Body className="admin-userStats">
                            {/* <small className="text-muted">Investments approved</small> */}
                            <h2>{userData.numOfApprovedInvestments}</h2>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col
                        style={{
                          marginTop: "50px",
                        }}
                      >
                        <Card className="userStatsCard">
                         <Card.Header >
                         <h6>Investments Pending
                         <FontAwesomeIcon
                            icon={faClock}
                            className="userStatsCardIcon"
                          />
                         </h6>
                         </Card.Header>
                          <Card.Body className="admin-userStats">
                            {/* <small className="text-muted">Investments awaiting approval</small> */}
                            <h2>{userData.numOfPendingInvestments}</h2>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Col>

                    <Col>
                      <Col>
                        <Card className="userStatsCard">
                         <Card.Header >
                         <h6>Returns To Date
                         <FontAwesomeIcon
                            icon={faCaretUp}
                            className="userStatsCardIcon"
                          />
                         </h6>
                         </Card.Header>
                          <Card.Body className="admin-userStats">
                            {/* <small className="text-muted">Combined return</small> */}
                            <h2>$12,000</h2>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col
                        style={{
                          marginTop: "50px",
                        }}
                      >
                         <Card className="userStatsCard">
                         <Card.Header >
                         <h6>Remaining Balance
                         <FontAwesomeIcon
                            icon={faWallet}
                            className="userStatsCardIcon"
                          />
                         </h6>
                         </Card.Header>
                          <Card.Body className="admin-userStats">
                            {/* <small className="text-muted">Total account funds</small> */}
                            <h2>$500,000</h2>
                          </Card.Body>
                        </Card>

                      </Col>
                    </Col>
                  </Row>
                </div>
                {(() => {
                  if (Array.isArray(data) && data.length > 0) {
                    return (
                      <>
                      <hr/>
                      <div
                        className="assetCardContainer"
                      >
                        <div className="flexCol2">
                          <h1 className="primary-header">Investments</h1>
                            <Row>
                              {data.map((invItem) => (
                                <Col
                                  key={invItem.id}
                                  sm={12}
                                  md={6}
                                  lg={3}
                                  xl={3}
                                >
                                  <InvestmentItem investments={invItem} />
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
  investments: state.investments,
  security: state.security,
});

export default connect(mapStateToProps, { getInvestments, getUser })(
  InvestorDashboard
);
