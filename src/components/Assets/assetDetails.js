import React, { Component } from "react";
import { ProgressBar, Card, Row, Col, Badge, Table } from "react-bootstrap";
import BookmarkButton from "../Assets/BookmarkButton";
import axios from "axios";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCaretSquareUp,
} from "@fortawesome/free-regular-svg-icons";

class AssetDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asset: {},
    };

    this.bookmark = this.bookmark.bind(this);
  }

  componentDidMount() {
    this.setState({ asset: this.props.asset });
  }

  async bookmark() {
    let id = this.state.asset.id;
    await axios
      .get(`http://ec2-52-64-254-219.ap-southeast-2.compute.amazonaws.com:8000/api/asset/${id}`)
      .then((response) => {
        this.setState({ asset: response.data.data });
      });
    console.log(this.state.asset);
  }

  render() {
    let asset = this.state.asset;

    var investmentReceiveInPercentage = Math.round(
      (asset.totalInvestmentReceived / asset.investmentGoal) * 100
    );

    var invGoalPercentage = Math.round(100 - investmentReceiveInPercentage);
    var invRemaining = Math.round(
      (invGoalPercentage / 100) * asset.investmentGoal
    );

    if (invGoalPercentage != 0) {
      var status = "Open";
    } else {
      status = "Close";
    }

    const styles = {
      backgroundImage: `url(${asset.imageURL})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: " 400px",
      opacity: "0.5",
      borderRadius: "0",
    };

    let addToBookmark = {
      variant: "none",
      color: "#ac162c",
      icon: "faBookmark",
      position: "relative",
      padding: "2px",
      fontSize: "30px",
      margin: "0",
      text: "add",
    };

    let removeFromBookmark = {
      variant: "none",
      color: "#ac162c",
      icon: "faBookmark",
      position: "relative",
      padding: "2px",
      fontSize: "30px",
      margin: "0",
      text: "remove",
    };

    let disabledBookmark = {
      variant: "none",
      icon: "faBookmark",
      position: "relative",
      padding: "2px",
      fontSize: "30px",
      margin: "0",
    };
    return (
      <div>
        <Card className="bg-dark text-white" style={{ borderRadius: "0px" }}>
          <Card.Img /* src={Img} */ style={styles} />
          <Card.ImgOverlay className="overlayTextBg">
            <Row>
              <Col sm={9}>
                <Card.Title>
                  <h1 className="headerImageTitle">
                    {asset.assetTitle}{" "}
                    {(() => {
                      if (localStorage.getItem("scopes") != "basic") {
                        if (localStorage.getItem("id") == asset.user_id) {
                          return (
                            <BookmarkButton
                              assetItem={this.state.asset.id}
                              bookmark={this.bookmark}
                              bookmarkStyle={disabledBookmark}
                              disabled={true}
                            />
                          );
                        } else if (asset.bookmark) {
                          return (
                            <BookmarkButton
                              assetItem={this.state.asset.id}
                              bookmark={this.bookmark}
                              bookmarkStyle={removeFromBookmark}
                              disabled={false}
                            />
                          );
                        } else {
                          return (
                            <BookmarkButton
                              assetItem={this.state.asset.id}
                              bookmark={this.bookmark}
                              bookmarkStyle={addToBookmark}
                              disabled={false}
                            />
                          );
                        }
                      }
                    })()}
                  </h1>
                </Card.Title>
                <Card.Text>
                  <Row className="my-4">
                    <Col sm={5}>
                      Investment Goal
                      <br />
                      <p className="headerImageText">
                        &#36;{Number(asset.investmentGoal).toLocaleString()}
                      </p>
                    </Col>
                    <Col>
                      Target Return
                      <br />
                      <p className="headerImageText">
                        {asset.interestRate}&#37;
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={5}>
                      Investment Term
                      <br />
                      <p className="headerImageText">
                        {asset.investmentTerm} months
                      </p>
                    </Col>
                    <Col>
                      Minimum Investment
                      <br />
                      <p className="headerImageText">
                        &#36;
                        {Number(asset.minInvestmentAmount).toLocaleString()}
                      </p>
                    </Col>
                  </Row>
                </Card.Text>
              </Col>
              {(() => {
                if (asset.isVerified == true) {
                  return (
                    <Col sm={3}>
                      <Card className="assetStatusCard p-2 mt-3">
                        <Card.Body>
                          <Row>
                            <Col>
                              <Card.Text>
                                <p className="text-muted m-0">Status</p>
                                <p className="headerImageText m-0">{status}</p>
                              </Card.Text>
                            </Col>
                            <Col>
                              <Card.Text>
                                <p className="text-muted m-0">Remaining</p>
                                <p className="headerImageText m-0">
                                  {invGoalPercentage} &#37;
                                </p>
                              </Card.Text>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                      <Card.Footer className="p-2 assetStatusFooter">
                        <small>
                          Accepting &#36;
                          {Number(asset.minInvestmentAmount).toLocaleString()} -
                          &#36;
                          {Number(invRemaining).toLocaleString()}.
                        </small>
                      </Card.Footer>
                    </Col>
                  );
                } else {
                  return <></>;
                }
              })()}
            </Row>
          </Card.ImgOverlay>
        </Card>
      </div>
    );
  }
}

class AssetProgressBar extends Component {
  render() {
    let asset = this.props.asset;
    const userType = localStorage.getItem("scopes");

    var investmentReceiveInPercentage = Math.round(
      (asset.totalInvestmentReceived / asset.investmentGoal) * 100
    );
    var myInvPercentage = Math.round(
      (asset.myInvestment / asset.investmentGoal) * 100
    );
    var othersInvPercentage = Math.round(
      investmentReceiveInPercentage - myInvPercentage
    );
    var invGoalPercentage = Math.round(100 - investmentReceiveInPercentage);

    return (
      <div className="dark-text">
        <hr />
        <h4>
          Investment Statistics -{" "}
          <small className="">
            {asset.myInvestmentData != null
              ? asset.myInvestmentData.groupName
              : ""}
          </small>
        </h4>
        <p className="text-muted">
          Contrast between the Investment activties for {asset.assetTitle}{" "}
        </p>

        <Row>
          <Col md="auto">
            <Card className="mt-4 invStats-Card">
              <Card.Body>
                <Card.Title>
                  Investment
                  <Card.Subtitle className="mb-2 text-muted d-inline">
                    {" "}
                    - Owned
                  </Card.Subtitle>
                </Card.Title>
                <Card.Text>
                  <h3>{myInvPercentage}&#37;</h3>
                  <div className="progressLegend">
                    <ProgressBar animated now={100} id="own" />
                  </div>
                  <small className="text-muted float-left">
                    &nbsp; valued at &#36;
                    {Number(asset.myInvestment).toLocaleString()}
                  </small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md="auto">
            <Card className="mt-4 invStats-Card">
              <Card.Body>
                <Card.Title>
                  Investment
                  <Card.Subtitle className="mb-2 text-muted d-inline">
                    {" "}
                    - Others
                  </Card.Subtitle>
                </Card.Title>
                <Card.Text>
                  <h3>{othersInvPercentage}&#37;</h3>
                  <div className="progressLegend">
                    <ProgressBar now={100} id="other" />
                  </div>
                  <small className="text-muted float-left">
                    &nbsp; valued at &#36;
                    {Number(
                      asset.totalInvestmentReceived - asset.myInvestment
                    ).toLocaleString()}
                  </small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md="auto">
            <Card className="mt-4 invStats-Card">
              <Card.Body>
                <Card.Title>
                  Investment
                  <Card.Subtitle className="mb-2 text-muted d-inline">
                    {" "}
                    - Remainder
                  </Card.Subtitle>
                </Card.Title>
                <Card.Text>
                  <h3>{invGoalPercentage}&#37;</h3>
                  <div className="progressLegend">
                    <ProgressBar now={100} id="remainder" />
                  </div>
                  <small className="text-muted float-left">
                    &nbsp; valued at &#36;
                    {Number(
                      asset.investmentGoal - asset.totalInvestmentReceived
                    ).toLocaleString()}
                  </small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <ProgressBar className="mt-4">
          <ProgressBar
            animated
            now={myInvPercentage}
            min={0}
            max={100}
            label={`${myInvPercentage}%`}
          />
          <ProgressBar
            now={othersInvPercentage}
            min={0}
            max={100}
            label={`${othersInvPercentage}%`}
          />
          <ProgressBar
            now={invGoalPercentage}
            min={0}
            max={100}
            label={`${invGoalPercentage}%`}
          />
        </ProgressBar>
        <hr />
      </div>
    );
  }
}

class AssetStats extends Component {
  render() {
    let asset = this.props.asset;
    let lineData = [];
    var label = [];
    var months = [];
    var investments = [];
    var totalInvestment = [];
    var currentInvestment = 0;

    if (asset.lineGraph != null) {
      lineData = asset.lineGraph;
    }

    lineData.map(
      (data) => (label.push(data.monthYear), investments.push(data.amount))
    );

    var startingMonth = label[0];
    var endingMonth = moment().format("MMM-YYYY");

    while (
      moment(startingMonth, "MMM-YYYY") <= moment(endingMonth, "MMM-YYYY")
    ) {
      months.push(startingMonth);
      startingMonth = moment(startingMonth, "MMM-YYYY")
        .add(1, "months")
        .format("MMM-YYYY");
    }

    for (var i = 0; i < months.length; i++) {
      if (label.includes(months[i])) {
        currentInvestment = investments[label.indexOf(months[i])];
        totalInvestment.push(currentInvestment);
      } else {
        totalInvestment.push(currentInvestment);
      }
    }

    const lineChart = {
      labels: months,
      datasets: [
        {
          label: "Amount",
          data: totalInvestment,
          fill: true,
          backgroundColor: "rgba(172,22,44,0.2)",
          borderColor: "rgba(172,22,44,1)",
        },
      ],
    };

    var chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: "right",
          align: "center",
          labels: {
            usePointStyle: true,
          },
        },
        /* title: { display: true, text: "Investment Statistics", align: "middle" }, */
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      hover: {
        mode: "nearest",
        intersect: false,
      },
      scales: {
        yAxes: {
          title: {
            display: true,
            text: "Amount",
            font: {
              size: 15,
            },
          },
          ticks: {
            precision: 0,
            callback: function (value) {
              return "$" + value;
            },
          },
        },
        xAxes: {
          title: {
            display: true,
            text: "Month-Year",
            font: {
              size: 15,
            },
          },
        },
      },
    };

    var totInvPercentage =
      (asset.totalInvestmentReceived / asset.investmentGoal) * 100;
    var lastInvPercentage =
      ((asset.totalInvestmentReceived -
        asset.investorsData.slice(-1)[0].amount) /
        asset.investmentGoal) *
      100;

    return (
      <div className="dark-text">
        <hr />
        <h4>Investment Statistics</h4>
        <p className="text-muted">
          Investment activity on the asset from <b>{startingMonth}</b> to{" "}
          <b>{endingMonth}</b>{" "}
        </p>

        <Row>
          <Col md="auto">
            <Card className="mt-4 invStats-Card">
              <Card.Body>
                <Card.Title>
                  Total
                  <Card.Subtitle className="mb-2 text-muted d-inline">
                    {" "}
                    - Amount to date
                  </Card.Subtitle>
                </Card.Title>
                <Card.Text>
                  <h3>
                    &#36;
                    {Number(asset.totalInvestmentReceived).toLocaleString()}
                  </h3>
                  <Badge pill className="invStats-Badge" variant="secondary">
                    <FontAwesomeIcon id="icons" icon={faCalendarCheck} />
                    {endingMonth}
                  </Badge>{" "}
                  <small className="text-muted">Last Investment</small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="auto">
            <Card className="mt-4 invStats-Card">
              <Card.Body>
                <Card.Title>
                  Latest
                  <Card.Subtitle className="mb-2 text-muted d-inline">
                    {" "}
                    - Last investment
                  </Card.Subtitle>
                </Card.Title>
                <Card.Text>
                  <h3>
                    &#36;
                    {Number(
                      asset.investorsData.slice(-1)[0].amount
                    ).toLocaleString()}
                  </h3>
                  <Badge pill className="invStats-Badge" variant="secondary">
                    <FontAwesomeIcon id="icons" icon={faCaretSquareUp} />
                    {totInvPercentage - lastInvPercentage}&#37;
                  </Badge>{" "}
                  <small className="text-muted">Vs {months.slice(-2)[0]}</small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="mt-5">
          <Line
            id="chartJSContainer"
            data={lineChart}
            height="100"
            options={chartOptions}
          />
        </div>
      </div>
    );
  }
}

class AssetHighlights extends Component {
  render() {
    let asset = this.props.asset;
    var highlight = [];

    if (asset.highlight != null) {
      highlight = asset.highlight;
    }

    return (
      <div className="dark-text">
        <small className="text-muted">{asset.assetType}</small>
        <h6>{asset.assetTitle}</h6>

        <div className="timeline">
          {highlight.map((assetHighlight) => (
            <div className="timelineContainer right">
              <div
                className="timelineContent"
                key={assetHighlight.id}
                sm={12}
                md={6}
                lg={3}
                xl={3}
              >
                <p>{assetHighlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class Investments extends Component {
  render() {
    let asset = this.props.asset;
    return (
      <div id="inv-Card">
        <br />
        <Card className="mb-2">
          <Card.Header>
            <FontAwesomeIcon id="icons" icon={faCalendarCheck} />
            {asset.created_at}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              Amount Invested:{" "}
              <strong>&#36;{Number(asset.amount).toLocaleString()}</strong>
            </Card.Text>

            <Card.Text>
              Investment Percentage:
              <strong> {asset.percentageTotal}%</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

class AssetIntro extends Component {
  render() {
    let asset = this.props.asset;
    return (
      <div className="dark-text">
        <small className="text-muted">{asset.assetType}</small>
        <h6>{asset.assetTitle}</h6>
        <p>{asset.assetInfo}</p>
      </div>
    );
  }
}

class AssetDocs extends Component {
  render() {
    let asset = this.props.asset;
    var docs = [];

    if (asset.documents != null) {
      docs = asset.documents;
    }
    return (
      <div className="dark-text">
        <small className="text-muted">{asset.assetType}</small>
        <h6 className="mb-4">{asset.assetTitle}</h6>
        <Table>
          <thead>
            <tr>
              <th>Document</th>
              <th>Date Uploaded</th>
            </tr>
          </thead>
          <tbody>
            {docs.length != 0
              ? docs.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <a href={doc.url} target="_blank">
                        {doc.name}
                      </a>
                    </td>
                    <td>{doc.created_at_formatted}</td>
                  </tr>
                ))
              : "No documents found."}
          </tbody>
        </Table>
      </div>
    );
  }
}

export {
  AssetProgressBar,
  AssetHighlights,
  AssetDetails,
  Investments,
  AssetStats,
  AssetIntro,
  AssetDocs,
};
