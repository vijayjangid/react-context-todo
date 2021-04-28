import { createContext, useEffect, useReducer } from "react";
import todosReducer, { initializer } from "./reducer";

export const TodosContext = createContext();

const TodosContextProvider = (props) => {
  const [todos, dispatch] = useReducer(todosReducer, [], initializer);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
