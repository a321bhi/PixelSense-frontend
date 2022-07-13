import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import './ChatMessageBubble.css';
function ChatMessageBubble(props){

    function timeFormattingNormal(dateTime){
        return new moment(dateTime).format('h:mm a');
    }
    function timeFormattingHover(dateTime){
        return new moment(dateTime).format('D MMMM YY, h:mm a');
    }
    let userCtx = useContext(UserContext);
    var classForText = props.message.usernameFrom===userCtx.username?"text-end align-self-end ":"text-start align-self-start ";
    classForText+= "msg-content list-group-item list-group-item-secondary mt-2 rounded w-auto";

    return (
        <li className={classForText} style={{minWidth:"15%",maxWidth:"90%",
        backgroundColor: "#0084ff",color: "#fff"}} ref={props.latestMsgRef} >
                <div className="msg" style={{fontSize:"16px"}}>{props.message.message}</div>
                <div className="msg-time-normal" style={{fontSize:"12px"}}>{timeFormattingNormal(props.message.timeSent)}</div>       
                <div className="msg-time-hover" style={{fontSize:"12px"}}>{timeFormattingHover(props.message.timeSent)}</div>        
        </li>
    )

}

export default ChatMessageBubble;