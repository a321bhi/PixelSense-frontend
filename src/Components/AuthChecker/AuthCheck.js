import { useContext, useEffect } from "react";
import UserContext from "../Contexts/UserContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function AuthCheck(props){
    let location = useLocation();
    let userCtx = useContext(UserContext);
    let username = localStorage.getItem("USERNAME");
    let authToken = localStorage.getItem("JWT");
    useEffect(()=>{
    if (authToken != null) {
        if(userCtx.username===null || userCtx.username.length<1){
            userCtx.setUsername(username);
        }
        if(userCtx.token===null || userCtx.token.length<1){
            userCtx.setToken(authToken);
        }
    }    
},[]);
    return (authToken==null)?<Navigate to="/login" state={{ from: location }} replace />:props.children
}

export default AuthCheck;