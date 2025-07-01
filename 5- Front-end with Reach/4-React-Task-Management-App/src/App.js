import { useState, useEffect } from 'react';
import { BsFillHouseFill } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';

import './App.css';

// Data Initialize
const InitializeTasks = [
  {
    id: Date.now() + 1,
    title: 'Dashboard',
    description: 'ERP System for Phamicy',
    category: 'work',
  },
  {
    id: Date.now() + 2,
    title: 'Shopping',
    description: 'Lorem ipsum',
    category: 'personal',
  },
  {
    id: Date.now() + 3,
    title: 'Health Care',
    description: 'Check-Up',
    category: 'urgent',
  },
];
const tasksData = JSON.parse(localStorage.getItem('tasksData')) || [
  ...InitializeTasks,
];

function App() {
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState(tasksData);
  const [task, setTask] = useState({
    title: '',
    description: '',
    category: 'personal',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [filterTask, setFilterTask] = useState([]);

  const displayedTasks = !filter || filter === 'all' ? tasks : filterTask;

  const handleChange = (e) => {
    setTask((prevTask) => {
      return { ...prevTask, [e.target.name]: e.target.value };
    });
  };

  // Add and Edit Task
  const handleModal = () => {
    if (!task.title.trim() || !task.description.trim()) return;

    if (isEdit) {
      const updateTasks = tasks.map((ts) =>
        ts.id === editTaskId ? { ...ts, ...task } : ts
      );
      setTasks(updateTasks);

      //
    } else {
      //
      const newTask = {
        id: Date.now(),
        ...task,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    reset();
  };

  const handleEdit = (task) => {
    setTask(task);
    setIsEdit(true);
    setEditTaskId(task.id);
  };

  // Delete Task
  const handleDelete = (id) => {
    const updateTasks = tasks.filter((task) => task.id !== id);
    setTasks(updateTasks);
  };

  // Clears input fields, exits edit mode, and resets edit task ID
  const reset = () => {
    setTask({
      title: '',
      description: '',
      category: 'personal',
    });
    setIsEdit(false);
    setEditTaskId(null);
  };

  const handleFilter = () => {
    const tasksByCategory = tasks.filter(
      (ts) => ts.category.toLowerCase() === filter
    );

    setFilterTask(tasksByCategory);
  };

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tasksData', JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks based on category
  useEffect(() => {
    if (filter) {
      handleFilter(filter);
    }
  }, [filter]);

  return (
    <main className="bg-light">
      <section className="py-4">
        <div className="container px-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="heading d-flex align-items-center gap-1">
              <BsFillHouseFill className="text-secondary" />
              <span>Task Management</span>
            </h1>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add Task
            </button>

            <TaskModal
              task={task}
              onclick={handleModal}
              onchange={handleChange}
              isEdit={isEdit}
              reset={reset}
            />
          </div>

          <div className="filter mb-4 d-flex justify-content-end align-items-center gap-2">
            <label htmlFor="filter">Filter by category</label>
            <select
              name="filter"
              id="filter"
              className="form-select w-auto"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="row gap-5 justify-content-between">
            {!displayedTasks.length && (
              <p className="text-danger fs-5 text-center py-3">
                No tasks found
              </p>
            )}

            {displayedTasks.length > 0 &&
              displayedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
