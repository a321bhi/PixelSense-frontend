import Modal from 'react-bootstrap/Modal';

import React, { useEffect } from 'react';
import { useRef } from 'react';
import './ImageModal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart  as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import UserContext from '../Contexts/UserContext';
import { useContext, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../ConfigFiles/Urls';
import CommentInputArea from './CommentInputArea';
import { likeComment,unlikeComment,likeImage,unlikeImage,deleteImage } from '../ApiRequests/ImageApi';
function ImageModal(props){
  let captionPlaceHolder="Add a caption...";
  let [editable, setEditable] = useState(false);
  let [textAreaClass, setTextAreaClass] = useState("");
  let userCtx = useContext(UserContext);
  const newCommentHandle = useRef();
  const captionHandle = useRef();
  var date = new Date(props.imageData.mediaDate);

 function addComment(){
   let formData = new FormData();
   let commentContent = newCommentHandle.current.value;
   if(commentContent.length>0){
    formData.append("mediaId",props.imageData.mediaId)
    formData.append("commentContent",commentContent);
     axios.post(baseUrl+"/media/comment",formData,
       {
           headers:{"Authorization":userCtx.getToken()}
         }).then(res=>{props.refreshData();newCommentHandle.current.value=""}).catch(err=>console.log(err)) 
   }}
   
   function updateDescription(){
    let text = captionHandle?.current?.innerHTML;
    let tags = [];
    if(text?.includes("#")){
       tags=text.match(/#[a-z]+/gi);
    }
 
    if(text!==props?.imageData?.mediaCaption){
        const payload = {mediaId:props?.imageData?.mediaId, mediaCaption:text,mediaTags:tags}
        axios.patch(baseUrl+"/media-caption",payload,
        {
            headers: { 
                "Authorization":userCtx.getToken(),
            }
        }).then(response=>{console.log(response);props.refreshData();})
        .catch(err=>{
            console.log(err);
            // setDescription(bioPlaceHolder);
          }
          );
          }
          toggleTextArea();
        }
 const toggleTextArea=()=>{
  if(!editable){
      setEditable(true);
      setTextAreaClass("fst-italic border");
  }else{
      setTextAreaClass("");
      setEditable(false);
  }
}
 function deleteComment(commentId){
  // let formData = new FormData();
  //  formData.append("commentId",commentId);
    axios.delete(baseUrl+"/media/comment/"+commentId,
      {
          headers:{"Authorization":userCtx.getToken()}
        }).then(res=>{props.refreshData()}).catch(err=>console.log(err)) 
  }

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
      <img alt={"image"} className="imgModal"  src={props.imageData?"data:image/jpg;base64,"+props.imageData.imageAsBase64:""}/>
      </div>
      
      <div className='p-3 custom-comments-div'>
        {(props.imageData.likedBy?.includes(userCtx.username))?
          <FontAwesomeIcon role="button" icon={faHeartSolid} onClick={()=>unlikeImage(props.imageData.mediaId,props.refreshData, userCtx)} size="2x"/>
          :<FontAwesomeIcon role="button" icon={faHeart} onClick={()=>likeImage(props.imageData.mediaId,props.refreshData, userCtx)} size="2x"/>
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
                  onClick={()=>{toggleTextArea()}}
                        // onClick={()=>{deleteImage(props.imageData.mediaId,props.refreshData, userCtx);props.handleClose();}} 
                        >Update Caption
                      </div>
                  </li> 
                  <li><div 
                  role="button"
                  className="dropdown-item"  
                        onClick={()=>{deleteImage(props.imageData.mediaId,props.refreshData, userCtx);props.handleClose();}} 
                        >Delete Image
                      </div>
                  </li>            
                </ul>
              </div>
              :""
          }
        </div>
      {/* <Modal.Footer className='d-block fs-5'> */}
      <div 
      
      style={{minHeight:"40px"}}
          contentEditable={editable} 
          className={"fs-5"+textAreaClass}
          ref={captionHandle}
          >{props.imageData.mediaCaption?props.imageData.mediaCaption:""}
          </div>
          {editable?
          <div role="button" onClick={updateDescription} contentEditable={false} className='btn border float-end'>Update</div>
          :""}

      <div>{props.imageData.mediaTags?props.imageData.mediaTags.map((tag,i)=>{
       return <span key={i} className='text-primary'>{tag+" "}</span>
      }):""}</div>
      <div className='text-muted'>{props.imageData.mediaDate?date.toTimeString().substring(0,9)+date.toDateString().substring(4):""}</div>
        

        <div className='d-block'>
        <div className='fs-5'>Comments</div>
          <div className='overflow-auto p-2' style={{maxHeight:"500px"}}>
          {props.imageData.mediaComments?.length>0?
              <ul className='list-group'>
              
                    {props.imageData.mediaComments.map(
                    (item,i)=><li key={i} className='list-group-item '>
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
              <div className="d-flex text-muted">
                {  (item.commentLikedBy?.includes(userCtx.username))?
                   <FontAwesomeIcon role="button" icon={faHeartSolid} onClick={()=>unlikeComment(item.commentId,props.refreshData, userCtx)} size="2x"/>
                  :<FontAwesomeIcon role="button" icon={faHeart} onClick={()=>likeComment(item.commentId,props.refreshData, userCtx)} size="2x"/>
                }
                <div className='mx-1'>
                  {item.commentLikedBy?item.commentLikedBy.length+" likes":"0"+" likes"}
                </div>
              </div>
                      </li>
                    )
                  }
              </ul>
          :""}
          </div>
        <CommentInputArea addComment={addComment} newCommentHandle={newCommentHandle}/>  
        </div>
        </div>
        </Modal.Body>
    </Modal>:""
}

export default ImageModal;