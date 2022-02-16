import React, { useState } from "react";
import {Toast} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimesCircle, faCheckCircle} from "@fortawesome/free-solid-svg-icons";

function ErrorToasts(props) {
    const [show, setShow] = useState(true);
    const [msg] = React.useState(props.errors);

  
    return (
        <div xs={6}>
          <Toast className="toast position-absolute m-4" style={{background: "#FFD2D2", color: "#D8000C", fontSize: "18px"}} onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Body> <FontAwesomeIcon id="icons" icon={faTimesCircle} />{msg}</Toast.Body>
          </Toast>
        </div>
    );
  }

  function SuccessToasts(props) {
    const [show, setShow] = useState(true);
    const [msg] = React.useState(props.errors);

  
    return (
        <div xs={6}>
          <Toast className="toast position-absolute m-4" style={{background: "#DFF2BF", color: "#4F8A10"}} onClose={() => setShow(false)} show={show} delay={5000} autohide>
            <Toast.Body> <FontAwesomeIcon id="icons" icon={faCheckCircle} />{msg}</Toast.Body>
          </Toast>
        </div>
    );
  }

  export {ErrorToasts, SuccessToasts};
