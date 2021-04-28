const initialState = [];

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("todos")) || initialValue;

const todosReducer = (state, action) => {
  switch (action.type) {
    case "add-todo": {
      const text = action.payload;
      const id = Date.now();
      return [...state, { id, text, done: false }];
    }
    case "toggle-todo": {
      const id = action.payload;
      return state.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    }
    case "remove-todo": {
      const id = action.payload;
      return state.filter((t) => t.id !== id);
    }
    case "clear-todos": {
      return [];
    }
    default:
      return state;
  }
};

export const addTodo = (payload) => ({ type: "add-todo", payload });
export const toggleTodo = (payload) => ({
  type: "toggle-todo",
  payload
});
export const removeTodo = (payload) => ({
  type: "remove-todo",
  payload
});

export const clearTodos = () => ({
  type: "clear-todos"
});

export default todosReducer;
