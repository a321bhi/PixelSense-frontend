import './CardView.css';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart  as faHeartSolid, faComment} from '@fortawesome/free-solid-svg-icons';
import MiniUserCard from './MiniUserCard';
import { likeImage,unlikeImage } from '../ApiRequests/ImageApi';
import LikedByModal from './LikedByModal';
import ThemeContext from '../Contexts/ThemeContext';
function CardView(props){
  let themeCtx = useContext(ThemeContext)
  const userCtx = useContext(UserContext);
  let [imageLoaded, setImageLoadedState] = useState(false);
  let [spinnerClasses,setSpinnerClasses] = useState("d-block mx-auto mt-3");
  let [imgClasses,setImgClasses] = useState("d-none");
  let [showLikedByModal, setShowLikedByModal] =useState(false);
  const updateOneImage =()=>{props.updateOneImage(props.imageData.mediaId);}
useEffect(()=>{
if(imageLoaded){
  setSpinnerClasses("d-none");
  setImgClasses("imgclass");
}
},[imageLoaded]);
function getCommentCount(){
  let totalComments= props.imageData.mediaComments.length;
  props.imageData.mediaComments.forEach(current =>totalComments+=(current.commentsOnComment===undefined?0:current.commentsOnComment.length));
  return totalComments;
}

return (
  <div className={"col "+(themeCtx.darkMode?" bg-dark text-light ":"")}>
<div className="card border-0" style={(themeCtx.darkMode?
{boxShadow: "1px 1px 4px 4px rgba(255,255,255,0.4)"}:
{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"})}>
{/* <div className={"img-counters "+(themeCtx.darkMode?" text-dark":" text-light")} 
style={(themeCtx.darkMode?{backgroundColor:"rgba(255, 255,255, 0.4)"}:{backgroundColor:"rgba(0, 0, 0, 0.4)"})} role="button" onClick={props.handleShow}>
<div className="counters fs-5">
{props.imageData.likedBy?.length} <FontAwesomeIcon style={(themeCtx.darkMode?{color:"black"}:{color:"white"})}  icon={faHeartSolid} size="2x"/>
&ensp;{getCommentCount()} <FontAwesomeIcon style={(themeCtx.darkMode?{color:"black"}:{color:"white"})}  icon={faComment} size="2x"/></div>
</div> */}
              <div className={"card-body "+(themeCtx.darkMode?"bg-dark text-light":"")} style={{minHeight:"20vh"}}>
                <h5 className="card-title">{props.currentUser||props.profilePage?"":<MiniUserCard source={props.imageData.profilePicOfUsernamePostedByBase64} username={props.imageData.usernamePostedBy} >Hello</MiniUserCard>}</h5>
                <div className={spinnerClasses} style={{height:"40px",width:"40px"}} role="status">
                </div>
                <Spinner className={spinnerClasses} animation="border" role="status">
                </Spinner>
                <img className={imgClasses} 
                onLoad={()=>setImageLoadedState(true)} 
                src={"data:image/jpg;base64,"+props.imageData.imageAsBase64} 
                role="button" onClick={props.handleShow}/>
                

                {/* Footer start  */}
              <div className="card-footer d-flex text-muted ">
                {  (props.imageData.likedBy?.includes(userCtx.username))?
                   <FontAwesomeIcon style={(themeCtx.darkMode?{color:"white"}:{})} role="button" icon={faHeartSolid} onClick={()=>unlikeImage(props.imageData.mediaId,updateOneImage, userCtx)} size="2x"/>
                  :<FontAwesomeIcon style={(themeCtx.darkMode?{color:"white"}:{})} role="button" icon={faHeart} onClick={()=>likeImage(props.imageData.mediaId,updateOneImage, userCtx)} size="2x"/>
                }
                <div className='mx-1' role="button" onClick={()=>setShowLikedByModal(!showLikedByModal)}>
                  {props.imageData.likedBy?.length}
                </div>
                &emsp;
                <FontAwesomeIcon 
                 role="button" onClick={props.handleShow}
                style={(themeCtx.darkMode?{color:"white"}:{})}  icon={faComment} size="2x"/>
                <div className='mx-2'
                 role="button" onClick={props.handleShow}>
                
                  {getCommentCount()}
                </div>
              </div>


              {/* Footer end */}
              </div>
        </div>
        <LikedByModal
        likedBy={props.imageData.likedBy}
          show={showLikedByModal}
          onHide={() => setShowLikedByModal(false)}
        />
        </div>
);
}
export default CardView;