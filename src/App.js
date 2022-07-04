import {React, useState,useContext } from "react";
import {  Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import { ThemeContextProvider } from "./Components/Contexts/ThemeContext";
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
import 'react-toastify/dist/ReactToastify.css';
function App() {  
  
  return (
    <ThemeContextProvider>
      <UserContextProvider>
      <PageHeader/>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginCheck><WelcomePage/></LoginCheck>}/>
        <Route exact path="/login" element={<LoginCheck><LoginPage/></LoginCheck>}/>
        
        <Route exact path="/home" element={<AuthCheck><HomePage/></AuthCheck>}/>
        <Route exact path="/profile" element={<AuthCheck><ProfilePage/></AuthCheck>}/>
        <Route exact path="/profile/:id" element={<AuthCheck><ProfilePage/></AuthCheck>}/>
        {/* <Route exact path="/profile/update" element={<UpdateProfile/>}/> */}
        <Route exact path="/UploadMedia" element={<AuthCheck><UploadMedia/></AuthCheck>}/>
        <Route exact path="/chats" element={<AuthCheck><ActiveChats/></AuthCheck>}/>
        {/* <Route exact path="/chats/:id" element={<AuthCheck><ChatPage/></AuthCheck>} /> */}
      </Routes>
    </div>
    </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;