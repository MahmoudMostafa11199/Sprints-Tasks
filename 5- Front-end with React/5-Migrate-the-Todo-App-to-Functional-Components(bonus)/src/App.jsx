import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import './App.css';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, addTodo, toggleComplete, handleUpdate, handleDelete } =
    useTodos();

  return (
    <main>
      <section className="todo-app">
        <div className="container">
          <h1>To-Do List</h1>

          <AddTodoForm onAdd={addTodo} />

          <TodoList
            todos={todos}
            onComplete={toggleComplete}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
