import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { LoaderOnConfirm } from "../stylesheet/Loader";

function MyVerticallyCenteredModal(props) {
  const [groupName, setGroupName] = useState({});
  const [groupType, setGroupType] = useState({});
  const [street, setStreet] = useState({});
  const [suburb, setSuburb] = useState({});
  const [state, setState] = useState({});
  const [postcode, setPostcode] = useState({});
  const [contact, setContact] = useState({});
  const [email, setEmail] = useState({});
  const [accountName, setAccountName] = useState({});
  const [bsb, setBsb] = useState({});
  const [accountNumber, setAccountNumber] = useState({});
  const [abn, setAbn] = useState({});
  const [acn, setAcn] = useState({});
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userForm = {
      groupName: groupName,
      groupType: groupType,
      street: street,
      suburb: suburb,
      state: state,
      postcode: postcode,
      contact: contact,
      email: email,
      accountName: accountName,
      bsb: bsb,
      accountNumber: accountNumber,
      abn: abn,
      acn: acn,
    };

    setLoad(true);
    await axios
      .post(`http://ec2-52-64-254-219.ap-southeast-2.compute.amazonaws.com:8000/api/groups/create`, userForm)
      .then(() => {
        setLoad(false);
        window.location.reload();
        console.log("success");
        console.log(userForm);
      })
      .catch(() => {
        setLoad(false);
        console.log("fail");
        console.log(userForm);
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
      size="lg"
    >
      <Modal.Header closeButton className="modalForms">
        <Modal.Title id="contained-modal-title-vcenter">
          Create a New Group
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="addAssetFormLabels">
                Entity Type:
              </Form.Label>
              <Form.Control
                required
                as="select"
                name="groupType"
                id="formFocus"
                className="my-1 rounded form-control form-control-md"
                onChange={(e) => setGroupType(e.target.value)}
              >
                <option value="">Select One:</option>
                <option value="Company-Account">Company Account</option>
                <option value="Joint-Account">Joint Account</option>
                <option value="Trustee-Account">Trustee Account</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="addAssetFormLabels">Title:</Form.Label>
              <Form.Control
                rows={3}
                id="formFocus"
                className="my-1 p-3 rounded form-control form-control-md"
                name="groupName"
                type="text"
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="ABC Ltd"
              />
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label className="addAssetFormLabels">Street:</Form.Label>
            <Form.Control
              rows={3}
              id="formFocus"
              className="my-1 rounded form-control form-control-md"
              name="street"
              type="text"
              onChange={(e) => setStreet(e.target.value)}
              placeholder="123 Queen Street"
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="addAssetFormLabels">Suburb:</Form.Label>
              <Form.Control
                rows={3}
                id="formFocus"
                className="my-1 p-3 rounded form-control form-control-md"
                name="Suburb"
                type="text"
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="Melbourne"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="addAssetFormLabels">State:</Form.Label>
              <Form.Control
                as="select"
                name="state"
                id="formFocus"
                className="my-1 rounded form-control form-control-md"
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">State</option>
                <option value="ACT">ACT</option>
                <option value="NSW">NSW</option>
                <option value="NT">NT</option>
                <option value="QLD">QLD</option>
                <option value="SA">SA</option>
                <option value="VIC">VIC</option>
                <option value="TAS">TAS</option>
                <option value="WA">WA</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="addAssetFormLabels">Postcode:</Form.Label>
              <Form.Control
                rows={3}
                id="formFocus"
                className="my-1 p-3 rounded form-control form-control-md"
                name="postcode"
                type="number"
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="1011"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="addAssetFormLabels">
                Primary Contact:
              </Form.Label>
              <Form.Control
                rows={3}
                id="formFocus"
                className="my-1 p-3 rounded form-control form-control-md"
                name="contact"
                type="tel"
                onChange={(e) => setContact(e.target.value)}
                placeholder="+61412345678"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="addAssetFormLabels">Email:</Form.Label>
              <Form.Control
                rows={3}
                id="formFocus"
                className="my-1 p-3 rounded form-control form-control-md"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="am@outlook.com"
              />
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label className="addAssetFormLabels">
              Account Name:
            </Form.Label>
            <Form.Control
              rows={3}
              id="formFocus"
              className="my-1 p-3 rounded form-control form-control-md"
              name="accoutName"
              type="text"
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Conor McGregor"
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="addAssetFormLabels">BSB:</Form.Label>
              <Form.Control
                rows={3}
                id="formFocus"
                className="my-1 p-3 rounded form-control form-control-md"
                name="bsb"
                type="text"
                onChange={(e) => setBsb(e.target.value)}
                placeholder="061-994"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="addAssetFormLabels">
                Account Number:
              </Form.Label>
              <Form.Control
                rows={3}
                id="formFocus"
                className="my-1 p-3 rounded form-control form-control-md"
                name="accoutNumber"
                type="number"
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="12345678"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="addAssetFormLabels">ABN:</Form.Label>
              <Form.Control
                rows={3}
                id="formFocus"
                className="my-1 p-3 rounded form-control form-control-md"
                name="abn"
                type="number"
                onChange={(e) => setAbn(e.target.value)}
                placeholder="012345678910"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="addAssetFormLabels">ACN:</Form.Label>
              <Form.Control
                rows={3}
                id="formFocus"
                className="my-1 p-3 rounded form-control form-control-md"
                name="acn"
                type="number"
                onChange={(e) => setAcn(e.target.value)}
                placeholder="012345678"
              />
            </Form.Group>
          </Row>
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

function CreateGroupModal(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Link
        className="btn btn-lg add-asset-button"
        onClick={() => setModalShow(true)}
      >
        Create group
      </Link>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default CreateGroupModal;
