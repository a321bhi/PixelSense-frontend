import './ChatMessageBubble.module.css';
function ChatMessageBubble(props){
    var classForText = props.from==="self"?"text-end align-self-end ":"text-start align-self-start ";
    classForText+= "msg-content list-group-item list-group-item-secondary mt-2 rounded w-auto";

    return (
        <li className={classForText} style={{"maxWidth":"90%"}}>
                <div>SampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessage SampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessageSampleMessage
                    {props.message}</div>        
        </li>
    )

}

export default ChatMessageBubble;