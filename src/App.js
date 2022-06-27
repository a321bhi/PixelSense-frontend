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
import AuthCheck from "./Components/AuthChecker/AuthCheck";
import LoginPage from "./Components/Pages/LoginPage";
import LoginCheck from "./Components/AuthChecker/LoginCheck";
function App() {  
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
        <Route exact path="/" element={<LoginCheck><WelcomePage/></LoginCheck>}/>
        <Route exact path="/login" element={<LoginCheck><LoginPage/></LoginCheck>}/>
        
        <Route exact path="/home" element={<AuthCheck><HomePage/></AuthCheck>}/>
        <Route exact path="/profile" element={<AuthCheck><ProfilePage/></AuthCheck>}/>
        {/* <Route exact path="/profile/update" element={<UpdateProfile/>}/> */}
        <Route exact path="/UploadMedia" element={<AuthCheck><UploadMedia/></AuthCheck>}/>
        <Route exact path="/chats" element={<AuthCheck><ActiveChats/></AuthCheck>}/>
        <Route exact path="/chats/:id" element={<AuthCheck><ChatPage/></AuthCheck>} />
      </Routes>
    </div>
    </UserContextProvider>
    </ThemeContext.Provider>
  );
}

export default App;