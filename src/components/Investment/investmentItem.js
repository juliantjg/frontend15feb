import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheck } from "@fortawesome/free-solid-svg-icons";

class InvestmentItem extends Component {
  render() {
    let data = this.props.investments;

    let assetType = data.assetType;

    let id = "assetBadge";
    if (assetType === "Property") {
      id = "assetBadge-Property";
    } else if (assetType === "Private Equity") {
      id = "assetBadge-PrivateEq";
    }

    let assetStatus = <FontAwesomeIcon icon={faCheck} size="1x" />;

    let id2 = "verifiedUserBadge";

    if (data.status === 0) {
      assetStatus = <FontAwesomeIcon icon={faClock} size="1x" />;
      id2 = "";
    }

    var mapObj = {
      australian_company: "Australian Company",
      individual: "Individual",
      company_trustee: "Company Trustee",
      individual_trustee: "Individual Trustee",
    };

    if (data.investorType != null) {
      var formattedOutput = data.investorType.replace(
        /\b(?:australian_company|individual|company_trustee|individual_trustee)\b/gi,
        (matched) => mapObj[matched]
      );
    }

    return (
      <a href={`/AssetOverview/${data.asset_id}`} id="cardNav">
        <Card className="my-3" id="assetCards">
          <Card.Img id="assetImg" src={data.imageURL} />
          <Card.ImgOverlay>
            <Badge className={id2} variant="secondary">
              {assetStatus}
            </Badge>
          </Card.ImgOverlay>
          <Card.Body>
            <Card.Text as="div">
              <div className="my-2">
                <Badge className={id} variant="secondary">
                  {data.assetType}
                </Badge>
              </div>
            </Card.Text>
            <Card.Title as="div">
              <a href={`/AssetOverview/${data.asset_id}`}>
                <strong id="assetTitle">{data.assetName}</strong>
                <br />
              </a>
              <div>
                <small className="text-muted">{formattedOutput}</small>
              </div>
              <small className="text-muted">&#36;{data.amount}</small>
            </Card.Title>
          </Card.Body>
        </Card>
      </a>
    );
  }
}

export default InvestmentItem;
