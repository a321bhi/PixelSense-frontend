import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import ModalDialog from 'react-bootstrap/ModalDialog'
import React from 'react';
import { useRef } from 'react';
import './ImageCardModal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart  as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';
function ImageCardModal(props){
let userCtx = useContext(UserContext);
  const newCommentHandle = useRef()
  // let element= document.getElementsByClassName('.modal-backdrop')
   return props.show?<Modal
   size="xl"
        show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalDialog size="xl" scrollable={true} >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Title, Location
        </Modal.Title>
        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onHide}/> */}
        <button type="button" className="btn-close" aria-label="Close" ref={props.closeRef} onClick={props.onHide}/>
      </Modal.Header>
      <Modal.Body style={{height:"70vh"}}> 
      {/* Dont forget to re3place below lines */}
      {/* <img alt={"image"} className="imgModal"  src={props.imageData?"data:image/jpg;base64,"+props.imageData.imageAsBase64:""}/> */}
      <img alt={"image"} className="imgModal"  src={props.local?props.imageData.imageAsBase64:(props.imageData?"data:image/jpg;base64,"+props.imageData.imageAsBase64:"")}/>
      </Modal.Body>
      <Modal.Footer className='d-block fs-5'>
        {(props.imageData.likedBy?.includes(userCtx.username))?
          <FontAwesomeIcon icon={faHeartSolid} onClick={()=>props.unlikeImage(props.imageData.mediaId)} size="2x"/>
          :<FontAwesomeIcon icon={faHeart} onClick={()=>props.likeImage(props.imageData.mediaId)} size="2x"/>
        }
       {props.imageData.likedBy?.length+" likes"}
        <div className='float-end'>
          {props.currentUserImage?<Button onClick={()=>props.deleteUserImage(props.imageData.mediaId)}>Delete</Button>:""}
          <Button onClick={props.onHide}>Close</Button>
        </div>
        <div className='d-block'>
          <div className='display-5'>Comments</div>
          <div className='overflow-auto' style={{maxHeight:"500px"}}>
          {[1,1,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,,1,1,1,1].map(item=><div>Hello</div>)}
          </div>
          <form action="" className="">
        <div className="my-3 form-floating  mx-auto">
            <input 
                type="text" 
                className="form-control" 
                id="addComment" 
                placeholder="Add a comment.." 
                name="addComment" 
                ref={newCommentHandle} 
                required
                />
            <label htmlFor="addComment">Add a comment</label>
        </div>
        </form>
        </div>
      </Modal.Footer>
      </ModalDialog>
    </Modal>:""
}

export default ImageCardModal;