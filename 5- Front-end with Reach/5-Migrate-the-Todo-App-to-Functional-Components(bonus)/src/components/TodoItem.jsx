import { useState } from 'react';

function TodoItem({ todo, onUpdate, onComplete, onDelete }) {
  const { id, title, completed } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const editTodo = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      onUpdate({ id, newTitle });
      setIsEditing(false);
    }
  };

  return (
    <li className="task-item">
      <input
        type="text"
        className="task-title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        readOnly={!isEditing}
      />

      <div className="buttons">
        <button className="btn btn-edit" onClick={editTodo}>
          {isEditing ? 'Save' : 'Edit'}
        </button>

        <button
          className="btn btn-completed"
          data-isCompleted={completed}
          onClick={() => onComplete(id)}
        >
          {!completed ? 'Mark as done' : 'Completed'}
        </button>

        <button className="btn btn-delete" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
