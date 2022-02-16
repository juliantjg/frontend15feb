import React, { Component } from "react";
import { Spinner, Card, Row, Col, Jumbotron } from "react-bootstrap";

class Loader extends Component {
  render() {
    return (
      <Spinner animation="border" role="status" style={{ color: "#a6192e" }}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
}

class LoaderOnConfirm extends Component {
  render() {
    try {
      var spinnerStyle = this.props.loaderStyle.color;
    } catch (error) {
      console.log(error);
    }
    return (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        variant={spinnerStyle}
      />
    );
  }
}

class ShimmerCard extends Component {
  render() {
    var arr = [];
    for (var i = 0; i < 4; i++) {
      arr.push(i + 1);
    }
    return (
      <Row style={{ position: "relative", width: "75vw" }}>
        {arr.map((assetItem) => (
          <Col key={assetItem} sm={12} md={6} lg={3} xl={3}>
            <Card
              className="my-3"
              id="assetCards"
              /*   style={{ width: "16rem"}} */
            >
              <Card.Img variant="top" className="shimmerBG content-img" />
              <Card.Body>
                <Card.Text as="div">
                  <div className="my-2"></div>
                </Card.Text>
                <Card.Title as="div">
                  <strong id="assetTitle">
                    <div className="shimmerBG content-line"></div>
                  </strong>
                  <small className="text-muted">
                    <div className="shimmerBG content-line"></div>
                  </small>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

class ShimmerJumbotron extends Component {
  render() {
    return (
      <>
        <div>
          <div
            className="shimmerBG title-line"
            style={{ fontWeight: "600" }}
          ></div>
        </div>
        <div>
          <Jumbotron className="shimmerBG">
            <div className=" content-line end"></div>
            <div className=" content-line"></div>
            <div className=" content-line"></div>
          </Jumbotron>
        </div>
      </>
    );
  }
}
export { Loader, LoaderOnConfirm, ShimmerCard, ShimmerJumbotron };
