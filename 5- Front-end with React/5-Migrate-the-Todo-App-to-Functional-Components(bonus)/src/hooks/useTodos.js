import { useState, useEffect } from 'react';

export function useTodos() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem('todos')) || []
  );

  // Save to localStorage
  const saveToLocalStorage = (value) => {
    localStorage.setItem('todos', JSON.stringify(value));
  };

  // Add a new todo
  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Toggle a todo's completed status
  const toggleComplete = (id) => {
    const updatesTodos = todos.map((td) =>
      td.id === id ? { ...td, completed: !td.completed } : td
    );

    setTodos(updatesTodos);
  };

  // Update a todo's title
  const handleUpdate = ({ id, newTitle }) => {
    const updatesTodos = todos.map((td) =>
      td.id === id ? { ...td, title: newTitle } : td
    );

    setTodos(updatesTodos);
  };

  // Remove a todo
  const handleDelete = (id) => {
    const updatesTodos = todos.filter((td) => td.id !== id);

    setTodos(updatesTodos);
  };

  useEffect(() => {
    saveToLocalStorage(todos);
  }, [todos]);

  return { todos, addTodo, toggleComplete, handleUpdate, handleDelete };
}
