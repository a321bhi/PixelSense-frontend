import HeaderDarkSwitch from "./HeaderDarkSwitch";
import HeaderName from "./HeaderName";
import { UserContext } from "../Contexts/UserContext";
import LogoutSwitch from "./LogoutSwitch";
import { useContext } from "react";
function PageHeader(){
    let userCtx = useContext(UserContext);

return(
    <div>
        <HeaderName/>
        {userCtx.username.length!==0?<LogoutSwitch/>:""}
        <HeaderDarkSwitch/>
       
    </div>
)
}
export default PageHeader;