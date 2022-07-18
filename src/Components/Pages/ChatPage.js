import { useContext } from "react";
import MiniUserCard from "../Cards/MiniUserCard";
import ChatMessageBubble from "../ChatComponents/ChatMessageBubble";
import InputArea from "../ChatComponents/InputArea";
import ThemeContext from "../Contexts/ThemeContext";
function ChatPage(props) {
let themeCtx = useContext(ThemeContext);
  return (
    <div className={"card w-100 "+(themeCtx.darkMode?" bg-dark text-light border border-light":"")} style={{height:"75vh"}}>
      <div className="card-header"><MiniUserCard username={props.user}/></div>
      <div className={"card-body overflow-auto "+(themeCtx.darkMode?" bg-dark text-light border border-light":"")} >
      <ul className="list-group w-100 d-flex ">
        {props.message?.map((msg,i)=>{
          let output;
          if(i==props.message.length-1){
              output = <ChatMessageBubble key={i} message={msg} usernameTo={props.user} latestMsgRef={props.latestMsgRef} />
          }else{
              output = <ChatMessageBubble key={i} message={msg} usernameTo={props.user} />
          }
           return output;
        })
        }
        </ul>
      </div>
      <div className="card-footer">
        <InputArea  callRefresh={props.callRefresh} usernameTo={props.user} />
      </div>
    </div>
  );
}

export default ChatPage;
