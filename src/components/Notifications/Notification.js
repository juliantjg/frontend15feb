import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, NavDropdown, Badge } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  const [notifs, setNotif] = useState({});
  const id = props.id;

  useEffect(async () => {
    if (props.show) {
      await axios
        .get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/notification/showOne/${id}`)
        .then((response) => {
          setNotif(response.data.data);
          // console.log("called")
        });
    }
  }, [props.show]);

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton className="modalForms">
        <Modal.Title id="contained-modal-title-vcenter">
          {notifs.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Header className="border-0 pb-0">
        {" "}
        <div className="float-left">
          <small className="text-muted ">
            From: <strong>{notifs.from}</strong>
          </small>
        </div>
        <div className="float-right">
          <small className="text-muted ">
            <strong>{notifs.created_at_formatted}</strong>
          </small>
        </div>
      </Modal.Header>
      <Modal.Body>{notifs.content}</Modal.Body>
    </Modal>
  );
}

function Notification(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <NavDropdown.Item
        onClick={() => setModalShow(true)}
        key={props.id}
        sm={12}
        md={6}
        lg={3}
        xl={3}
        className={props.status == "read" ? "" : "notifStatus"}
      >
        {props.status == "read" ? (
          ""
        ) : (
          <Badge className="unreadNotif">
            <span className="invisible">.</span>
          </Badge>
        )}

        <small className="dark-text">
          <strong> {props.title}</strong>
          <p className="mt-2"> {props.content}</p>
          <p className="text-muted">{props.created_at}</p>
        </small>
      </NavDropdown.Item>
      <NavDropdown.Divider />

      <MyVerticallyCenteredModal
        id={props.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Notification;
