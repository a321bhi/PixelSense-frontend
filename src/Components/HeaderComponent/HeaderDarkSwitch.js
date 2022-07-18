import React, { useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleHalfStroke} from "@fortawesome/free-solid-svg-icons";
function HeaderDarkSwitch(){
    const themeCtx = useContext(ThemeContext);
    return(
    <div className="form-check form-switch">
    <input className="form-check-input custom-control-input custom-checkbox bg-warn" type="checkbox" id="mySwitch" name="darkmode" onChange={()=>themeCtx.toggleDarkMode()}/>
    <div className="form-check-label" htmlFor="mySwitch"><FontAwesomeIcon icon={faCircleHalfStroke} size="2x"/></div>
    </div>)
}

export default HeaderDarkSwitch;
