import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {LoaderOnConfirm} from "../stylesheet/Loader";


function MyVerticallyCenteredModal(props) {
  const history = useHistory();
  const [assetTitle, setAssetTitle] = useState({});
  const [location, setLocation] = useState({});
  const [investmentGoal, setInvestmentGoal] = useState({});
  const [investmentTerm, setInvestmentTerm] = useState({});
  const [formSubmitted, setFormSubmitted] = useState({});
  const [formBoolean, setFormBoolean] = useState(false);
  const [formBoolean2, setFormBoolean2] = useState(false);
  const [load, setLoad] = useState(false);
  const userId = props.userId;

  
  useEffect(async () => {
    await axios
      .get(`http://localhost:8000/api/admin/asset/${userId}`)
      .then((response) => {
        setAssetTitle(response.data.data.assetTitle);
        setLocation(response.data.data.location);
        setInvestmentGoal(response.data.data.investmentGoal);
        setInvestmentTerm(response.data.data.investmentTerm);
        setFormSubmitted(response.data.data.formSubmitted);
        
        console.log("form sub")
        console.log(response.data.data.formSubmitted);
        if (response.data.data.formSubmitted == 1) {
          setFormBoolean(true);
          setFormBoolean2(true);
        } else {
          setFormBoolean(false);
          setFormBoolean2(false);
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.userId);

    const userForm = {
      assetTitle: assetTitle,
      location: location,
      isVerified: "t",
      investmentGoal: investmentGoal,
      investmentTerm: investmentTerm,
      formSubmitted: formSubmitted,
    };

    setLoad(true);

    await axios
      .patch(`http://localhost:8000/api/asset/${userId}`, userForm)
      .then((response) => {
        console.log(response);
        console.log("this is asset verification: " + assetTitle);
        setLoad(false);
        history.push("/AdminAssetDashboard");
      })
      .catch(() => {
        setLoad(false);
      });
  };

  if (load) {
    var loaderBlock = (<LoaderOnConfirm/>);
    var backDrop = "static";
  } else if (!load) {
    loaderBlock = "Confirm";
    backDrop = true;
  }

  function handleInputFormSub(event) {
    if (event.target.checked) {
      setFormSubmitted(1);
      setFormBoolean(!formBoolean);
    } else {
      setFormSubmitted(0);
      setFormBoolean(!formBoolean);
    }
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" backdrop={backDrop}>
      <Modal.Header closeButton className="modalForms">
        <Modal.Title id="contained-modal-title-vcenter">
          Verify Asset
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              className="my-1 p-3 rounded form-control form-control-md"
              type="text"
              value={assetTitle}
              onChange={(e) => setAssetTitle(e.target.value)}
              placeholder=""
              id="formFocus"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Location:</Form.Label>
            <Form.Control
              rows={3}
              id="formFocus"
              className="my-1 p-3 rounded form-control form-control-md"
              name="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="123 SILC Rd, Melbourne Vic 4321"
            />
          </Form.Group>

          <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Investment Goal:</Form.Label>
            <Form.Control
              rows={3}
              id="formFocus"
              className="my-1 p-3 rounded form-control form-control-md"
              name="investmentGoal"
              type="number"
              value={investmentGoal}
              onChange={(e) => setInvestmentGoal(e.target.value)}
              placeholder=""
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Investment Term:</Form.Label>
            <Form.Control
              rows={3}
              id="formFocus"
              className="my-1 p-3 rounded form-control form-control-md"
              name="investmentTerm"
              type="number"
              value={investmentTerm}
              onChange={(e) => setInvestmentTerm(e.target.value)}
              placeholder=""
            />
          </Form.Group>
          </Row>

          <Form.Group id="formGridCheckbox">
          <Form.Control
                  className="admin-verifyUserModalCheck"
                  as="checkbox"
                  name="formSubmitted"
                  onChange={handleInputFormSub}
                >
                  <Form.Check
                    inline
                    label="Form requirements met"
                    name="formSubmitted"
                    type="checkbox"
                    id={`inline-checkbox-1`}
                    style={{marginLeft: "-10px"}}
                    checked={formBoolean}
                    disabled={formBoolean2}
                    required
                  />
                </Form.Control>
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

function VerifyAssetModal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [userId] = React.useState(props.userId);

  return (
    <>
      <Button
        variant="primary"
        className="btn btn-primary"
        id="submitBtn"
        onClick={() => setModalShow(true)}
      >
        Push to Marketplace
      </Button>

      <MyVerticallyCenteredModal
        userId={userId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
export default VerifyAssetModal;
