import ChatMessageBubble from "../ChatComponents/ChatMessageBubble";
import InputArea from "../ChatComponents/InputArea";

function ChatPage() {
  return (
    <div className="card w-75 mx-auto mt-5 h-75" >
      <div className="card-header">Person Name</div>
      <div className="card-body">
        <ChatMessageBubble />
      </div>
      <div className="card-footer">
        <InputArea />
      </div>
    </div>
  );
}

export default ChatPage;
