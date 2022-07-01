import './CardView.css';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart  as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import MiniUserCard from './MiniUserCard';
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
            {/* <div className="card-header">
                Featured
              </div> */}
              <div className="card-body" style={{minHeight:"20vh"}}>
                <h5 className="card-title">{props.currentUser||props.profilePage?"":<MiniUserCard source={props.imageData.profilePicOfUsernamePostedByBase64} username={props.imageData.usernamePostedBy} >Hello</MiniUserCard>}</h5>
                <div className={spinnerClasses} style={{height:"40px",width:"40px"}} role="status">
                </div>
                <Spinner className={spinnerClasses} animation="border" role="status">
                </Spinner>
                {/* Dont forget to replace below line */}
                {/* <img className={imgClasses} onLoad={()=>setImageLoadedState(true)} src={"data:image/jpg;base64,"+props.imageData.imageAsBase64} role="button" onClick={()=>props.showImageModal(props.imageData)}/> */}
                <img className={imgClasses} 
                onLoad={()=>setImageLoadedState(true)} 
                src={props.local?props.imageData.imageAsBase64:"data:image/jpg;base64,"+props.imageData.imageAsBase64} 
                role="button" 
                onClick={props.handleShow}/>
              {/* </div> */}
              <div className="card-footer d-flex text-muted">
                {  (props.imageData.likedBy?.includes(userCtx.username))?
                   <FontAwesomeIcon role="button" icon={faHeartSolid} onClick={()=>props.unlikeImage(props.imageData.mediaId)} size="2x"/>
                  :<FontAwesomeIcon role="button" icon={faHeart} onClick={()=>props.likeImage(props.imageData.mediaId)} size="2x"/>
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