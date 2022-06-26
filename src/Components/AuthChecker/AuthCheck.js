import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import LoginForm from "../Forms/LoginForm";

function AuthCheck(props){
    let userCtx = useContext(UserContext);
    let username = localStorage.getItem("USERNAME");
    let authToken = localStorage.getItem("JWT");
    if (authToken === null) {
        return <LoginForm fromRedirect={true}/>
    }else{
        if(userCtx.username===null || userCtx.username.length<1){
            userCtx.setUsername(username);
        }
        if(userCtx.token===null || userCtx.token.length<1){
            userCtx.setToken(authToken);
        }
        return props.children;
    }    
}

export default AuthCheck;