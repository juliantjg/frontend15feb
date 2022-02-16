import React, {useState, useEffect} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { withRouter} from 'react-router-dom';
import axios from "axios";
import { useHistory } from "react-router-dom";
import {LoaderOnConfirm} from "../stylesheet/Loader";



function MyVerticallyCenteredModal(props) {
     const [pullReason, setPullReason] = useState({});
     const [load, setLoad] = useState(false);
     const userId = props.userId;
     const history = useHistory();

    useEffect(async () => {
    await axios
      .get(`http://localhost:8000/api/admin/asset/${userId}`)
      .then((response) => {
        setPullReason(response.data.data.pullReason);
      });
  }, []); 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.userId);

    const userForm = {
     pullReason: pullReason,
      isVerified: "f",
    };

    setLoad(true);

    await axios
      .patch(`http://localhost:8000/api/asset/${userId}`, userForm)
      .then((response) => {
        console.log(response);
        console.log("this is asset verification: " + userId);
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

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" backdrop={backDrop}>
      <form  onSubmit={(e) => {
          handleSubmit(e);
        }}> 
        <Modal.Header closeButton className="modalForms">
          <Modal.Title id="contained-modal-title-vcenter">
            Reason for removal of the asset.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Reason:</Form.Label>
              <Form.Control 
              as="textarea" 
              rows={3} 
              id="formFocus"
              value={pullReason}
              onChange={(e) => setPullReason(e.target.value)}
              placeholder="State Reason"
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="feedBackBtn" id="submitBtn-standard" onClick={props.onHide}>
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

function PullAssetModal(props) {
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
        Pull from Marketplace
      </Button>

      <MyVerticallyCenteredModal
        userId={userId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default withRouter(PullAssetModal);
