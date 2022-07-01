import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';

import './ChatMessageBubble.module.css';
function ChatMessageBubble(props){
    let userCtx = useContext(UserContext);
    var classForText = props.message.usernameFrom===userCtx.username?"text-end align-self-end ":"text-start align-self-start ";
    classForText+= "msg-content list-group-item list-group-item-secondary mt-2 rounded w-auto";

    return (
        <li className={classForText} style={{"maxWidth":"90%"}}>
                <div>{props.message.message}</div>        
        </li>
    )

}

export default ChatMessageBubble;