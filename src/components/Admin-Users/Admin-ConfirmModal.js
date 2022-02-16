import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { LoaderOnConfirm } from "../stylesheet/Loader";

function MyVerticallyCenteredModal(props) {
  const [load, setLoad] = useState(false);
  const userId = props.userId;
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.userId);

    await axios
      .delete(`http://ec2-52-64-193-116.ap-southeast-2.compute.amazonaws.com:8000/api/user/${userId}`)
      .then((response) => {
        console.log(response);
        setLoad(false);
        history.push("/AdminUserDashboard");
      })
      .catch(() => {
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

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={backDrop}
    >
      <Modal.Header closeButton className="modalForms">
        <Modal.Title id="contained-modal-title-vcenter">
          Restrict User
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Modal.Body>
          Are you sure you want to delete this users access? All account data
          will be deleted.
          <Form.Group>
            <Form.Label>
              <br />
              Confirmation:
            </Form.Label>
            <Form.Control
              rows={3}
              id="formFocus"
              className="my-1 p-3 rounded form-control form-control-md"
              name="address"
              type="text"
              placeholder="Type 'confirm' to delete"
              pattern="\b(confirm)\b"
              title="Type 'confirm'"
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

function ConfirmationModal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [userId] = React.useState(props.userId);

  return (
    <>
      <Link
        className="btn btn-lg add-asset-button"
        onClick={() => setModalShow(true)}
      >
        Delete User
      </Link>

      <MyVerticallyCenteredModal
        userId={userId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ConfirmationModal;
