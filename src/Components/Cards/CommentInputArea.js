import {  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrin, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Picker from 'emoji-picker-react';

function CommentInputArea(props){
    let [showPicker,setShowPicker] = useState(false);
  let commentPlaceholder ="Add a comment..";
  const onEmojiClick = (event, emojiObject) => {
    props.newCommentHandle.current.value+=emojiObject.emoji
  };
  
return <div className="">
    <div  className="chatInputForm d-flex " style={{height:"75px",position: "relative"}}>
    {showPicker?<Picker onEmojiClick={onEmojiClick} disableAutoFocus={true}   pickerStyle={{zIndex:"9",width:"400px",position:'absolute', overflow:'visible',height:"250px",top:"-250px", width:"250px"}} />:""}
    <FontAwesomeIcon className='my-auto ms-1 ' role="button" size='lg' icon={faFaceGrin} onClick={()=>setShowPicker(!showPicker)}></FontAwesomeIcon>
        <div className="my-1 form-floating mx-auto position-absolute d-flex" style={{left:"10%",width:"90%"}}>
            <input 
                type="text" 
                className="form-control" 
                id="addComment" 
                placeholder={commentPlaceholder}
                name="addComment" 
                ref={props.newCommentHandle} 
                required
                />
            <label htmlFor="addComment">Add a comment</label>

            <div className="my-1 form-check mx-auto text-center ">
          <FontAwesomeIcon className='ms-2' role="button" icon={faPaperPlane} onClick={()=>{props.addComment();setShowPicker(false);}} size="2x"></FontAwesomeIcon>
        </div>
        </div>
    </div>
    </div>
}

export default CommentInputArea;