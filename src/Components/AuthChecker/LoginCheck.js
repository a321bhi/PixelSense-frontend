import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function LoginCheck(props){
    let location = useLocation();
    let userCtx = useContext(UserContext);
    return (userCtx.username?.length>0)?<Navigate to="/home" state={{ from: location }} replace />:props.children;
}

export default LoginCheck;