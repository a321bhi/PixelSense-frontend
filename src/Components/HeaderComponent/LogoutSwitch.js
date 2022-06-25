import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function LogoutSwitch(){
    const navigate = useNavigate();

    let userCtx = useContext(UserContext);
function logoutFunction(){
    userCtx.toggleLogin("")
    navigate('/');
}
    return(
    <div className="form-check form-switch">
    <div className="float-end me-3">
        <input className="bg-dark text-light" type="button" id="logoutSwitch" 
                onClick={logoutFunction} value={`Logout ${userCtx.username}`}/>
    </div>
    </div>
)}

export default LogoutSwitch;
