import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
function SelectOrFollowMessage(){
    return <div className="w-100 mt-5 p-5 text-center fs-4" style={{height:"50vh"}}>
        <FontAwesomeIcon icon={faIcons} size={"4x"}></FontAwesomeIcon>
        <div className="mt-2">Follow some tags to view feed..</div>
    </div>
}
export default SelectOrFollowMessage;