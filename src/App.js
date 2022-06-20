import {React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import { ThemeContext } from "./Components/Contexts/ThemeContext";
import { UserContextProvider } from "./Components/Contexts/UserContext";
import ActiveChats from "./Components/Pages/ActiveChatsPage";
import WelcomePage from "./Components/Pages/WelcomePage";
import UploadMedia from "./Components/Pages/UploadMedia";
import PageHeader from "./Components/HeaderComponent/PageHeader";
import ChatPage from "./Components/Pages/ChatPage";
function App() {
  const navigate = useNavigate();
  let [darkMode, setDarkMode] = useState(false);
  let [authenticatedUser, setAuthenticatedUser] = useState(null);
  function toggleTheme(){
    darkMode?setDarkMode(false):setDarkMode(true);
    console.log("Dark mode changed to "+darkMode);
  }
  function toggleLogin(value=null){
  
    if(authenticatedUser!==null){
      setAuthenticatedUser(null);
      navigate('/');
    }else{
      setAuthenticatedUser(value);
    }
  }
  return (
    <ThemeContext.Provider value={{darkMode,toggleTheme}}>
      <UserContextProvider>
      <PageHeader/>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<WelcomePage/>}/>
        <Route exact path="/home" element={<HomePage/>}/>
        {/* <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/profile/update" element={<UpdateProfile/>}/> */}
        <Route exact path="/UploadMedia" element={<UploadMedia/>}/>
        <Route exact path="/chats" element={<ActiveChats/>}/>
        <Route exact path="/chats/:id" element={<ChatPage/>} />
      </Routes>
    </div>
    </UserContextProvider>
    </ThemeContext.Provider>
  );
}

export default App;