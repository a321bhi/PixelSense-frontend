// Theme context, default to light theme
import React from "react";
export const ThemeContext = React.createContext(
  {
    theme:false,
    toggleTheme: () => {},
});
