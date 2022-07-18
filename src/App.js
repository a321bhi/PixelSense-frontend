import {  Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import { ThemeContextProvider } from "./Components/Contexts/ThemeContext";
import { UserContextProvider } from "./Components/Contexts/UserContext";
import ActiveChats from "./Components/Pages/ActiveChatsPage";
import WelcomePage from "./Components/Pages/WelcomePage";
import PageHeader from "./Components/HeaderComponent/PageHeader";
import ProfilePage from "./Components/Pages/ProfilePage";
import AuthCheck from "./Components/AuthChecker/AuthCheck";
import LoginPage from "./Components/Pages/LoginPage";
import LoginCheck from "./Components/AuthChecker/LoginCheck";
import 'react-toastify/dist/ReactToastify.css';
import SelectedTagPage from "./Components/Pages/SelectedTagPage";
import ThemeContext from "./Components/Contexts/ThemeContext";
function App() {  
  
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <ThemeContext.Consumer>
          {value=><div className={value.darkMode?" bg-dark text-light ":""}>
        <div style={{height:"10vh"}}>
      <PageHeader/>
      </div>
    <div className="App" style={{minHeight:"90vh"}}>
      <Routes>
        <Route exact path="/" element={<LoginCheck><WelcomePage/></LoginCheck>}/>
        <Route exact path="/login" element={<LoginCheck><LoginPage/></LoginCheck>}/>
        <Route exact path="/home" element={<AuthCheck><HomePage/></AuthCheck>}/>
        <Route exact path="/profile" element={<AuthCheck><ProfilePage/></AuthCheck>}/>
        <Route exact path="/profile/:id" element={<AuthCheck><ProfilePage/></AuthCheck>}/>
        <Route exact path="/chats" element={<AuthCheck><ActiveChats/></AuthCheck>}/>
        <Route exact path="/search-result/:tag" element={<AuthCheck><SelectedTagPage/></AuthCheck>}/>
      </Routes>
    </div>
    </div>}

    </ThemeContext.Consumer>
    </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;