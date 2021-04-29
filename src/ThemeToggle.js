import React, { useCallback, useContext } from "react";
import { ThemeContext } from "./themeContext";

const ThemeToggle = () => {
  const { isDarkTheme, setTheme } = useContext(ThemeContext);
  const onToggle = useCallback(() => {
    setTheme((theme) => !theme);
  }, [setTheme]);

  // const theme = isDarkTheme ? "Dark" : "Light";
  const themeSymbol = isDarkTheme ? <>&#9728;</> : <>&#9790;</>;
  return (
    <div className="theme-toggle-container">
      <button onClick={onToggle}>{themeSymbol}</button>
    </div>
  );
};

export default ThemeToggle;
