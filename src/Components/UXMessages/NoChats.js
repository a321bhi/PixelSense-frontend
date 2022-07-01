import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
function NoChats(){
    return <div className="w-100 mt-5 p-5 text-center fs-4" style={{height:"50vh"}}>
        <FontAwesomeIcon icon={faIcons} size={"2x"}></FontAwesomeIcon>
        <div className="mt-2">No chats yet..<br/>Follow someone to start a conversation</div>
    </div>
}
export default NoChats;