import Modal from 'react-bootstrap/Modal';
import { timeSince } from '../../ConfigFiles/timeSince.js';
import React, { createRef, } from 'react';
import { useRef } from 'react';
import './ImageModal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart  as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import UserContext from '../Contexts/UserContext';
import { useContext, useState } from 'react';
import axios from 'axios';
import { userServiceUrl } from '../../ConfigFiles/Urls';
import CommentInputArea from './CommentInputArea';
import { likeComment,unlikeComment,likeImage,unlikeImage,deleteImage } from '../ApiRequests/ImageApi';
import LikedByModal from './LikedByModal';
import CommentComponent from './CommentComponent';
import MiniUserCard from './MiniUserCard.js';
import ThemeContext from '../Contexts/ThemeContext.js';
function ImageModal(props){
  let [likedByStateComment,setLikedByStateComment] = useState([]);
  let userCtx = useContext(UserContext);
  let [showLikedByModal, setShowLikedByModal] =useState(false);
  let [showLikedByModalComment, setShowLikedByModalComment] =useState(false);
  let [commentId,setCommentId] = useState("");
  let [editable, setEditable] = useState(false);
  let [textAreaClass, setTextAreaClass] = useState("");
let themeCtx = useContext(ThemeContext);
  const newCommentHandle = useRef();
  const [commentIdForReply,setCommentIdForReply] = useState("");
  const captionHandle = useRef();
  var date = new Date(props.imageData.mediaDate);
const arrOfRefs = useRef([]);
arrOfRefs.current = props.imageData.mediaComments.map((item,i)=>arrOfRefs.current[i]??createRef());
 function addComment(){
   let formData = new FormData();
   let commentContent = newCommentHandle.current.value;
   if(commentContent.length>0){
    formData.append("mediaId",props.imageData.mediaId)
    formData.append("commentContent",commentContent);
     axios.post(userServiceUrl+"/user/media-comment",formData,
       {
           headers:{"Authorization":userCtx.getToken()}
         }).then(res=>{props.updateOneImage(props.imageData.mediaId);newCommentHandle.current.value=""}).catch(err=>console.log(err)) 
   }}
 
   
   function updateDescription(){
    let text = captionHandle?.current?.innerHTML;
    let tags = [];
    if(text?.includes("#")){
       tags=text.match(/#[a-z]+/gi);
    }
 
    if(text!==props?.imageData?.mediaCaption){
        const payload = {mediaId:props?.imageData?.mediaId, mediaCaption:text,mediaTags:tags}
        axios.patch(userServiceUrl+"/user/media-caption",payload,
        {
            headers: { 
                "Authorization":userCtx.getToken(),
            }
        }).then(response=>{props.updateOneImage(props.imageData.mediaId);})
        .catch(err=>{
            console.log(err);
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
const updateOneImage =()=>{props.updateOneImage(props.imageData.mediaId);}
 function deleteComment(commentId){
    axios.delete(userServiceUrl+"/user/media-comment/"+commentId,
      {
          headers:{"Authorization":userCtx.getToken()}
        }).then(res=>{props.updateOneImage(props.imageData.mediaId)}).catch(err=>console.log(err)) 
  }
  function replyToComment(commentId,keyForHandle){
    let formData = new FormData();
    // console.log(arrOfRefs.current[keyForHandle].current.value+" "+keyForHandle)
    let commentContent = arrOfRefs.current[keyForHandle].current.value;

    if(commentContent.length>0){
     formData.append("commentId",commentId) 
     formData.append("commentContent",commentContent);
      axios.post(userServiceUrl+"/user/comment-reply",formData,
        {
            headers:{"Authorization":userCtx.getToken()}
          }).then(res=>{
            setCommentId(commentId);
              props.updateOneImage(props.imageData.mediaId);
              arrOfRefs.current[keyForHandle].current.value=""
            }).catch(err=>console.log(err)) 
    }}
    function deleteReplyToComment(commentId){
        axios.delete(userServiceUrl+"/user/comment-reply/"+commentId,
          {
              headers:{"Authorization":userCtx.getToken()}
            }).then(res=>{props.updateOneImage(props.imageData.mediaId)}).catch(err=>console.log(err)) 
      }
      let [showMoreCaption,setShowMoreCaption] = useState(false);
      let flipShowMoreCaption = ()=> setShowMoreCaption(!showMoreCaption)
    function getTrimmedCaption(caption){
      if(caption.length>100){
        if(showMoreCaption){
          return <div style={{fontSize:"18px"}}>{caption}<span style={{ backgroundColor:"yellowgreen"}} role="button" onClick={flipShowMoreCaption}> Show Less</span></div>
        }else{
          return <div style={{fontSize:"18px"}}>{caption.slice(0,100)}<span style={{backgroundColor:"yellowgreen"}} role="button" onClick={flipShowMoreCaption}> Show more</span></div>
        } 
      }
      return caption;
    }
  
   return props.showModal?<Modal
   className="bg-dark bg-opacity-75"
   size="xl"
        show={props.showModal}
        onHide={props.handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={"d-flex "+(themeCtx.darkMode?"bg-dark text-light":"")}>
      <div className="m-2"><MiniUserCard username={props.currentUser?userCtx.getUsername():props.mediaPostedBy}/></div>
      <div className="text-end pt-3 pe-3" style={{width:"100%"}}>
        <button className={"btn-close "+(themeCtx.darkMode?"bg-light":"")} type="button" aria-label="Close" onClick={props.handleClose}/>
      </div>
      </div>
      <Modal.Body className={"d-md-flex d-block "+(themeCtx.darkMode?"bg-dark text-light":"")} style={{width:"100%"}}> 
      <div className='p-3 custom-image-div' >
      <img alt={"image"} className="imgModal"  src={props.imageData?"data:image/jpg;base64,"+props.imageData.imageAsBase64:""}/>
      </div>
      
      <div className="p-3 custom-comments-div " >
        <div className=' d-flex'>
        {(props.imageData.likedBy?.includes(userCtx.getUsername()))?
          <FontAwesomeIcon role="button" icon={faHeartSolid} onClick={()=>{unlikeImage(props.imageData.mediaId, updateOneImage,userCtx);
            props.updateOneImage(props.imageData.mediaId);    
          }} size="2x"/>
          :<FontAwesomeIcon role="button" icon={faHeart} onClick={()=>{
            
            likeImage(props.imageData.mediaId,updateOneImage,userCtx);
            props.updateOneImage(props.imageData.mediaId);
          }} size="2x"/>
        }
        <div  className='ms-2' role="button" onClick={()=>setShowLikedByModal(!showLikedByModal)}>
       {props.imageData.likedBy?.length+" likes"}
       </div></div>
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
      <div style={{overflowY:"auto", height:"65vh"}}>
      <div 

          contentEditable={editable} 
          className={"fs-5"+textAreaClass}
          ref={captionHandle}
          >{props.imageData.mediaCaption?getTrimmedCaption(props.imageData.mediaCaption):""}
          </div>
          {editable?
          <div role="button" onClick={updateDescription} contentEditable={false} className='btn border float-end'>Update</div>
          :""}

      <div>{props.imageData.mediaTags?props.imageData.mediaTags.map((tag,i)=>{
       return <span key={i} className='text-primary'>{tag+" "}</span>
      }):""}</div>
      <div className={(themeCtx.darkMode?" text-light":" text-muted") }>{props.imageData.mediaDate?date.toTimeString().substring(0,9)+date.toDateString().substring(4):""}</div>
        

        <div className={"d-block "} >
        <div className='fs-5 ' >Comments</div>
          <div className="overflow-auto comments-section"  style={{height:"50vh"}}>
          {props.imageData.mediaComments?.length>0?
              <ul className={"list-group container "+(themeCtx.darkMode?" bg-dark text-light  ":"")}>
                    {props.imageData.mediaComments.map(
                    (item,i)=><li key={i} className={"list-group-item ms-1 d-flex row "+(themeCtx.darkMode?" bg-dark text-light border border-light":"")}>
                      <div className='col-10 col-md-11'>
                      <span className='fw-bold me-3 float-start'><MiniUserCard username={item.commentByUser}/></span>
                      {item.commentContent}
                      </div>
                      <div className='col-2 col-md-1'>
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
                    </div>
                    <div className='d-flex justify-content-between mt-2'>
                      
                    {
                        <div className={(themeCtx.darkMode?" text-light":" text-muted") }>
                          {timeSince(item.createdAt)}
                        </div>
                      }
                      {item.commentsOnComment?.length>0?
                          <div 
                            role="button" 
                            onClick={()=>commentId!=item.commentId?setCommentId(item.commentId):setCommentId("")}
                           >
                              {commentId===item.commentId?"Hide replies":"Show replies"}
                          </div>:""
                      }
                      {<div 
                      role="button" onClick={()=>commentIdForReply===item.commentId?setCommentIdForReply(""):setCommentIdForReply(item.commentId)}>Reply</div>}
           
              <div className={"d-flex "+(themeCtx.darkMode?" text-light":" text-muted") } >
                {  (item.commentLikedBy?.includes(userCtx.username))?
                   <FontAwesomeIcon role="button" icon={faHeartSolid} onClick={()=>{unlikeComment(item.commentId,updateOneImage,userCtx);}} size="2x"/>
                  :<FontAwesomeIcon role="button" icon={faHeart} onClick={()=>{likeComment(item.commentId,updateOneImage,userCtx);props.updateOneImage(props.imageData.mediaId)}} size="2x"/>
                }
                <div className='mx-1' role="button" onClick={()=>{setShowLikedByModalComment(!showLikedByModalComment);setLikedByStateComment(item.commentLikedBy);}}>
                  {item.commentLikedBy?item.commentLikedBy.length+" likes":"0"+" likes"}
                </div>
                <LikedByModal
        likedBy={likedByStateComment}
          show={showLikedByModalComment}
          onHide={() => setShowLikedByModalComment(false)}
        />
              </div>
              </div>
              {commentId===item.commentId?
                    <CommentComponent 
                      refreshData={props.refreshData} 
                      commentData={item.commentsOnComment}
                      deleteComment={deleteReplyToComment}
                      updateOneImage={()=>props.updateOneImage(props.imageData.mediaId)}
                      />
              :""}
                {commentIdForReply===item.commentId?
              <CommentInputArea 
              commentId={commentIdForReply} 
              addComment={replyToComment}
              keyForHandle={i}
              newCommentHandle={arrOfRefs.current[i]}/> :""
            }
                      </li>
                    )
                  }
              </ul>
          :""}
          </div>
          </div>
          </div>
          {/* <CommentInputArea commentId={commentIdForReply} addComment={replyToComment} newCommentHandle={replyToCommentHandle}/>  */}
        <CommentInputArea addComment={addComment} newCommentHandle={newCommentHandle}/>  
        </div>
        </Modal.Body>
        <LikedByModal
        likedBy={props.imageData.likedBy}
          show={showLikedByModal}
          onHide={() => setShowLikedByModal(false)}
        />
        
    </Modal>:""
}

export default ImageModal;