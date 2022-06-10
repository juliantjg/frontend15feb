import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import {LoaderOnConfirm} from "../stylesheet/Loader";

function MyVerticallyCenteredModal(props) {
  var amount2 = props.amount;
  var [amount, setInvAmount] = useState(amount2);
  const [id] = useState({});
  const [load, setLoad] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userForm = {
      amount: amount,
      id: id,
      status: 1,

    };

    setLoad(true);

    await axios
      .put(`http://ec2-52-64-254-219.ap-southeast-2.compute.amazonaws.com:8000/api/investment/${props.id}`, userForm)
      .then((response) => {
        console.log(response);
        setLoad(false);
        window.location.reload();
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
      <Modal.Header closeButton className="modalForms">
        <Modal.Title id="contained-modal-title-vcenter">
          Approve Investments
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Modal.Body>
          
          <Form.Group>
            <Form.Label>Investment number:</Form.Label>
            <Form.Control
              className="my-1 p-3 rounded form-control form-control-md"
              type="number"
              value={props.id}
              id="formFocus"
              name="id"
              required
              disabled
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              rows={3}
              id="formFocus"
              className="my-1 p-3 rounded form-control form-control-md"
              name="amount"
              type="number"
              value={amount}
              onChange={(e) => setInvAmount(e.target.value)}
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

function VerifyInvModal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  if(props.status == 1){
    var invStatus = "Update"
  }else{
    invStatus = "Approve"
  }
  return (
    <>
      <Button
        variant="primary"
        className="btn btn-primary"
        size="sm"
        onClick={() => setModalShow(true)}
      >
       {invStatus}
      </Button>
      

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={props.id}
        amount={props.amount}
      />
    </>
  );
}
export default VerifyInvModal;
