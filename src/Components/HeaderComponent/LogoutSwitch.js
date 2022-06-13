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
    <div className="form-check form-switch bg-primary">
    <div className="float-end me-3">
    <input className="bg-dark" type="button" id="logoutSwitch" name="darkmode" onClick={logoutFunction}/>
    <div className="" htmlFor="logoutSwitch">Logout {userCtx.username}</div>
    </div>
    </div>
)}

export default LogoutSwitch;
