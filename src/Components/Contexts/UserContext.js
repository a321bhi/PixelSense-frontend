// Signed-in user context
import { useState } from "react";
import React from "react";
import axios from "axios";
import { baseUrl } from "../../ConfigFiles/Urls";
export const UserContext = React.createContext({
    username: "",
    token:"",
    stompClient:null,
    userProfile:{},
    tagsSelected:[],
    setTagsSelected:()=>{},
    toggleLogin: ()=>{},
    setUsername:()=>{},
    setToken:()=>{},
    setUserProfile:()=>{},
    setStompClient :()=>{}
  });
  
  
  function UserContextProvider(props){
    const [usernameState, setUsernameState] = useState("");
    const [tokenState, setTokenState] = useState("");
    const [userProfileState, setUserProfileState] =useState({});
    const [stompClient, setStompClient] = useState(null);
    const [tagsSelected, setTagsSelected] = useState(["science","gaming"]);
    function toggleLoginHandler(user,token){
      if(usernameState.length===0){
        setUsernameState(user);
        setTokenState(token);
        let formData = new FormData();
        formData.append("username",user);
        axios.get(baseUrl+"/user/"+user,
        {
          headers:{
            "Authorization":token
          }
        }).then(res=>{setUserProfileState(res.data);console.log(res.data)})
      }else{
        setUsernameState("");
        setTokenState("");
      }
    }
    const context={
        username:usernameState,
        token:tokenState,
        userProfile:userProfileState,
        stompClient:stompClient,
        tagsSelected:tagsSelected,
        setTagsSelected:setTagsSelected,
        toggleLogin:toggleLoginHandler,
        setUsername:setUsernameState,
        setToken: setTokenState,
        setUserProfile:setUserProfileState,
        setStompClient:setStompClient
    };
    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext;
export {UserContextProvider};
