import React from "react";
import { Modal, ResponsiveEmbed, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton className="modalForms">
        <Modal.Title id="contained-modal-title-vcenter">
          KYC and Introductory Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ width: "100%", height: "100%", border: "0px" }}>
          <ResponsiveEmbed aspectRatio="4by3">
            <embed
              type="image/svg+xml"
              src="//thesilcgroup.snapforms.com.au/form/QJKSHAOc4W"
            />
          </ResponsiveEmbed>
        </div>
        <br />
      </Modal.Body>
    </Modal>
  );
}

function SelectEntityModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Card id="propertyTypeCard" className="my-2"  onClick={() => setModalShow(true)}>
                  <label className="propertyTypeRadioDiv">
                    <div className="my-3">
                      <FontAwesomeIcon
                        id="formIcons"
                        icon={faTasks}
                        style={{ color: "#282c35" }}
                       
                      />
                      <h6>Become an Investor</h6>
                    </div>
                  </label>
                </Card>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default SelectEntityModal;
