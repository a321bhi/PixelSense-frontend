import HeaderName from "./HeaderName";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import NavbarComponent from "./NavbarComponent";
function PageHeader(){
    let userCtx = useContext(UserContext);

return(
    <div className="container-fluid d-flex">
        <HeaderName/>
        {userCtx.username.length!==0?
        <NavbarComponent/>
        :""}
         <ToastContainer theme="dark"/>
    </div>
)
}
export default PageHeader; 