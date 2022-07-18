import HeaderName from "./HeaderName";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import NavbarComponent from "./NavbarComponent";
import ThemeContext from "../Contexts/ThemeContext";
import HeaderDarkSwitch from "./HeaderDarkSwitch";
function PageHeader(){
    let userCtx = useContext(UserContext);
    let themeCtx = useContext(ThemeContext);

return(
    <div className={"container-fluid d-flex "+(themeCtx.darkMode?"bg-dark text-light":"")}>
        <HeaderName/>
        {userCtx.username.length!==0?
        <div className="mx-5" style={{width:"80vw"}}>
        <NavbarComponent/>
        </div>
        :""}
         <div style={{position:"absolute",top:"10px",right:"10px"}}><HeaderDarkSwitch/></div>
         <ToastContainer theme="dark"/>
    </div>
)
}
export default PageHeader; 