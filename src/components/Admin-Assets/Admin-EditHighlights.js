import React, { useState } from "react";
import { Modal, Button, Form, Popover, OverlayTrigger } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function EditHighights(props) {
  var amount2 = props.amount;
  var [amount, setInvAmount] = useState(amount2);
  const [id] = useState({});
  const [load, setLoad] = useState(false);
  //   const [modalShow, setModalShow] = React.useState(false);
  // const [id] = React.useState(props.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userForm = {
      amount: amount,
      id: id,
      status: 1,
    };

    setLoad(true);

    await axios
      .put(`http://localhost:8000/api/investment/${props.id}`, userForm)
      .then((response) => {
        console.log(response);
        setLoad(false);
        window.location.reload();
      })
      .catch(() => {
        setLoad(false);
      });
  };

  return (
    <>
      {/*  <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={props.id}
        amount={props.amount}
      /> */}
      <OverlayTrigger
        placement="left"
        trigger="click"
        rootClose
        overlay={
          <Popover id="popover-contained">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Edit Highlight:</Form.Label>
                  <Form.Control
                    className="my-1 p-3 rounded form-control form-control-md"
                    type="text"
                    id="formFocus"
                    name="id"
                    required
                    value={amount}
                    onChange={(e) => setInvAmount(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="feedBackBtn float-right mb-2"
                  id="submitBtn-standard"
                  value="Confirm"
                >
                  Update
                </Button>
              </Modal.Body>
            </form>
          </Popover>
        }
      >
        <FontAwesomeIcon
          // onClick={() => setModalShow(true)}
          icon={faPen}
          size="xs"
          className="float-right icon-main mb-4"
        />
      </OverlayTrigger>
    </>
  );
}
export default EditHighights;
