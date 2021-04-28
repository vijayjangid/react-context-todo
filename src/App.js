import React from "react";
import "./styles.css";
import Todos from "./Todos";
import TodosContextProvider from "./todosContext";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <TodosContextProvider>
          <Todos />
        </TodosContextProvider>
      </div>
    </div>
  );
}
