import Modal from 'react-bootstrap/Modal';

import React, { useEffect } from 'react';
import { useRef } from 'react';
import './ImageModal.css';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart  as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { baseUrl } from '../../ConfigFiles/Urls';
function ImageModal(props){
  var date = new Date(props.imageData.mediaDate);
 function addComment(){
   let formData = new FormData();
   let commentContent = newCommentHandle.current.value;
   if(commentContent.length>0){
    formData.append("mediaId",props.imageData.mediaId)
    formData.append("commentContent",commentContent);
     axios.post(baseUrl+"/media/commentOnMedia",formData,
       {
           headers:{"Authorization":userCtx.token}
         }).then(res=>{console.log(res);props.fetchProfile();newCommentHandle.current.value=""}).catch(err=>console.log(err)) 
   }
   
 }
 function deleteComment(commentId){
  let formData = new FormData();
   formData.append("commentId",commentId);
    axios.post(baseUrl+"/media/deleteComment",formData,
      {
          headers:{"Authorization":userCtx.token}
        }).then(res=>{console.log(res);props.fetchProfile()}).catch(err=>console.log(err)) 
  }
//  useEffect(()=>{
  // props?.imageData?.mediaComments?.sort((row1,row2)=>{
  //   var date1 = new Date(row1.createdAt);
  //   var date2 = new Date(row2.createdAt);
  //   return date1.getTime()-date2.getTime();
  // });
  // props?.imageData?.mediaComments?.map((row)=>{
  //   var date = new Date(row.createdAt);
  //   row.createdAt = date.toTimeString().substring(0,9)+date.toDateString().substring(4);
  //   return row;
  // });
//  },[props]);
  let userCtx = useContext(UserContext);
  const newCommentHandle = useRef()
  // let element= document.getElementsByClassName('.modal-backdrop')

   return props.showModal?<Modal
   size="xl"
        show={props.showModal}
        onHide={props.handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="text-end pt-3 pe-3" style={{width:"100%"}}>
        <button type="button" className="btn-close" aria-label="Close" onClick={props.handleClose}/>
      </div>
      <Modal.Body className="d-md-flex d-block" style={{width:"100%"}}> 
      <div className='p-3 custom-image-div' >
      {/* Dont forget to re3place below lines */}
      {/* <img alt={"image"} className="imgModal"  src={props.imageData?"data:image/jpg;base64,"+props.imageData.imageAsBase64:""}/> */}
      <img alt={"image"} className="imgModal"  src={props.local?props.imageData.imageAsBase64:(props.imageData?"data:image/jpg;base64,"+props.imageData.imageAsBase64:"")}/>
      </div>
      
      <div className='p-3 custom-comments-div'>
        {(props.imageData.likedBy?.includes(userCtx.username))?
          <FontAwesomeIcon role="button" icon={faHeartSolid} onClick={()=>props.unlikeImage(props.imageData.mediaId)} size="2x"/>
          :<FontAwesomeIcon role="button" icon={faHeart} onClick={()=>props.likeImage(props.imageData.mediaId)} size="2x"/>
        }
       {props.imageData.likedBy?.length+" likes"}
       <div className='float-end'>
          {props.currentUser?
          <div className="btn-group">
                <div type="button" id="editImage" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                  <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                </div>
                <ul className="dropdown-menu" aria-labelledby="editImage">
                  <li><div 
                  role="button"
                  className="dropdown-item"  
                        onClick={()=>{props.deleteUserImage(props.imageData.mediaId);props.handleClose();}} 
                        >Delete Image
                      </div>
                  </li>            
                </ul>
              </div>
              :""
          }
        </div>
      {/* <Modal.Footer className='d-block fs-5'> */}
      <div>{props.imageData.mediaCaption?props.imageData.mediaCaption:""}</div>
      <div>{props.imageData.mediaTags?props.imageData.mediaTags.map(tag=>{
       return <span className='text-primary'>{"#"+tag+" "}</span>
      }):""}</div>
      <div className='text-muted'>{props.imageData.mediaDate?date.toTimeString().substring(0,9)+date.toDateString().substring(4):""}</div>
        

        <div className='d-block'>
        <div className='fs-5'>Comments</div>
          <div className='overflow-auto p-2' style={{maxHeight:"500px"}}>
          {props.imageData.mediaComments?.length>0?
              <ul className='list-group'>
              
                    {props.imageData.mediaComments.map(
                    item=><li className='list-group-item '>
                      <span className='fw-bold me-3'>{item.commentByUser.userName}</span>
                      {item.commentContent}
                      {item.commentByUser.userName===userCtx.username?
                          <div className="btn-group align-top float-end dropstart">
                            <div type="button" id="editImage" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                              <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                            </div>
                            <ul className="dropdown-menu text-center" aria-labelledby="editImage">
                                <li>
                                  <div 
                                    role="button"
                                    className="dropdown-item"  
                                    onClick={()=>deleteComment(item.commentId)}
                                  >Delete comment
                                  </div>
                                </li>              
                            </ul>
                          </div>

                      :""  
                      }
                      {
                        <div className='text-muted'>
                          {item.createdAt}
                        </div>
                      }
                      </li>
                    )
                  }
              </ul>
          :""}
          </div>
          <form action="" className="">
        <div className="my-3 form-floating  mx-auto d-flex">
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
            <FontAwesomeIcon className='ms-2' role="button" icon={faPaperPlane} onClick={addComment} size="2x"></FontAwesomeIcon>
        </div>
        </form>
  
        </div>
        </div>
        </Modal.Body>
    </Modal>:""
}

export default ImageModal;