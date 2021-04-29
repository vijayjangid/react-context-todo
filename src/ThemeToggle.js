import React, { useCallback, useContext } from "react";
import { ThemeContext } from "./themeContext";

const ThemeToggle = () => {
  const { isDarkTheme, setTheme } = useContext(ThemeContext);
  const onToggle = useCallback(() => {
    setTheme((theme) => !theme);
  }, [setTheme]);

  const theme = isDarkTheme ? "Dark" : "Light";
  return (
    <div className="theme-toggle-container">
      <button onClick={onToggle}>Theme: {theme}</button>
    </div>
  );
};

export default ThemeToggle;
