import HeaderDarkSwitch from "./HeaderDarkSwitch";
import HeaderName from "./HeaderName";
import { UserContext } from "../Contexts/UserContext";
import LogoutSwitch from "./LogoutSwitch";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
function PageHeader(){
    let userCtx = useContext(UserContext);
const navigate = useNavigate();
function messageIconClick(){
    navigate('/chats');   
}

return(
    <div className="container-fluid text-white bg-primary">
        <HeaderName/>
        {userCtx.username.length!==0?<LogoutSwitch/>:""}
        {userCtx.username.length!==0?<button type="button" class="btn-close" aria-label="Close" onClick={messageIconClick}></button>:""}
        <HeaderDarkSwitch/>
       
    </div>
)
}
export default PageHeader; 