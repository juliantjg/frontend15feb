import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import {LoaderOnConfirm} from "../stylesheet/Loader";

function MyVerticallyCenteredModal(props) {
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState({});
  const groupId = props.groupId;
  const [errorMsg, setErrorMsg] = useState();
  const [successId, setSuccessId] = useState();
  const [emails, setEmails] = useState([]);


  useEffect(async () => {
    await axios
      .get(`http://localhost:8000/api/userEmails/${groupId}`)
      .then((response) => {
        setEmails(response.data.data);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.groupId);
    const userForm = {
        groupId: groupId,
        user: user,
     };
    
    setLoad(true);
    await axios
      .post(`http://localhost:8000/api/groups/addUser` , userForm)
      .then((response) => {
        setSuccessId("authSuccess");
        setErrorMsg(response.data.message);
        setLoad(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        setSuccessId("authFailed");
        setErrorMsg(error.response.data.message);
        console.log(userForm);
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

  if (errorMsg) {
    var errorCodeBlock = (
      <small className="text-muted">
        <h6 id={successId}>{errorMsg}</h6>
      </small>
    );
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" backdrop={backDrop}>
      <Modal.Header closeButton className="modalForms">
        <Modal.Title id="contained-modal-title-vcenter">
          Add User
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Modal.Body>
        <span>{errorCodeBlock}</span>
          Enter the email of the user you would like to add to this group.
          <Form.Group>
            <Form.Label><br/>Email:</Form.Label>
            <Form.Control
                  as="select"
                  name="emails"
                  onChange={(e) => setUser(e.target.value)}
                  required
                >
                <option value="">Select</option>
                 {emails.map((email) => (  
                <option value={email}>{email}</option>                  
                  ))} 
             
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

function AdminAddUser(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [groupId] = React.useState(props.groupId);

  return (
    <>
      <Link
        
        className="btn btn-lg add-asset-button"
        onClick={() => setModalShow(true)}
      >
        Add User
      </Link>

      <MyVerticallyCenteredModal
        groupId={groupId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default AdminAddUser;
