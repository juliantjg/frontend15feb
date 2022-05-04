import React, { useState } from "react";
import axios from "axios";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import { Form, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

function MyVerticallyCenteredModal(props) {
  const [oldPassword, setOldPassword] = useState({});
  const [newPassword, setNewPassword] = useState({});
  const [c_newPassword, setC_newPassword] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const [successId, setSuccessId] = useState();
  const [load, setLoad] = useState(false);
  const [values, setValues] = React.useState({
    showPassword: false,
    /*  showPassword2: false,
    showPassword3: false, */
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  /* const handleClickShowPassword2 = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 });
  };
  const handleClickShowPassword3 = () => {
    setValues({ ...values, showPassword3: !values.showPassword3 });
  }; */

  /* const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  } */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userForm = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      c_newPassword: c_newPassword,
    };

    setLoad(true);
    await axios
      .post(
        `http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/user/changePasswordAuthenticated`,
        userForm
      )
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
        // console.log(error.response.data.message);
      });
  };

  if (load) {
    var loaderBlock = <LoaderOnConfirm />;
    var backDrop = "static";
  } else if (!load) {
    loaderBlock = "Reset";
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
    <Modal
      {...props}
      size="med"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={backDrop}
    >
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Modal.Header closeButton className="modalForms">
          <Modal.Title id="contained-modal-title-vcenter">
            Reset Passsword
          </Modal.Title>
        </Modal.Header>

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
            <Modal.Body>
              {errorCodeBlock}
              <Form.Group>
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type={values.showPassword ? "text" : "password"}
                  placeholder="Old Password"
                  id="formFocus"
                  name="oldPassword"
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                {/*   <div className="pwShow text-muted" onClick={handleClickShowPassword}>
                    {values.showPassword ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </div>  */}
              </Form.Group>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type={values.showPassword ? "text" : "password"}
                  placeholder="New Password"
                  id="formFocus"
                  name="newPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                {/*  <div className="pwShow text-muted" onClick={handleClickShowPassword2}>
                    {values.showPassword2 ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </div>  */}
              </Form.Group>
              <Form.Group /* className="position-relative d-inline-block w-100" */
              >
                <Form.Label>Confirm Password</Form.Label>

                <Form.Control
                  type={values.showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  id="formFocus"
                  name="c_newPassword"
                  onChange={(e) => setC_newPassword(e.target.value)}
                  required
                />
                {/* <p className="pwShow" onClick={handleClickShowPassword}>
              {values.showPassword ? "Hide" : "Show"}
            </p> */}
                {/*  <div className="pwShow text-muted" onClick={handleClickShowPassword3}>
                    {values.showPassword3 ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </div>  */}
                <Form.Check
                  className="pwShow-check mt-3"
                  type="switch"
                  label="Show Password"
                  id="custom-switch"
                  onClick={handleClickShowPassword}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button id="submitBtn-standard" onClick={props.onHide}>
                Cancel
              </Button>

              <Button type="submit" id="submitBtn-standard" value="Confirm">
                {loaderBlock}
              </Button>
            </Modal.Footer>
          </>
        )}
      </form>
    </Modal>
  );
}

function ResetPwModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        variant="primary"
        className="my-1 p-2 rounded form-control form-control-md"
        id="submitBtn"
        onClick={() => setModalShow(true)}
        block
      >
        Reset Password
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ResetPwModal;
