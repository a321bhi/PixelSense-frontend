import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
function LogoutSwitch(){
    const navigate = useNavigate();
    let userCtx = useContext(UserContext);
function logoutFunction(){
    localStorage.clear();
    disconnect();
    userCtx.toggleLogin("");
    navigate('/',{replace:true});
}

function disconnect() {
    if (userCtx.stompClient !== null) {
        userCtx.stompClient.disconnect();
    }
    console.log("Disconnected");
}
    return(
    <div className="form-check form-switch">
    <div className="float-end me-3">
    {/* <input className="bg-dark text-light" type="button" id="logoutSwitch" 
                onClick={logoutFunction} value={`Logout ${userCtx.username}`}/> */}
        <div type="button" id="logoutSwitch" 
                onClick={logoutFunction}>
                <FontAwesomeIcon icon={faRightFromBracket} size="2x"/>
        </div>
    </div>
    </div>
)}

export default LogoutSwitch;
