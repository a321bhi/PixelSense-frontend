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
    getToken:()=>{},
    getUsername:()=>{},
    setUserProfile:()=>{},
    setStompClient :()=>{}
  });
  
  
  function UserContextProvider(props){
    const [usernameState, setUsernameState] = useState("");
    const [tokenState, setTokenState] = useState("");
    const [userProfileState, setUserProfileState] =useState({});
    const [stompClient, setStompClient] = useState(null);
    const [tagsSelected, setTagsSelected] = useState([]);
    function toggleLoginHandler(user,token){
      if(usernameState.length===0){
        setUsernameState(user);
        setTokenState(token);
        localStorage.setItem('token',token);
        localStorage.setItem('username',user);
        let formData = new FormData();
        formData.append("username",user);
        axios.get(baseUrl+"/user/"+user,
        {
          headers:{
            "Authorization":token
          }
        }).then(res=>{setUserProfileState(res.data);console.log(res.data)})
      }else{
        localStorage.removeItem(token);
        setUsernameState("");
        setTokenState("");
        setUserProfileState({});
        setTagsSelected([]);
        stompClient.disconnect();
        setStompClient(null);
      }
    }
    function getToken(){
      if(tokenState?.length>0){
        return tokenState;
      }else if(localStorage.getItem('token')!==null){
        return localStorage.getItem('token');
      }else{
        return null;
      }
    }
    function getUsername(){
      if(usernameState?.length>0){
        return usernameState;
      }else if(localStorage.getItem('username')!==null){
        return localStorage.getItem('username');
      }else{
        return null;
      }
    }
    const context={
        username:usernameState,
        token:tokenState,
        userProfile:userProfileState,
        stompClient:stompClient,
        tagsSelected:tagsSelected,
        getUsername:getUsername,
        setTagsSelected:setTagsSelected,
        toggleLogin:toggleLoginHandler,
        setUsername:setUsernameState,
        setToken: setTokenState,
        setUserProfile:setUserProfileState,
        setStompClient:setStompClient,
        getToken:getToken
    };
    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext;
export {UserContextProvider};
