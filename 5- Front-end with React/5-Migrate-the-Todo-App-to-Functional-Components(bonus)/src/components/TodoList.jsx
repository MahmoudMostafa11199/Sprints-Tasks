import TodoItem from './TodoItem';

function TodoList({ todos, onComplete, onUpdate, onDelete }) {
  return (
    <div className="tasks-list">
      {!todos.length && (
        <p className="no-tasks-message">
          No tasks for now — enjoy your free time! 🎉
        </p>
      )}

      {todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onComplete={onComplete}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
