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

  const [themeState, setThemeState] = useState("text-light bg-dark");
  const [darkModeState, setDarkModeState] = useState(false);
  
  const context={
    theme:themeState,
    toggleDarkMode:()=>{setDarkModeState(!darkModeState);console.log("Changed to "+darkModeState)},
    darkMode:darkModeState
  };
  return <ThemeContext.Provider value={context}>
      {props.children}
  </ThemeContext.Provider>
}

export default ThemeContext;
export {ThemeContextProvider};
