import React from "react";
import { Modal, Row, Col, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import AssetItem from "../Assets/AssetItem";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      dialogClassName="bookmarkModal"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton className="modalForms">
        <Modal.Title id="contained-modal-title-vcenter">Watch List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {props.allData.map((assetItem) => (
            <Col key={assetItem.id} sm={12} md={6} lg={3} xl={3}>
              {(() => {
                assetItem.id = assetItem.assetId;
              })()}
              <AssetItem asset={assetItem} />
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
}

function AssetBookmark(props) {
  const [modalShow, setModalShow] = React.useState(false);

  // useEffect(async () => {
  //   await axios
  //     .get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/bookmarks`)
  //     .then((response) => {
  //       setAllData(response.data.data);
  //       console.log(response.data.data);
  //     });
  // }, [modalShow]);

  function handleUpdate() {
    /*  setModalShow(true); */
    if (props.allData.length < 1) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  }

  return (
    <>
      <button className="bookmarkIcon" onClick={handleUpdate}>
        <FontAwesomeIcon icon={faBookmark} size="lg" id="dropIcon" />
        <Badge className="bookmarkCountBadge">{props.allData.length}</Badge>
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        allData={props.allData}
      />
    </>
  );
}

export default AssetBookmark;
