import './ChatMessageBubble';
function ChatMessageBubble(props){
    return (
        <p className="msg-content">
            SampleMessage{props.message}
        </p>
    )

}

export default ChatMessageBubble;