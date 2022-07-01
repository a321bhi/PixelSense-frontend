import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
function PrivateProfile(){
    return <div className="w-100 mt-5 p-5 text-center fs-4" style={{height:"50vh"}}>
        <FontAwesomeIcon icon={faLock} size={"4x"}></FontAwesomeIcon>
        <div className="mt-2">This account is private.</div>
        <div>Follow to see their photos</div>
    </div>
}
export default PrivateProfile;