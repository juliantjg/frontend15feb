import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import axios from "axios";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

function MyVerticallyCenteredModal(props) {
  const [assetId, setAssetId] = useState({});
  const [amount, setAmount] = useState({});
  const [reInv, setReInvData] = useState({});
  const [assetTitle, setAssetTitle] = useState({});
  const [load, setLoad] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [invTypes, setInvTypes] = useState([]);
  // const [temp, setTemp] = useState([]);
  const [successId, setSuccessId] = useState();

  useEffect(async () => {
    await axios
      .get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/asset/${props.id}`)
      .then((response) => {
        setAssetId(response.data.data.id);
        setReInvData(response.data.data.investorsData);
        setAssetTitle(response.data.data.assetTitle);
      });
  }, []);

  useEffect(async () => {
    await axios
      .get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/user/${localStorage.getItem("id")}`)
      .then((response) => {
        // setInvTypes(response.data.data.investorTypes);
        setInvTypes(response.data.data.groupName);
        // setTemp(response.data.data.investorTypes);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.id);

    const userForm = {
      assetId: assetId,
      amount: amount,
      // investorType: invTypes[0],
    };
    console.log("confirm inv");
    console.log(userForm);
    setLoad(true);

    await axios
      .post(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/investment`, userForm)
      .then((response) => {
        setSuccessId("authSuccess");
        // setErrorMsg(response.data.message);
        setLoad(false);
      })
      .catch((error) => {
        setSuccessId("authFailed");
        setLoad(false);
        setErrorMsg(error.response.data.message);
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

  // const copyInvTypes = [];

  /*  var mapObj = {
    australian_company: "Australian Company",
    individual: "Individual",
    company_trustee: "Company Trustee",
    individual_trustee: "Individual Trustee",
  };

  const formatOutput = (inputArray) => {
    const formattedOutput = []

  inputArray.map((invType) =>
  formattedOutput.push(
      invType.replace(
        /\b(?:australian_company|individual|company_trustee|individual_trustee)\b/gi,
        (matched) => mapObj[matched]
      )
    )
  );
  return formattedOutput;
  }

  const arrayToObj = (oldArray, newArray) => {
    var newObj = {};
    for (var i = 0; i < oldArray.length; i++) {
      var key = oldArray[i];
      var value = newArray[i];
      // newObj[oldArray[i]] = newObj[newArray[i]];
      newObj[key] = value;
    }
    return newObj;
  }; */

  // temp.map((invType) =>
  //   copyInvTypes.push(
  //     invType.replace(
  //       /\b(?:australian_company|individual|company_trustee|individual_trustee)\b/gi,
  //       (matched) => mapObj[matched]
  //     )
  //   )
  // );

  /*   const dropDownObject = arrayToObj(temp, formatOutput(temp));*/

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={backDrop}
    >
      <Modal.Header closeButton className="modalForms">
        <Modal.Title id="contained-modal-title-vcenter">
          Apply To Invest
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {successId == "authSuccess" ? (
          <div className="p-2">
            <h6 id="authSuccess" className="mt-2">
              <FontAwesomeIcon
                id="authSuccess"
                icon={faCheckCircle}
                size="sm"
              />{" "}
              Application submitted.
            </h6>
            <hr />
            <p>
              Asset invested in: <b>{assetTitle}</b>
            </p>
            <p>
              Investment Account: <b>{invTypes}</b>
            </p>
            <p>
              Amount invested: <b>${Number(amount).toLocaleString()}</b>
            </p>
            <small className="text-muted">
              Please note the verification process may take a couple of days and
              we'll be in touch soon.
            </small>

            <Modal.Footer>
              <Button
                className="feedBackBtn"
                id="submitBtn-standard"
                onClick={props.onHide}
              >
                Close
              </Button>
            </Modal.Footer>
          </div>
        ) : (
          <>
            <Modal.Body>
              {errorCodeBlock}
              <Badge variant="primary">Asset Id:{assetId}</Badge>
              <small><br/>You are about to invest in <b>{assetTitle}.</b><br/>
             This investment will be transacted from <b>{invTypes}</b> account.</small>
              {/* <Form.Group
                controlId="exampleForm.ControlSelect1"
                className="addField-animated"
              >
                <Form.Label>Investment Account:</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="investorType"
                  value={invTypes}
                  onChange={(e) => setInvTypes([e.target.value])}
                  required
                >
                  <option value="">Select One:</option>
                  

                  {Object.keys(dropDownObject).map((key, index) => (
                    <option value={Object.keys(dropDownObject)[index]}>
                      {Object.values(dropDownObject)[index]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
 */}
              <Form.Group className="mt-3">
                <Form.Label>Amount:</Form.Label>
                <Form.Control
                  rows={3}
                  id="formFocus"
                  className="my-1 p-3 rounded form-control form-control-md"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100000"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="I agree to invest this amount and confirm my application"
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
          </>
        )}
      </form>
    </Modal>
  );
}

function ApplyInvestModal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [id] = React.useState(props.id);
  const [reInv, setReInvData] = useState({});
  const [userId, setUserId] = useState({});
  const [totalInv, setTotalInv] = useState({});
  const [invGoal, setInvGoal] = useState({});

  useEffect(async () => {
    await axios
      .get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/asset/${props.id}`)
      .then((response) => {
        setReInvData(response.data.data.investorsData);
        setUserId(response.data.data.user_id);
        setTotalInv(response.data.data.totalInvestmentReceived);
        setInvGoal(response.data.data.investmentGoal);
      });
  }, []);

  const myId = localStorage.getItem("id");
  if (reInv.length == 0 && userId != myId && invGoal != totalInv) {
    var codeBlock = (
      <Button
        variant="primary"
        className="btn btn-primary"
        id="submitBtn"
        onClick={() => setModalShow(true)}
      >
        Apply to Invest
      </Button>
    );
  } else if (reInv.length > 0 && userId != myId && invGoal != totalInv) {
    codeBlock = (
      <Button
        variant="primary"
        className="btn btn-primary"
        id="submitBtn"
        onClick={() => setModalShow(true)}
      >
        Add More
      </Button>
    );
  }

  return (
    <>
      {codeBlock}

      <MyVerticallyCenteredModal
        id={id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
export default ApplyInvestModal;
