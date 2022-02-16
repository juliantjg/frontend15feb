import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { LoaderOnConfirm } from "../stylesheet/Loader";

function MyVerticallyCenteredModal(props) {
  const history = useHistory();
  const [address, setAddress] = useState({});
  const [contact, setContact] = useState({});
  const [name, setName] = useState({});
  const [am, setAm] = useState({});
  const [amBoolean, setAmBoolean] = useState(false);
  const [amBoolean2, setAmBoolean2] = useState(false);
  const [inv, setInvestor] = useState({});
  const [invBoolean, setInvestorBoolean] = useState(false);
  const [invBoolean2, setInvestorBoolean2] = useState(false);
  const [load, setLoad] = useState(false);
  const userId = props.userId;
  const [errorMsg, setErrorMsg] = useState({});

  useEffect(async () => {
    await axios
      .get(`http://localhost:8000/api/user/${userId}`)
      .then((response) => {
        setAddress(response.data.data.address);
        setContact(response.data.data.contact_no);
        setName(response.data.data.name);
        setAm(response.data.data.AM);
        setInvestor(response.data.data.investor);

        if (response.data.data.AM == 1) {
          setAmBoolean(true);
          setAmBoolean2(true);
        } else {
          setAmBoolean(false);
          setAmBoolean2(false);
        }

        if (response.data.data.investor == 1) {
          setInvestorBoolean(true);
          setInvestorBoolean2(true);
        } else {
          setInvestorBoolean(false);
          setInvestorBoolean2(false);
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.userId);

    const userForm = {
      name: name,
      address: address,
      contact_no: contact,
      userState: 2,
      investor: inv,
      AM: am,
    };

    setLoad(true);

    await axios
      .put(`http://localhost:8000/api/user/${userId}`, userForm)
      .then((response) => {
        console.log(response);
        /* console.log("this is user type: " + investorType); */
        setLoad(false);
        history.push("/AdminUserDashboard");
      })
      .catch((response) => {
        setLoad(false);
        setErrorMsg(response);
      });
  };

  if (load) {
    var loaderBlock = <LoaderOnConfirm />;
    var backDrop = "static";
  } else if (!load) {
    loaderBlock = "Confirm";
    backDrop = true;
  }

  function handleInputChangeAm(event) {
    if (event.target.checked) {
      setAm(1);
      setAmBoolean(!amBoolean);
    } else {
      setAm(0);
      setAmBoolean(!amBoolean);
    }
  }

  function handleInputChangeInv(event) {
    if (event.target.checked) {
      setInvestor(1);
      setInvestorBoolean(!invBoolean);
    } else {
      setInvestor(0);
      setInvestorBoolean(!invBoolean);
    }
  }

  if (errorMsg.message) {
    var errorCodeBlock = (
      <small className="text-muted">
        <p id="authFailed">{errorMsg.message}</p>
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
          Verify User
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Modal.Body>
          {errorCodeBlock}
          <Form.Label>User Role</Form.Label>
          <Form.Group controlId="formBasicCheckbox">
            <div key={`inline-checkbox`} className="mb-3">
              <div>
                <Form.Check
                  inline
                  type="switch"
                  name="AM"
                  id={`inline-checkbox-1`}
                  className="admin-verifyUserModalCheck"
                  label="Asset Manager"
                  onChange={handleInputChangeAm}
                  checked={amBoolean}
                  disabled={amBoolean2}
                />
                <Form.Check
                  inline
                  type="switch"
                  name="Inv"
                  id={`inline-checkbox-2`}
                  className="admin-verifyUserModalCheck"
                  label="Investor"
                  onChange={handleInputChangeInv}
                  checked={invBoolean}
                  disabled={invBoolean2}
                />
              </div>
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              className="my-1 p-3 rounded form-control form-control-md"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              id="formFocus"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contact:</Form.Label>
            <Form.Control
              className="my-1 p-3 rounded form-control form-control-md"
              type="number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder=""
              id="formFocus"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              rows={3}
              id="formFocus"
              className="my-1 p-3 rounded form-control form-control-md"
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder=""
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

function VerifyUserModal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [userId] = React.useState(props.userId);

  return (
    <>
      <Link
        className="btn btn-lg add-asset-button"
        onClick={() => setModalShow(true)}
      >
        Verify User
      </Link>

      <MyVerticallyCenteredModal
        userId={userId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
export default VerifyUserModal;
