import MiniUserCard from "../Cards/MiniUserCard";
import ChatMessageBubble from "../ChatComponents/ChatMessageBubble";
import InputArea from "../ChatComponents/InputArea";
function ChatPage(props) {
  return (
    <div className="card w-100" style={{height:"75vh"}}>
      <div className="card-header"><MiniUserCard username={props.user}/></div>
      <div className="card-body overflow-auto" >
      <ul className="list-group w-100 d-flex ">
        {props.message?.map((msg,i)=>{
           return <ChatMessageBubble key={i} message={msg} usernameTo={props.user} />
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
