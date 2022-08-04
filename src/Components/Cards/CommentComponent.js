import UserContext from "../Contexts/UserContext";
import { useContext, useRef} from "react";
import { timeSince } from "../../ConfigFiles/timeSince";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart  as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import { likeComment,unlikeComment } from '../ApiRequests/ImageApi';
import MiniUserCard from "./MiniUserCard";
import LikedByModal from "./LikedByModal";
import { useState } from "react";
import ThemeContext from "../Contexts/ThemeContext";
function CommentComponent(props){
  let themeCtx = useContext(ThemeContext);
  let [commentLikedByState,setCommentLikedByState] = useState([]);
  let [showLikedByModal,setShowLikedByModal] = useState(false);
    const userCtx = useContext(UserContext);
    return <ul className='list-group container '>
      {props.commentData?.map(
        (item,i)=><li key={i} className={"list-group-item  d-flex row "+(themeCtx.darkMode?" bg-dark text-light border border-white ":"")}>
          <div className='col-10 col-md-11'>
          <span className='fw-bold me-3 float-start'><MiniUserCard username={item.commentByUser}/></span>
          {item.commentContent}
          </div>
          <div className="col-2 col-md-1">
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
                        onClick={()=>props.deleteComment(item.commentId)}
                      >Delete comment
                      </div>
                    </li>              
                </ul>
              </div>

          :""  
          }
          </div>
          <div className='d-flex justify-content-between'>
          {
            <div className={(themeCtx.darkMode?" text-light":" text-muted") }>
              {timeSince(item.createdAt)}
            </div>
          }
  <div className={"d-flex "+(themeCtx.darkMode?" text-light":" text-muted") }>
    {  (item.commentLikedBy?.includes(userCtx.getUsername()))?
       <FontAwesomeIcon role="button" icon={faHeartSolid} onClick={()=>{unlikeComment(item.commentId,props.updateOneImage, userCtx);}} size="2x"/>
      :<FontAwesomeIcon role="button" icon={faHeart} onClick={()=>{likeComment(item.commentId,props.updateOneImage, userCtx);}} size="2x"/>
    }
    <div className='mx-1'  role="button" onClick={()=>{setShowLikedByModal(!showLikedByModal);setCommentLikedByState(item.commentLikedBy)}}>
      {item.commentLikedBy?item.commentLikedBy.length+" likes":"0"+" likes"}
    </div>
  </div> 

  </div>
  <LikedByModal
        likedBy={commentLikedByState}
          show={showLikedByModal}
          onHide={() => setShowLikedByModal(false)}
        />
          </li>
        )
      }</ul>
}
export default CommentComponent;