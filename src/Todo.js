import React, { useMemo } from "react";

const Todo = React.memo(({ todo, onToggle, onRemove }) => {
  const { id, text, done } = todo;
  const created = useMemo(() => {
    const d = new Date(id);
    return d.toLocaleString("en-US");
  }, [id]);
  return (
    <li className={done ? "done" : ""}>
      <div className="text-wrapper" onClick={() => onToggle(id)}>
        <span className="text">{text}</span>
        <small>{created}</small>
      </div>
      <span className="delete" onClick={() => onRemove(id)}>
        &#10005;
      </span>
    </li>
  );
});

export default Todo;
