import ChatMessageBubble from "../ChatComponents/ChatMessageBubble";
import InputArea from "../ChatComponents/InputArea";
import classes from './ChatPage.module.css';
import {useParams} from "react-router-dom";
function ChatPage() {
  var classesForCard = "card w-75 mx-auto mt-5 "+classes.chat;
  let { id } = useParams();
  console.log(id);
  return (
    <div className={classesForCard}>
      <div className="card-header">  {id}</div>
      <div className="card-body overflow-auto" >
      <ul class="list-group w-100 d-flex ">
        <ChatMessageBubble from={"sender"}/>
        <ChatMessageBubble from={"self"}/>
        </ul>
      </div>
      <div className="card-footer">
        <InputArea />
      </div>
    </div>
  );
}

export default ChatPage;
