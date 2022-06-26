import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react';
import './ImageCardModal.css';
function ImageCardModal(props){
  let element= document.getElementsByClassName('.modal-backdrop')
   return <Modal
   size="xl"
        show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Title, Location
        </Modal.Title>
        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onHide}/> */}
        <button type="button" className="btn-close" aria-label="Close" onClick={props.onHide}/>
      </Modal.Header>
      <Modal.Body style={{height:"70vh"}}>
      <img alt={"image"} className="imgModal"  src={props.source?props.source:""}/>
      </Modal.Body>
      <Modal.Footer>
        {props.currentUserImage?<Button onClick={props.deleteUserImage}>Delete</Button>:""}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
}

export default ImageCardModal;