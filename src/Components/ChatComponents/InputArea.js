import {  useRef,useContext,useState } from 'react';
import './InputArea.module.css';
import UserContext from '../Contexts/UserContext';

import Picker from 'emoji-picker-react';

function InputArea(props){
    let chatMessageHandler = useRef();
    let userCtx = useContext(UserContext);
//     const [chosenEmoji, setChosenEmoji] = useState(null);

//   const onEmojiClick = (event, emojiObject) => {
//     chatMessageHandler.current.value+=emojiObject
//   };
  const sendMessage=()=> {
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
    <div  className="chatInputForm d-flex">
    {/* <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true}   pickerStyle={{ overflow:'visible',position:"fixed"}} /> */}
        <div className="my-1 form-floating mx-auto w-100">
            <input 
                type="text" 
                className="form-control" 
                id="chatmessage"
                placeholder="Enter your message.." 
                name="message" 
                ref={chatMessageHandler} 
                />
            <label htmlFor="chatmessage" >Enter your message</label>
        </div>
        <div className="my-1 form-check mx-auto text-center">

            <button type="button" className="btn btn-primary w-100 h-100" onClick={sendMessage}>Send</button>
        </div>
    </div>
    </div>
}

export default InputArea;