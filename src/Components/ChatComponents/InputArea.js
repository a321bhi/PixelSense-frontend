import {  useRef,useContext,useState } from 'react';
import './InputArea.module.css';
import UserContext from '../Contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrin } from '@fortawesome/free-solid-svg-icons';
import Picker from 'emoji-picker-react';

function InputArea(props){
    let [showPicker,setShowPicker] = useState(false);
    let chatMessageHandler = useRef();
    let userCtx = useContext(UserContext);
    const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    chatMessageHandler.current.value+=emojiObject.emoji
  };
  const sendMessage=()=> {
    setShowPicker(false);
    if(chatMessageHandler.current.value.length>0){
    userCtx.stompClient.send( "/app/chat/"+props.usernameTo, {}, JSON.stringify({
      'message': chatMessageHandler.current.value,
      'usernameFrom':userCtx.username,
      'usernameTo':props.usernameTo,
      'timeSent':new Date(),
    }));
    chatMessageHandler.current.value="";
    }
    props.callRefresh();
    
}
return <div className="">
    <div  className="chatInputForm d-flex " style={{height:"75px",position: "relative"}}>
    {showPicker?<Picker onEmojiClick={onEmojiClick} disableAutoFocus={true}   pickerStyle={{zIndex:"9",width:"400px",position:'absolute', overflow:'visible',height:"350px",top:"-350px"}} />:""}
    <FontAwesomeIcon className='my-auto ms-3 ' role="button" size='2x' icon={faFaceGrin} onClick={()=>setShowPicker(!showPicker)}></FontAwesomeIcon>
        <div className="my-1 form-floating mx-auto position-absolute d-flex" style={{left:"10%",width:"90%"}}>
            <input 
                type="text" 
                className="form-control" 
                id="chatmessage"
                placeholder="Enter your message.." 
                name="message" 
                ref={chatMessageHandler} 
                />
            <label htmlFor="chatmessage" >Enter your message</label>
            <div className="my-1 form-check mx-auto text-center ">
            <button type="button" className="btn btn-primary w-100 h-100" onClick={sendMessage}>Send</button>
        </div>
        </div>
    </div>
    </div>
}

export default InputArea;