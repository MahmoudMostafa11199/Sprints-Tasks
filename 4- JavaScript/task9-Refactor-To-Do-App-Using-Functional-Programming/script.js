//////////////////////////////////////////////////////////
// DOM Elements
//////////////////////////////////////////////////////////
const taskListEl = document.querySelector('.tasks-list ul');
const titleTaskEl = document.querySelector('input');
const descriptionTaskEl = document.querySelector('textarea');
const noTasksMessageEl = document.querySelector('.no-tasks-message');

const btnAdd = document.querySelector('.btn-add');

//////////////////////////////////////////////////////////
// Initial Data Setup
//////////////////////////////////////////////////////////
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//////////////////////////////////////////////////////////
// Storage & Data Helpers
//////////////////////////////////////////////////////////
const saveToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const noTasksMessage = () => {
  if (!tasks.length) {
    noTasksMessageEl.classList.remove('hidden');
  } else {
    noTasksMessageEl.classList.add('hidden');
  }
};

const resetForm = () => {
  titleTaskEl.value = '';
  descriptionTaskEl.value = '';
};

//////////////////////////////////////////////////////////
// UI Rendering
//////////////////////////////////////////////////////////
const displayTasks = ({ id, title, description, completed }) => {
  const html = `
    <li class="task-item" data-id=${id}>
      <p class="task-title">${title}</p>
      <p class="task-description">${description}</p>
      <div class="buttons">
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-completed ${
          !completed ? 'not-complete' : 'completed'
        }">${!completed ? 'Mark as done' : 'Completed'}</button>
        <button class="btn btn-delete">Delete</button>
      </div>
    </li>
    `;

  taskListEl.insertAdjacentHTML('beforeend', html);
};

const renderTasks = () => {
  taskListEl.innerHTML = '';

  noTasksMessage();

  renderTaskRecursive(tasks);
};

const renderTaskRecursive = (tasks, i = 0) => {
  if (i >= tasks.length) return;
  displayTasks(tasks[i]);
  renderTaskRecursive(tasks, i + 1);
};

//////////////////////////////////////////////////////////
// UI Interaction Helpers
//////////////////////////////////////////////////////////
const updateCompleteButtonUI = (btn, completed) => {
  if (completed) {
    btn.textContent = 'Completed';
    btn.classList.add('completed');
    btn.classList.remove('not-complete');
  } else {
    btn.textContent = 'Mark as done';
    btn.classList.remove('completed');
    btn.classList.add('not-complete');
  }
};

const updateTaskUI = (btn, title, description) => {
  if (btn.textContent == 'Edit') {
    btn.textContent = 'Save';
    title.setAttribute('contenteditable', true);
    description.setAttribute('contenteditable', true);
    title.focus();
  } else {
    title.setAttribute('contenteditable', false);
    description.setAttribute('contenteditable', false);
    showNotification('Task updated successfully!');
    btn.textContent = 'Edit';
  }
};

// Show Notification
const showNotification = (message) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'center',
    stopOnFocus: true,
    style: {
      background:
        'linear-gradient(to right,rgb(25, 116, 128),rgb(19, 98, 130))',
    },
  }).showToast();
};

//////////////////////////////////////////////////////////
// Task Logic
//////////////////////////////////////////////////////////
// Add Task
const createTask = (title, description) => {
  return {
    id: Date.now() + '',
    title,
    description,
    completed: false,
  };
};
const addTaskToList = (tasks, newTask) => {
  return [...tasks, newTask];
};
const addTask = () => {
  if (!titleTaskEl.value || !descriptionTaskEl.value) {
    return alert('Please enter both a title and a description');
  }

  const newTask = createTask(titleTaskEl.value, descriptionTaskEl.value);
  const updateTasks = addTaskToList(tasks, newTask);
  tasks = updateTasks;

  saveToLocalStorage();
  noTasksMessage();
  displayTasks(newTask);
  showNotification('Task added successfully!');
  resetForm();
};

// Edit Task
const editTaskInList = (tasks, id, title, description) => {
  return tasks.map((task) =>
    task.id === id ? { ...task, title, description } : task
  );
};
const editTask = (taskEl) => {
  const titleEl = taskEl.querySelector('.task-title');
  const descriptionEl = taskEl.querySelector('.task-description');
  const btnEditEl = taskEl.querySelector('.btn-edit');
  const newTitle = titleEl.textContent;
  const newDescription = descriptionEl.textContent;

  const id = taskEl.dataset.id;
  const updateTasks = editTaskInList(tasks, id, newTitle, newDescription);

  tasks = updateTasks;
  saveToLocalStorage();
  updateTaskUI(btnEditEl, titleEl, descriptionEl);
};

// Complate Task
const toggleTaskComplate = (tasks, id) => {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
};
const completeTask = (taskEl) => {
  const btnCompleteEl = taskEl.querySelector('.btn-completed');
  const id = taskEl.dataset.id;
  const index = tasks.findIndex((task) => task.id === id);

  const updateTasks = toggleTaskComplate(tasks, id);

  tasks = updateTasks;
  updateCompleteButtonUI(btnCompleteEl, tasks[index].completed);
  showNotification(
    tasks[index].completed
      ? 'Task marked as complete!'
      : 'Task marked as incomplete!'
  );
  saveToLocalStorage();
};

// Delete Task
const deleteTaskFromList = (tasks, id) => {
  return tasks.filter((task) => task.id !== id);
};
const deleteTask = (id) => {
  const updateTasks = deleteTaskFromList(tasks, id);

  tasks = updateTasks;
  saveToLocalStorage();
  renderTasks();
  showNotification('Task deleted successfully!');
};

//////////////////////////////////////////////////////////
// DOM Event Listener
//////////////////////////////////////////////////////////
btnAdd.addEventListener('click', (e) => {
  e.preventDefault();

  addTask();
});

taskListEl.addEventListener('click', (e) => {
  // Handle edit task
  if (e.target.classList.contains('btn-edit')) {
    const taskEl = e.target.closest('li');
    editTask(taskEl);
  }

  // Handle complete task
  if (e.target.classList.contains('btn-completed')) {
    const taskEl = e.target.closest('li');
    completeTask(taskEl);
  }

  // Handle delete task
  if (e.target.classList.contains('btn-delete')) {
    const id = e.target.closest('li').dataset.id;
    deleteTask(id);
  }
});

//////////////////////////////////////////////////////////
// Init
//////////////////////////////////////////////////////////
(() => {
  renderTasks();
})();
