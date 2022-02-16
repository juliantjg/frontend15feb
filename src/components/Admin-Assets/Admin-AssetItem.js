import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

class AdminAssetItem extends Component {
  render() {
    let asset = this.props.asset;

    var assetData = [asset.assetType, asset.isVerified];

    let id = "assetBadge";
    if (assetData[0] === "Property") {
      id = "assetBadge-Property";
    } else if (assetData[0] === "Private Equity") {
      id = "assetBadge-PrivateEq";
    }

    let assetStatusMsg = <FontAwesomeIcon icon={faCheck} size="1x" />;
    let id2 = "verifiedUserBadge";

    if (assetData[1] == false) {
      assetStatusMsg = <FontAwesomeIcon icon={faClock} size="1x" />;
      id2 = "";
    } 
    if (asset.formSubmitted == 0) {
      var actionReq = (
        <Badge className="formsSubBadge" variant="secondary">
          
          Check for questionnaire
        </Badge>
      );
    }

    //to differentiate between asset and investment (in users investments)
    if (typeof asset.amount !== "undefined") {
      var assetId = asset.asset_id;
    } else if (typeof asset.amount === "undefined") {
      assetId = asset.id;
    }

    return (
      <a
        href={`/AdminAssetDashboard/AdminAssetOverview/${assetId}`}
        id="cardNav"
      >
        <Card className="my-3" id="assetCards">
          <Card.Img id="assetImg" src={asset.imageURL} />
          

          <Card.ImgOverlay>
            <Badge className={id2} variant="secondary">
              {assetStatusMsg}
            </Badge>
          </Card.ImgOverlay>
          {actionReq}
          <Card.Body>
            <Card.Text as="div">
              <div className="my-2">
                <Badge className={id} variant="secondary">
                  {asset.assetType}
                </Badge>
              </div>
            </Card.Text>
            <Card.Title as="div">
              <a href={`/AdminAssetDashboard/AdminAssetOverview/${asset.id}`}>
                <strong id="assetTitle">{asset.assetTitle}</strong>
                <br />
              </a>
              <small className="text-muted">{asset.location}</small>
            </Card.Title>
            {/*  <Card.Img id="assetLogo" src={badgeLogo} /> */}
          </Card.Body>
        </Card>
      </a>
    );
  }
}

export default AdminAssetItem;
