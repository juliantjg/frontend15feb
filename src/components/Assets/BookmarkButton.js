import React, { useState } from "react";
import {Button } from "react-bootstrap";
import axios from "axios";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkReg } from '@fortawesome/free-regular-svg-icons';



function BookmarkButton(props) {
  const [assetId] = useState(props.assetItem);
  const [load, setLoad] = useState(false);


  const handleSubmit = async (e, id) => {
    e.preventDefault();
    id = props.assetItem;
    const userForm = {
      assetId: id,
    };
    setLoad(true);
    console.log(userForm);
    await axios
      .post(`http://localhost:8000/api/bookmark`, userForm)
      .then((response) => {
        console.log(response);
        setLoad(false);
      })
      .catch((response) => {
        console.log("response");
        console.log(response);
        setLoad(false);
      });

      props.bookmark();
  };

  let loaderStyle = {
    color: "secondary",
  };

  var bookmarkIcon;
  props.bookmarkStyle.text == "add" ? bookmarkIcon=faBookmarkReg : 
  (props.bookmarkStyle.text == "remove" ? bookmarkIcon = faBookmark : bookmarkIcon=faBookmark)
 

  if (load) {
    var loaderBlock = <LoaderOnConfirm loaderStyle={loaderStyle}/>;
  } else if (!load) {
    // loaderBlock = props.bookmarkStyle.text;
    loaderBlock = (<FontAwesomeIcon icon={bookmarkIcon} size="1x"/>);
  }

  return (
   
    <Button
      variant= {props.bookmarkStyle.variant}
      onClick={(e) => {
        handleSubmit(e, assetId)
      }}  
      className="bookmarkBtn"
      style={props.bookmarkStyle}
      disabled={props.disabled}
    >
      {loaderBlock}
    </Button>
  );
}

export default BookmarkButton;
