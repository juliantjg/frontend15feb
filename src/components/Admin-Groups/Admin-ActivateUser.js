import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { LoaderOnConfirm } from "../stylesheet/Loader";

function ActivateUser(props) {
  const [load, setLoad] = useState(false);
  const userId = props.userId;
  const groupId = props.groupId;
  let status = "";

  if (props.status == "active") {
    status = "inactive";
  } else {
    status = "active";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.userId);
    const userForm = {
      userId: userId,
      groupId: groupId,
      status: status,
    };

    await axios
      .patch(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/groupMemberStatus`, userForm)
      .then((response) => {
        console.log(response);
        setLoad(false);
        window.location.reload();
      })
      .catch(() => {
        setLoad(false);
      });
  };

  if (load) {
    var loaderBlock = <LoaderOnConfirm />;
    var backDrop = "static";
  } else if (!load) {
    loaderBlock = props.status;
    backDrop = true;
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Button
          type="submit"
          variant={props.status == "active" ? ("primary"):("secondary")}
          className="btn btn-primary"
          size="sm"
          userId={userId}
        >
          {loaderBlock}
        </Button>
      </form>
    </>
  );
}

export default ActivateUser;
