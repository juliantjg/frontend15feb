import React, { Component } from "react";
import { Card, Badge, Col } from "react-bootstrap";
// import logo from "../includes/asset.jpg";
/* import badgeLogo from "../includes/silc logo HD - EN.png";*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faKey,
  faClock,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

class AssetItem extends Component {
  /* getComponent(event) {
    console.log('li item clicked!');
    event.currentTarget.style.transform = 'scale(1.5)';
    event.currentTarget.style.opacity = '0';
    event.currentTarget.style.zIndex = '10';
} */
  render() {
    let asset = this.props.asset;
    let assetType = asset.assetType;

    let id = "assetBadge";
    if (assetType === "Property") {
      id = "assetBadge-Property";
    } else if (assetType === "Private Equity") {
      id = "assetBadge-PrivateEq";
    }

    /* let unverifiedAssetMsg = "Pending Verification"; */
    let assetStatus = <FontAwesomeIcon icon={faCheck} size="1x" />;

    let id2 = "verifiedUserBadge";

    if (asset.isVerified == false) {
      assetStatus = <FontAwesomeIcon icon={faClock} size="1x" />;
      id2 = "";
    } /* else{
      assetStatus = "Verified"
      id2 = "verifiedUserBadge"
    } */

    if (asset.formSubmitted == 0) {
      var actionReq = (
        <Badge className="formsSubBadge" variant="secondary">
          {/* <FontAwesomeIcon
            icon={faPaperclip}
            size="lg"
            style={{ marginRight: "5px" }}
          /> */}
          Check email for questionnaire
        </Badge>
      );
    }

    if (asset.user_id == localStorage.getItem("id")) {
      var ownerBadge = <FontAwesomeIcon icon={faKey} size="sm" />;
    }

    var currUrl = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );

    /* if(currUrl == "Marketplace"){
      var cardId = "assetCards"
    }else{
      cardId = "assetCardsH"
    } */

    const card = (
      <Card
        className="my-3"
        id="assetCards" /* onClick={this.getComponent.bind(this)} */
      >
        <Card.Img id="assetImg" src={asset.imageURL} />
        <Card.ImgOverlay>
          <Badge className={id2} variant="secondary">
            {assetStatus}
          </Badge>
        </Card.ImgOverlay>
        {actionReq}
        {/*  <Badge className="formsSubBadge" variant="secondary">
        <FontAwesomeIcon icon={faPaperclip} size="lg" style={{marginRight: "5px"}}/>
        Asset form pending
      </Badge> */}
        <Card.Body>
          <Card.Text as="div">
            <div className="my-2">
              <Badge className={id} variant="secondary">
                {asset.assetType}
              </Badge>
              <Badge variant="primary" style={{ marginLeft: "10px" }}>
                {ownerBadge}
              </Badge>
            </div>
          </Card.Text>
          <Card.Title as="div">
            <a href={`/AssetOverview/${asset.id}`}>
              <strong id="assetTitle">{asset.assetTitle}</strong>
              <br />
            </a>
            {(() => {
              if (currUrl == "Marketplace") {
                return (
                  <Col xs={9} className="p-0">
                    <small className="text-muted">
                      {asset.suburb}, {asset.state} {asset.postcode}
                    </small>
                  </Col>
                );
              } else {
                return (
                  <div>
                    <small className="text-muted">
                      {asset.suburb}, {asset.state} {asset.postcode}
                    </small>
                  </div>
                );
              }
            })()}
          </Card.Title>
          {/*  <Card.Img id="assetLogo" src={badgeLogo} /> */}
        </Card.Body>
        {currUrl == "Marketplace" ? (
          <div className="assetCardFooter">
            <Card.Footer>
              <small className="text-muted">
                <b>Goal: ${Number(asset.investmentGoal).toLocaleString()}</b>
                <br />
                <b>Term: {asset.investmentTerm} months</b>
              </small>
            </Card.Footer>
          </div>
        ) : (
          ""
        )}
      </Card>
    );
    return (
      <>
        {(() => {
          if (localStorage.getItem("scopes") == "basic") {
            return <>{card}</>;
          } else {
            return (
              <a href={`/AssetOverview/${asset.id}`} id="cardNav">
                {card}
              </a>
            );
          }
        })()}
      </>
    );
  }
}

export default AssetItem;
