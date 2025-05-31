////////////////////////////////////////////
// DOM Elements
////////////////////////////////////////////
const postContainer = document.querySelector('.posts');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn__close-modal');
const showModal = document.querySelector('.add-post');
const spinnerEl = document.querySelector('.spinner');

const postTitleInput = document.getElementById('post-title');
const postBodyInput = document.getElementById('post-body');
const btnAddPost = document.querySelector('.btn__add-post');

const API_URL = 'https://jsonplaceholder.typicode.com';

////////////////////////////////////////////
// API Logic
////////////////////////////////////////////

// Fetch Posts from API
const fetchPosts = async () => {
  loadingSpinner(false);

  const res = await fetch(`${API_URL}/posts`);

  if (!res.ok) {
    loadingSpinner(true);
    return postContainer.insertAdjacentHTML(
      'beforeend',
      '<p class="error">Something Wrong error</p>'
    );
  }

  const posts = await res.json();
  loadingSpinner(true);

  posts.forEach(displayPost);
};

// Add Post to API (client-side only)
const addPost = async () => {
  const newPost = {
    userId: Math.round(Math.random() * 30 + 1),
    title: postTitleInput.value,
    body: postBodyInput.value,
  };

  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) {
    return showNotification('Faild to fetch');
  }

  const data = await res.json();

  displayPost(data);
  document.querySelector('.error')?.remove();
  showNotification('Successfully Add Post');
  closeModal();
};

////////////////////////////////////////////
// Modal Logic
////////////////////////////////////////////
// Open Modal
const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Close Modal
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  updateUIForm();
};

// Try Closing with confirmation
const tryCloseModal = () => {
  let isCloseModal;

  if (postTitleInput.value.trim() || postBodyInput.value.trim()) {
    isCloseModal = confirm('Are you close modal?');
    if (!isCloseModal) return;
  }

  closeModal();
};

////////////////////////////////////////////
// DOM Event Listeners
////////////////////////////////////////////
showModal.addEventListener('click', openModal);
overlay.addEventListener('click', tryCloseModal);
btnCloseModal.addEventListener('click', tryCloseModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    tryCloseModal();
  }
});

// Button to Add Post
btnAddPost.addEventListener('click', (e) => {
  e.preventDefault();

  if (!postTitleInput.value.trim() || !postBodyInput.value.trim()) return;

  addPost();
});

////////////////////////////////////////////
// UI Helpers
////////////////////////////////////////////
// Display posts
const displayPost = (post) => {
  const markup = `
  <div class="post" data-id="${post.id}" data-user-id="${post.userId}">
  <h2 class="post-title">${post.title}</h2>
  <p class="post-description">${post.body}</p>
  </div>
  `;

  postContainer.insertAdjacentHTML('afterbegin', markup);
};

// Update UI Form
const updateUIForm = () => {
  postTitleInput.value = '';
  postBodyInput.value = '';
};

// Display Spinner
const loadingSpinner = (force) => {
  spinnerEl.classList.toggle('hidden', force);
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

////////////////////////////////////////////
// Init
(() => {
  fetchPosts();
})();
