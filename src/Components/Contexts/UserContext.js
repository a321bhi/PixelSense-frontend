// Signed-in user context
import { createContext } from "react";
import { useState } from "react";
import React from "react";
export const UserContext = React.createContext({
    username: "",
    toggleLogin: ()=>{}
  });


  function UserContextProvider(props){
    const [usernameState, setUsername] = useState("");
    function toggleLoginHandler(user){
      if(usernameState.length===0){
        setUsername(user);
      }else{
        setUsername("");
      }
    }
    const context={
        username:usernameState,
        toggleLogin:toggleLoginHandler,
        
    };
    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext;
export {UserContextProvider};
