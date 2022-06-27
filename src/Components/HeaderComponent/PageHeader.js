import HeaderName from "./HeaderName";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";

import NavbarComponent from "./NavbarComponent";
function PageHeader(){
    let userCtx = useContext(UserContext);

return(
    <div className="container-fluid text-white bg-primary">
        <HeaderName/>
        {userCtx.username.length!==0?
        <NavbarComponent/>
        :""}
    </div>
)
}
export default PageHeader; 