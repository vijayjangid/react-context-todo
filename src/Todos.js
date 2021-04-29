import React, { useCallback, useContext, useMemo, useRef } from "react";
import Todo from "./Todo";
import { addTodo, toggleTodo, removeTodo, clearTodos } from "./reducer";
import { TodosContext } from "./todosContext";
import { useScrollPosition } from "./customHooks";

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
  // const emptyList = !todos || !todos.length;
  const listRef = useRef();
  const { atTop, atBottom, noScrollVisible } = useScrollPosition(listRef);
  let scrollStateClass = "";
  if (noScrollVisible) {
    scrollStateClass = "no-scroll";
  } else if (atTop) {
    scrollStateClass = "scroll-top";
  } else if (atBottom) {
    scrollStateClass = "scroll-bottom";
  }

  return (
    <div className="paper">
      <form onSubmit={onFormSubmit}>
        <input ref={inputRef} type="text" />
        <span className="clear" onClick={onClearAll}>
          [Clear All]
        </span>
      </form>
      <div className="list-container">
        <ul className={`list ${scrollStateClass}`} ref={listRef}>
          {todos.map((t) => (
            <Todo key={t.id} todo={t} onToggle={onToggle} onRemove={onRemove} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
