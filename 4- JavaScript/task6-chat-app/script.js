////////////////////////////////////////////
// DOM Elements
////////////////////////////////////////////
const chatsBox = document.getElementById('chatBox');
const messageInput = document.getElementById('message');
const btnSend = document.querySelector('.btn-send');

////////////////////////////////////////////
// UI Helpers
////////////////////////////////////////////
const displayMessage = (message, sender = 'You') => {
  const div = document.createElement('div');
  div.className = `message ${sender === 'You' ? 'sent' : 'received'}`;
  div.textContent = `${sender}: ${message}`;
  chatsBox.appendChild(div);
  chatsBox.scrollTop = chatsBox.scrollHeight;
};

////////////////////////////////////////////
// Chats Logic
////////////////////////////////////////////
const sendMessage = async (e) => {
  e.preventDefault();

  const newMessage = messageInput.value.trim();
  const isSocketReady = socket.readyState === WebSocket.OPEN;
  if (!newMessage || !isSocketReady) return;

  socket.send(newMessage);
  displayMessage(newMessage, 'You');
  messageInput.value = '';
};

////////////////////////////////////////////
// WebSocket Connection
////////////////////////////////////////////
// Open a connection
const socket = new WebSocket('wss://ws.postman-echo.com/raw');

// Send Message
btnSend.addEventListener('click', sendMessage);

// Receive Message
socket.addEventListener('message', (e) => {
  const msg = e.data;
  displayMessage(msg, 'Fares');
});
