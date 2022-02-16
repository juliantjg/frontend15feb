import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { LoaderOnConfirm } from "../stylesheet/Loader";

function MyVerticallyCenteredModal(props) {
  const [message, setMessage] = useState({});
  const [load, setLoad] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [successId, setSuccessId] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userForm = {
      message: message,
    };

    await axios
      .post(`http://ec2-52-64-193-116.ap-southeast-2.compute.amazonaws.com:8000/api/notification/broadcast`, userForm)
      .then((response) => {
        setSuccessId("authSuccess");
        setErrorMsg(response.data.message);
        setLoad(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((response) => {
        setSuccessId("authFailed");
        setErrorMsg(response.data.message);
        setLoad(false);
      });
  };

  if (load) {
    var loaderBlock = <LoaderOnConfirm />;
    var backDrop = "static";
  } else if (!load) {
    loaderBlock = "Confirm";
    backDrop = true;
  }

  if (errorMsg) {
    var errorCodeBlock = (
      <small className="text-muted">
        <h6 id={successId}>{errorMsg}</h6>
      </small>
    );
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={backDrop}
    >
      <Modal.Header closeButton className="modalForms">
        <Modal.Title id="contained-modal-title-vcenter">
          Broadcast to Users
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Modal.Body>
          {errorCodeBlock}
          Send a message to all the users.
          <Form.Group>
            <Form.Label>
              <br />
              Message:
            </Form.Label>
            <Form.Control
              rows={3}
              id="formFocus"
              className="my-1 p-3 rounded form-control form-control-md"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              as="textarea"
              placeholder="Your message"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="feedBackBtn"
            id="submitBtn-standard"
            onClick={props.onHide}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="feedBackBtn"
            id="submitBtn-standard"
            value="Confirm"
          >
            {loaderBlock}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

function Broadcast(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Link
        className="btn btn-lg add-asset-button"
        onClick={() => setModalShow(true)}
      >
        Broadcast
      </Link>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Broadcast;
