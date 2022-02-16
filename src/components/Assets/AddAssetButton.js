import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const AddAssetButton = () => {
  return (
    <React.Fragment>
      <Link to="/addAsset" className="btn btn-lg add-asset-button">
        New Asset <FontAwesomeIcon id="icons" icon={faPlus} style={{marginLeft: "4px"}} />
      </Link>
    </React.Fragment>
  );
};

export default AddAssetButton;
