// Signed-in user context
import { useState } from "react";
import React from "react";
export const UserContext = React.createContext({
    username: "",
    token:"",
    toggleLogin: ()=>{},
    setUsername:()=>{},
    setToken:()=>{}
  });
  function UserContextProvider(props){
    const [usernameState, setUsernameState] = useState("");
    const [tokenState, setTokenState] = useState("");
    function toggleLoginHandler(user,token){
      if(usernameState.length===0){
        setUsernameState(user);
        setTokenState(token);
      }else{
        setUsernameState("");
        setTokenState("");
      }
    }
    const context={
        username:usernameState,
        token:tokenState,
        toggleLogin:toggleLoginHandler,
        setUsername:setUsernameState,
        setToken: setTokenState
    };
    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext;
export {UserContextProvider};
