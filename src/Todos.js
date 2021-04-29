import React, { useCallback, useContext, useRef } from "react";
import Todo from "./Todo";
import { addTodo, toggleTodo, removeTodo, clearTodos } from "./reducer";
import { TodosContext } from "./todosContext";

const Todos = () => {
  const { todos, dispatch } = useContext(TodosContext);
  const inputRef = useRef();
  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(addTodo(inputRef.current.value));
      inputRef.current.value = "";
    },
    [dispatch]
  );
  const onToggle = useCallback(
    (payload) => {
      dispatch(toggleTodo(payload));
    },
    [dispatch]
  );
  const onRemove = useCallback(
    (payload) => {
      dispatch(removeTodo(payload));
    },
    [dispatch]
  );

  const onClearAll = useCallback(() => {
    dispatch(clearTodos());
  }, [dispatch]);
  const emptyList = !todos || !todos.length;
  return (
    <div className="paper">
      <form onSubmit={onFormSubmit}>
        <input ref={inputRef} type="text" />
        <span className="clear" onClick={onClearAll}>
          [Clear All]
        </span>
      </form>
      <div className="list-container">
        {emptyList && <div className="empty">No items</div>}
        {!emptyList && (
          <ul className="list">
            {todos.map((t) => (
              <Todo
                key={t.id}
                todo={t}
                onToggle={onToggle}
                onRemove={onRemove}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Todos;
