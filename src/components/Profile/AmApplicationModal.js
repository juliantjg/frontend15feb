import React, { useState } from "react";
import axios from "axios";
import { Modal, Card, Form, Button } from "react-bootstrap";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

function MyVerticallyCenteredModal(props) {
  const [query, setQuery] = useState({});
  const [load, setLoad] = useState(false);
  const [successId, setSuccessId] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userForm = {
      query: query,
    };

    setLoad(true);
    await axios
      .post(`http://localhost:8000/api/requestRole`, userForm)
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
        // setErrorMsg(error.response.data.message);
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

  let verifiedAm = localStorage.getItem("scopes").includes("AM");
  const verifiedMsg = (
    <small>
      <b>Your are already verified as an Asset Manager.</b>
    </small>
  );

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
                Expression of Interest
              </Modal.Title>
              <br />
            </Modal.Header>

            <Modal.Body>
              {verifiedAm ? verifiedMsg : ""}
              <Form.Group>
                <Form.Label>Query:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="formFocus"
                  name="description"
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={verifiedAm ? true : false}
                  placeholder="Your question..."
                  required
                />
              </Form.Group>
              <small className="text-muted">
                We will be in touch with you shortly.
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
              {verifiedAm ? (
                ""
              ) : (
                <Button
                  type="submit"
                  className="feedBackBtn"
                  id="submitBtn-standard"
                  value="Confirm"
                >
                  {loaderBlock}
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </form>
    </Modal>
  );
}

function AmApplicationModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Card
        id="propertyTypeCard"
        className="my-2"
        onClick={() => setModalShow(true)}
      >
        <label className="propertyTypeRadioDiv">
          <div className="my-3">
            <FontAwesomeIcon
              id="formIcons"
              icon={faChartBar}
              style={{ color: "#282c35" }}
            />
            <h6>Become an Asset Manager</h6>
          </div>
        </label>
      </Card>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default AmApplicationModal;
