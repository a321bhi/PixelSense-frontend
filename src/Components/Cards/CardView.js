import './CardView.css';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart  as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import MiniUserCard from './MiniUserCard';
import { likeImage,unlikeImage } from '../ApiRequests/ImageApi';
function CardView(props){

  const userCtx = useContext(UserContext);
  let [imageLoaded, setImageLoadedState] = useState(false);
  let [spinnerClasses,setSpinnerClasses] = useState("d-block mx-auto mt-3");
  let [imgClasses,setImgClasses] = useState("d-none");

useEffect(()=>{
if(imageLoaded){
  setSpinnerClasses("d-none");
  setImgClasses("imgclass");
}
},[imageLoaded]);

return (
  <div className="col g-3">
<div className="card vh-25">
              <div className="card-body" style={{minHeight:"20vh"}}>
                <h5 className="card-title">{props.currentUser||props.profilePage?"":<MiniUserCard source={props.imageData.profilePicOfUsernamePostedByBase64} username={props.imageData.usernamePostedBy} >Hello</MiniUserCard>}</h5>
                <div className={spinnerClasses} style={{height:"40px",width:"40px"}} role="status">
                </div>
                <Spinner className={spinnerClasses} animation="border" role="status">
                </Spinner>
                <img className={imgClasses} 
                onLoad={()=>setImageLoadedState(true)} 
                src={"data:image/jpg;base64,"+props.imageData.imageAsBase64} 
                role="button" onClick={props.handleShow}/>
    
              <div className="card-footer d-flex text-muted">
                {  (props.imageData.likedBy?.includes(userCtx.username))?
                   <FontAwesomeIcon role="button" icon={faHeartSolid} onClick={()=>unlikeImage(props.imageData.mediaId,props.refreshData, userCtx)} size="2x"/>
                  :<FontAwesomeIcon role="button" icon={faHeart} onClick={()=>likeImage(props.imageData.mediaId,props.refreshData, userCtx)} size="2x"/>
                }
                <div className='mx-1'>
                  {props.imageData.likedBy?.length+" likes"}
                </div>
              </div>
              </div>
        </div>
        </div>
);
}
export default CardView;