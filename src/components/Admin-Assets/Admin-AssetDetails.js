import { icon } from "@fortawesome/fontawesome-svg-core";
import React, { Component } from "react";
import {
  ProgressBar,
  Row,
  Col,
  Container,
  Image,
  Card,
  Table,
  Carousel,
} from "react-bootstrap";
import EditHighights from "./Admin-EditHighlights";

class AdminAssetDetails extends Component {
  render() {
    let asset = this.props.asset;
    const investmentReceiveInPercentage = Math.round(
      (asset.totalInvestmentReceived / asset.investmentGoal) * 100
    );

    var assetArray = [
      asset.assetType,
      asset.assetTitle,
      asset.userCreatorName,
      asset.created_at_formatted,
      asset.assetInfo,
      asset.investmentGoal,
      asset.interestRate,
      asset.investmentTerm,
      asset.minInvestmentAmount,
      asset.verifiedBy,
      asset.verifiedAt,
    ];

    for (var i = 0; i < assetArray.length; i++) {
      if (assetArray[i] == null) {
        assetArray[i] = "Loading...";
      }
    }

    return (
      <div className="text-dark">
        <small className="text-muted">{assetArray[0]}</small>
        <h6>{assetArray[1]}</h6>
        <Container>
          <Row xs={2} md={4} lg={6}>
            <Col className="asset_verDetails ">
              <small className="text-muted">Added By: {assetArray[2]}</small>
            </Col>
            <Col className="asset_verDetails  mr-0">
              <small className="text-muted">Added On: {assetArray[3]}</small>
            </Col>
          </Row>
          {asset.isVerified == false ? (
            ""
          ) : (
            <Row xs={2} md={4} lg={6}>
              <Col className="asset_verDetails">
                <small className="text-muted">
                  Verified By: {assetArray[9]}
                </small>
              </Col>

              <Col className="asset_verDetails mr-0">
                <small className="text-muted">
                  Verified On: {assetArray[10]}
                </small>
              </Col>
            </Row>
          )}
        </Container>
        <hr />
        <br />
        <small className="text-muted">{assetArray[4]}</small>
        <hr id="seperatorHr" />
        {investmentReceiveInPercentage == 0 ? (
          ""
        ) : (
          <ProgressBar
            now={investmentReceiveInPercentage}
            label={`${investmentReceiveInPercentage} %`}
          />
        )}

        <br />
        <div className="asset_detailsContainer">
          <strong>Investment Goal: </strong>
          <p>&#36; {assetArray[5]}</p>
        </div>
        <div className="asset_detailsContainer">
          <strong>Interest Rate: </strong>
          <p>{assetArray[6]}&#37;</p>
        </div>
        <div className="asset_detailsContainer">
          <strong>Investment Term: </strong>
          <p>{assetArray[7]} months</p>
        </div>
        <div className="asset_detailsContainer">
          <strong>Minimum Investment: </strong>
          <p>&#36;{assetArray[8]}</p>
        </div>
        <hr />
      </div>
    );
  }
}

class AdminAssetHighlights extends Component {
  render() {
    let asset = this.props.asset;
    var highlight = [];

    if (asset.highlight != null) {
      highlight = asset.highlight;
    }

    return (
      <div className="dark-text">
        <small className="text-muted">{asset.assetType}</small>
        <h6 className="mb-4">{asset.assetTitle}</h6>

        <div>
          {highlight.map((assetHighlight) => (
            <div key={assetHighlight.id} sm={12} md={6} lg={3} xl={3}>
              {/* <p>{assetHighlight.description}</p> */}
              <Card className="userStatsCard mb-4">
                <Card.Body>
                  <Card.Title>
                    <EditHighights />
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {assetHighlight.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class ActivityLog extends Component {
  render() {
    let asset = this.props.asset;
    var activityLog = [];

    if (asset.activityLog != null) {
      activityLog = asset.activityLog;
    }

    return (
      <div className="admin-assetHighlights dark-text">
        <small className="text-muted">{asset.assetType}</small>
        <h6>{asset.assetTitle}</h6>

        <div className="timeline">
          {activityLog.map((assetLog) => (
            <div className="timelineContainer right">
              <div
                className="timelineContent"
                key={assetLog.id}
                sm={12}
                md={6}
                lg={3}
                xl={3}
              >
                {/* <p>{assetHighlight.description}</p> */}
                <Card className="userStatsCard">
                  <Card.Body>
                    <Card.Title>
                      <small className="font-weight-bold">
                        {assetLog.created_at_formatted}
                      </small>
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {assetLog.activity}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class AdminAssetImages extends Component {
  render() {
    let asset = this.props.asset;
    var images = [];

    if (asset.assetImage != null) {
      images = asset.assetImage;
    }
    return (
      <div>
        <Carousel> 
          {images.length != 0 ? (
            images.map((image) => (
              <Carousel.Item key={image.id} sm={12} md={6} lg={3} xl={3}>
                <img id="carouselImg" src={image.url} alt="First slide" />
              </Carousel.Item>
            ))
          ) : (
            <Image id="carouselImg" src={asset.imageURL} />
          )}
        </Carousel>
      </div>
    );
  }
}

class AdminAssetDocs extends Component {
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

class AdminInvestments extends Component {
  render() {
    let asset = this.props.asset;

    return (
      <div id="inv-Card">
        <br />
        <Card className="mb-2">
          <Card.Body>
            <Card.Text>
              Investor Name: <strong>{asset.name}</strong>
            </Card.Text>
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

export {
  AdminAssetDetails,
  AdminAssetHighlights,
  AdminAssetImages,
  AdminAssetDocs,
  AdminInvestments,
  ActivityLog,
};
