import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

function CenteredFeedbackModal(props) {
  const [enqType, setEnqType] = useState({});
  const [description, setDescription] = useState({});
  const [assetId, setAssetId] = useState({});
  const [assetTitle, setAssetTitle] = useState({});
  const [successId, setSuccessId] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [assetOwnerId, setAssetOwnerId] = useState();
  const [invOwned, setInvOwned] = useState();
  const [load, setLoad] = useState(false);

  useEffect(async () => {
    setAssetId(props.asset.id);
    setAssetTitle(props.asset.assetTitle);
    setAssetOwnerId(props.asset.user_id);
    setInvOwned(props.asset.myInvestment);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userForm = {
      assetId: assetId,
      title: enqType,
      description: description,
    };

    setLoad(true);

    await axios
      .post(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/enquire`, userForm)
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

  //investor
  //after invest app for inv
  var scopes = localStorage.getItem("scopes");

  //AM and owns the asset
  if (
    (scopes == "AM" || scopes == "AM,investor") &&
    assetOwnerId == localStorage.getItem("id")
  ) {
    var options = (
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Enquiry Type:</Form.Label>
        <Form.Control
          required
          as="select"
          name="enqType"
          value={enqType}
          onChange={(e) => setEnqType(e.target.value)}
        >
          <option value="">Select One:</option>
          <option value="Am owned">Am owned</option>
          <option value="X">X</option>
          <option value="Y">Y</option>
        </Form.Control>
      </Form.Group>
    );
    //after invest app for inv
  } else if (
    (scopes == "investor" || scopes == "AM,investor") &&
    invOwned != null
  ) {
    options = (
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Investor Type:</Form.Label>
        <Form.Control
          required
          as="select"
          name="enqType"
          value={enqType}
          onChange={(e) => setEnqType(e.target.value)}
        >
          <option value="">Select One:</option>
          <option value="X">X</option>
          <option value="Y">Y</option>
          <option value="Invested">Invested</option>
        </Form.Control>
      </Form.Group>
    );
  } else if (
    (scopes == "investor" || scopes == "AM,investor") &&
    invOwned == ""
  ) {
    options = (
      <Form.Group controlId="exampleForm.ControlSelect3">
        <Form.Label>Investor Type:</Form.Label>
        <Form.Control
          required
          as="select"
          name="enqType"
          value={enqType}
          onChange={(e) => setEnqType(e.target.value)}
        >
          <option value="">Select One:</option>
          <option value="Investor general">Investor general</option>
          <option value="X">X</option>
          <option value="Y">Y</option>
        </Form.Control>
      </Form.Group>
    );
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={backDrop}
      // className="blurContent"
      // centered
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
                Enquire
              </Modal.Title>
              <br />
            </Modal.Header>
            <Modal.Body>
              {errorCodeBlock}
              <p>
                Your enquiry will in be in regards to <b>{assetTitle}</b>.
              </p>

              {options}
              <Form.Group>
                <Form.Label>Your query:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="formFocus"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="State your query..."
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
          </>
        )}
      </form>
    </Modal>
  );
}

function AssetEnqModal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [id] = React.useState(props.id);

  return (
    <>
      <Button
        variant="primary"
        className="btn btn-primary"
        id="submitBtn"
        onClick={() => setModalShow(true)}
      >
        Enquire with SILC
      </Button>
      <br />
      <CenteredFeedbackModal
        id={id}
        show={modalShow}
        asset={props.asset}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default AssetEnqModal;
