const taskListEl = document.querySelector('.tasks-list ul');
const titleTaskEl = document.querySelector('input');
const descriptionTaskEl = document.querySelector('textarea');
const noTasksMessageEl = document.querySelector('.no-tasks-message');

const btnAdd = document.querySelector('.btn-add');

// const tasks = [
//   {
//     id: '1',
//     title: 'Finish homework',
//     description: 'Complete math and science assignments before 5 PM',
//     completed: false,
//   },
//   {
//     id: '2',
//     title: 'Buy groceries',
//     description: 'Milk, eggs, bread, and vegetables',
//     completed: true,
//   },
//   {
//     id: '3',
//     title: 'Call Ahmed',
//     description: 'Discuss the project meeting schedule',
//     completed: false,
//   },
//   {
//     id: '4',
//     title: 'Clean the room',
//     description: 'Organize desk and vacuum the floor',
//     completed: true,
//   },
// ];

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

  noTasksMessage();
};

const renderTasks = () => {
  taskListEl.innerHTML = '';

  noTasksMessage();

  tasks.forEach((task) => {
    displayTasks(task);
  });
};

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

const addTask = () => {
  if (!titleTaskEl.value || !descriptionTaskEl.value) {
    return alert('Please enter both a title and a description');
  }

  const newTask = {
    // id: tasks.length + 1 + '',
    id: Date.now() + '',
    title: titleTaskEl.value,
    description: descriptionTaskEl.value,
    completed: false,
  };

  tasks.push(newTask);
  saveToLocalStorage();
  displayTasks(newTask);
  resetForm();
};

const completeTask = (taskEl) => {
  const btnCompleteEl = taskEl.querySelector('.btn-completed');
  const id = taskEl.dataset.id;
  const index = tasks.findIndex((task) => task.id === id);

  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed;
    updateCompleteButtonUI(btnCompleteEl, tasks[index].completed);
    saveToLocalStorage();
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
    btn.textContent = 'Edit';
  }
};

const editTask = (taskEl) => {
  const titleEl = taskEl.querySelector('.task-title');
  const descriptionEl = taskEl.querySelector('.task-description');
  const btnEditEl = taskEl.querySelector('.btn-edit');
  const id = taskEl.dataset.id;
  const index = tasks.findIndex((task) => task.id === id);

  if (index !== -1) {
    tasks[index].title = titleEl.textContent;
    tasks[index].description = descriptionEl.textContent;
    saveToLocalStorage();

    updateTaskUI(btnEditEl, titleEl, descriptionEl);
  }
};

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
    saveToLocalStorage();
    renderTasks();
  }
};

btnAdd.addEventListener('click', (e) => {
  e.preventDefault();

  addTask();
});

taskListEl.addEventListener('click', (e) => {
  // Handle delete task
  if (e.target.classList.contains('btn-delete')) {
    const id = e.target.closest('li').dataset.id;
    deleteTask(id);
  }

  // Handle complete task
  if (e.target.classList.contains('btn-completed')) {
    const taskEl = e.target.closest('li');
    completeTask(taskEl);
  }

  // Handle edit task
  if (e.target.classList.contains('btn-edit')) {
    const taskEl = e.target.closest('li');
    editTask(taskEl);
  }
});

const init = () => {
  renderTasks();
};

init();
