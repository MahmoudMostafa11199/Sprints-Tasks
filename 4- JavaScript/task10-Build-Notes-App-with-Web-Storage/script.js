//////////////////////////////////////////////////////////
// DOM Elements
//////////////////////////////////////////////////////////
const notesContainer = document.querySelector('.notes-list ul');
const titleNoteEl = document.getElementById('title');
const descriptionNoteEl = document.getElementById('description');
const noNotesMessageEl = document.querySelector('.no-notes-message');

const btnAdd = document.querySelector('.btn-add');

//////////////////////////////////////////////////////////
// Initial Data Setup
//////////////////////////////////////////////////////////
let notes = JSON.parse(localStorage.getItem('notes')) || [];

//////////////////////////////////////////////////////////
// Storage & Data Helpers
//////////////////////////////////////////////////////////
const saveToLocalStorage = () => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

const noNotesMessage = () => {
  if (!notes.length) {
    noNotesMessageEl.classList.remove('hidden');
  } else {
    noNotesMessageEl.classList.add('hidden');
  }
};

const resetForm = () => {
  titleNoteEl.value = '';
  descriptionNoteEl.value = '';
};

//////////////////////////////////////////////////////////
// UI Rendering
//////////////////////////////////////////////////////////
const displayNote = ({ id, title, description }) => {
  const markup = `
    <li class="note-item" data-id=${id}>
      <h4 class="note-title">${title}</h4>
      <p class="note-description">${description}</p>
      <div class="buttons">
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-delete">Delete</button>
      </div>
    </li>
    `;

  notesContainer.insertAdjacentHTML('beforeend', markup);
};

const renderNotes = () => {
  notesContainer.innerHTML = '';

  noNotesMessage();

  renderNoteRecursive(notes);
};

const renderNoteRecursive = (notes, i = 0) => {
  if (i >= notes.length) return;
  displayNote(notes[i]);
  renderNoteRecursive(notes, i + 1);
};

//////////////////////////////////////////////////////////
// UI Interaction Helpers
//////////////////////////////////////////////////////////
const updateNoteUI = (btnEdit, title, description) => {
  if (btnEdit.textContent == 'Edit') {
    btnEdit.textContent = 'Save';
    title.setAttribute('contenteditable', true);
    description.setAttribute('contenteditable', true);
    title.focus();
  } else {
    btnEdit.textContent = 'Edit';
    title.setAttribute('contenteditable', false);
    description.setAttribute('contenteditable', false);
    showNotification('Task updated successfully!');
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
      background: 'linear-gradient(to right,#f34235,#b62a20)',
    },
  }).showToast();
};

//////////////////////////////////////////////////////////
// Notes Logic
//////////////////////////////////////////////////////////
// Add Note
const createNote = (title, description) => {
  return {
    id: Date.now() + '',
    title,
    description,
  };
};
const addNoteToList = (notes, newNote) => {
  return [...notes, newNote];
};
const addNote = () => {
  if (!titleNoteEl.value || !descriptionNoteEl.value) {
    return showNotification('Please enter both a title and a description');
  }

  const newNote = createNote(titleNoteEl.value, descriptionNoteEl.value);
  const updateNotes = addNoteToList(notes, newNote);
  notes = updateNotes;

  saveToLocalStorage();
  noNotesMessage();
  showNotification('Note added successfully!');
  displayNote(newNote);
  resetForm();
};

// Edit Note
const editNoteInList = (notes, id, title, description) => {
  return notes.map((note) =>
    note.id === id ? { ...note, title, description } : note
  );
};
const editNote = (noteEl) => {
  const titleEl = noteEl.querySelector('.note-title');
  const descriptionEl = noteEl.querySelector('.note-description');
  const btnEditEl = noteEl.querySelector('.btn-edit');

  const newTitle = titleEl.textContent;
  const newDescription = descriptionEl.textContent;

  const id = noteEl.dataset.id;
  const updateNotes = editNoteInList(notes, id, newTitle, newDescription);

  notes = updateNotes;
  saveToLocalStorage();
  updateNoteUI(btnEditEl, titleEl, descriptionEl);
};

// Delete Note
const deleteNoteFromList = (notes, id) => {
  return notes.filter((note) => note.id !== id);
};
const deleteNote = (id) => {
  const updateNotes = deleteNoteFromList(notes, id);

  notes = updateNotes;
  saveToLocalStorage();
  renderNotes();
  showNotification('Note deleted successfully!');
};

//////////////////////////////////////////////////////////
// DOM Event Listener
//////////////////////////////////////////////////////////
btnAdd.addEventListener('click', (e) => {
  e.preventDefault();

  addNote();
});

notesContainer.addEventListener('click', (e) => {
  // Handle edit note
  if (e.target.classList.contains('btn-edit')) {
    const noteEl = e.target.closest('li');
    editNote(noteEl);
  }

  // Handle delete note
  if (e.target.classList.contains('btn-delete')) {
    const id = e.target.closest('li').dataset.id;
    deleteNote(id);
  }
});

//////////////////////////////////////////////////////////
// Init
//////////////////////////////////////////////////////////
(() => {
  renderNotes();
})();
