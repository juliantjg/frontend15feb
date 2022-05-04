import React, { useState } from "react";
import axios from "axios";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import { Form, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

function CenteredFeedbackModal(props) {
  const [area, setArea] = useState({});
  const [description, setDescription] = useState({});
  const [load, setLoad] = useState(false);
  const [successId, setSuccessId] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userForm = {
      area: area,
      description: description,
    };

    setLoad(true);
    await axios
      .post(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/feedback`, userForm)
      .then((response) => {
        setSuccessId("authSuccess");
        setLoad(false);
        setErrorMsg(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        setSuccessId("authFailed");
        setErrorMsg(error.response.data.message);
        setLoad(false);
      });
  };
  if (load) {
    var loaderBlock = <LoaderOnConfirm />;
    var backDrop = "static";
  } else if (!load) {
    loaderBlock = "Submit";
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
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={backDrop}
      /* centered */
    >
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {successId == "authSuccess" ? (
          <div className="text-center">
            <FontAwesomeIcon
              id="authSuccess"
              icon={faCheckCircle}
              size="3x"
              className="mb-4"
            />
            <span>{errorCodeBlock}</span>
          </div>
        ) : (
          <>
            <Modal.Header closeButton className="modalForms">
              <Modal.Title id="contained-modal-title-vcenter">
                Help us improve <b>silc.</b>co
              </Modal.Title>
              <br />
            </Modal.Header>

            <Modal.Body>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Which area needs improvement?</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="feedbackOptions"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                >
                  <option value="">Choose as Area</option>
                  <option value="Investment Prortfolio">
                    Investment Prortfolio
                  </option>
                  <option value="Asset Management">Asset Management</option>
                  <option value="Marketplace">Marketplace</option>
                  <option value="My Profile">My Profile</option>
                  <option value="Others">Others</option>
                </Form.Control>
              </Form.Group>

              <Form.Group /* controlId="exampleForm.ControlTextarea1" */>
                <Form.Label>Details:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="formFocus"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe"
                />
              </Form.Group>
              <small className="text-muted">
                Let us know if you have ideas that can help make our products
                better.
              </small>
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
          </>
        )}
      </form>
    </Modal>
  );
}

function FeedbackModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <button
        // className="feedBackButton"
        className="my-1 p-2 rounded form-control form-control-md"
        id="submitBtn"
        variant="primary"
        onClick={() => setModalShow(true)}
        block
      >
        Feedback
      </button>
      <br />
      <CenteredFeedbackModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default FeedbackModal;
