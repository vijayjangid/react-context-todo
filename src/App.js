import React, { useContext } from "react";
import "./styles.css";
import Todos from "./Todos";
import ThemeToggle from "./ThemeToggle";
import TodosContextProvider from "./todosContext";
import { ThemeContext } from "./themeContext";

export default function App() {
  const { isDarkTheme } = useContext(ThemeContext);
  const themeClass = isDarkTheme ? "dark" : "";
  return (
    <div className={`${themeClass} App`}>
      <div className="container">
        <ThemeToggle />
        <TodosContextProvider>
          <Todos />
        </TodosContextProvider>
      </div>
    </div>
  );
}
