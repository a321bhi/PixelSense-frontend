// Theme context, default to light theme
import { useState } from "react";
import React from "react";
export const ThemeContext = React.createContext(
  {
    theme:"text-light bg-dark",
    toggleDarkMode: () => {},
    darkMode:false,
});

function ThemeContextProvider(props){

  const [themeState, setThemeState] = useState(" text-light bg-dark");
  const [darkModeState, setDarkModeState] = useState(localStorage.getItem("theme")==null?false:localStorage.getItem("theme")==="false"?false:true);

  const context={
    theme:themeState,
    toggleDarkMode:()=>{
      let themeFromLocal = localStorage.getItem("theme");
      if(themeFromLocal!==null){
        setDarkModeState(themeFromLocal==="false"?true:false);
        localStorage["theme"]=(themeFromLocal==="false"?"true":"false");        
      }else{
        localStorage.setItem("theme",""+!darkModeState);
        setDarkModeState(!darkModeState);
      }
    },
    darkMode:darkModeState
  };
  return <ThemeContext.Provider value={context}>
      {props.children}
  </ThemeContext.Provider>
}

export default ThemeContext;
export {ThemeContextProvider};
