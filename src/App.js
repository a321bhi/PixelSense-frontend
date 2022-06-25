import {React, useState,useContext } from "react";
import {  Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import { ThemeContext } from "./Components/Contexts/ThemeContext";
import { UserContextProvider, UserContext } from "./Components/Contexts/UserContext";
import ActiveChats from "./Components/Pages/ActiveChatsPage";
import WelcomePage from "./Components/Pages/WelcomePage";
import UploadMedia from "./Components/Pages/UploadMedia";
import PageHeader from "./Components/HeaderComponent/PageHeader";
import ChatPage from "./Components/Pages/ChatPage";
import ProfilePage from "./Components/Pages/ProfilePage";
function App() {
  let userCtx = useContext(UserContext);
  
  let [darkMode, setDarkMode] = useState(false);
  
  function toggleTheme(){
    darkMode?setDarkMode(false):setDarkMode(true);
    console.log("Dark mode changed to "+darkMode);
  }
  
  return (
    <ThemeContext.Provider value={{darkMode,toggleTheme}}>
      <UserContextProvider>
      <PageHeader/>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<WelcomePage/>}/>
        <Route exact path="/home" element={<HomePage/>}/>
        <Route exact path="/profile" element={<ProfilePage/>}/>
        {/* <Route exact path="/profile/update" element={<UpdateProfile/>}/> */}
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