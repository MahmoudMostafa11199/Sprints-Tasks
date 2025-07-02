import { useState } from 'react';

function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    onAdd(newTodo);

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit" className="btn btn-add">
        Add Task
      </button>
    </form>
  );
}

export default AddTodoForm;
