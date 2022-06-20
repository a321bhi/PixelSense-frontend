import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react';
import './ImageCardModal.css';
function ImageCardModal(props){
   return <Modal
   size="xl"
        show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Title, Location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height:"70vh"}}>
      <img alt={"image"} className="imgModal"  src={props.source?props.source:""}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
}

export default ImageCardModal;