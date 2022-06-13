import React from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';

function HeaderDarkSwitch(){
    return(
        <ThemeContext.Consumer>
        {({theme, toggleTheme}) => (
    <div className="form-check form-switch bg-primary">
    <div className="float-end me-3">
    <input className="form-check-input custom-control-input custom-checkbox bg-info" type="checkbox" id="mySwitch" name="darkmode" onClick={toggleTheme}/>
    <div className="form-check-label" htmlFor="mySwitch">Dark Mode</div>
    </div>
    </div>)
    }
    </ThemeContext.Consumer>
)}

export default HeaderDarkSwitch;
