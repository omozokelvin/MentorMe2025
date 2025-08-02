// DOM elements
const input = document.querySelector('.task-input');
const addBtn = document.querySelector('.add-btn');
const list = document.querySelector('.task-list');
const filters = document.querySelectorAll('.filter-btn');
const message = document.querySelector('.empty-message');
const taskCount = document.querySelector('.task-count');
const clearBtn = document.querySelector('.clear-btn');

// Optional: Fun placeholder tips
const placeholderTips = [
  "What needs to be done?",
  "Buy groceries",
  "Call mum",
  "Finish homework",
  "Clean your room",
  "Do 10 pushups 👀",
  "Think about your future"
];
input.placeholder = placeholderTips[Math.floor(Math.random() * placeholderTips.length)];

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks
const save = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Show tasks
const showTasks = (filter = 'all') => {
  list.innerHTML = '';

  let filtered = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.done;
    if (filter === 'completed') return task.done;
  });

  message.style.display = filtered.length ? 'none' : 'block';

  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task ${task.done ? 'completed' : ''}`;

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    span.onclick = () => toggle(index);

    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.textContent = '🗑';
    btn.onclick = () => remove(index);

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });

  // Update task count
  const count = tasks.filter(t => !t.done).length;
  taskCount.textContent = tasks.length === 0
    ? 'No tasks yet'
    : `${count} task${count !== 1 ? 's' : ''} left`;
}

// Add task
function addTask() {
  const text = input.value.trim();

  if (text === '') {
    input.classList.add('error');
    return;
  }

  if (tasks.some(task => task.text.toLowerCase() === text.toLowerCase())) {
    alert("Task already exists!");
    return;
  }

  tasks.push({ text, done: false });
  input.value = '';
  input.classList.remove('error');
  save();
  showTasks(getFilter());
}

// Toggle complete/incomplete
function toggle(index) {
  tasks[index].done = !tasks[index].done;
  save();
  showTasks(getFilter());
}

// Delete task
function remove(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    save();
    showTasks(getFilter());
  }
}

// Get current filter
function getFilter() {
  return document.querySelector('.filter-btn.active').dataset.filter;
}

// Clear all tasks
clearBtn.onclick = () => {
  if (confirm("Clear ALL tasks?")) {
    tasks = [];
    save();
    showTasks(getFilter());
  }
};

// Remove error class when typing
input.addEventListener('input', () => {
  if (input.classList.contains('error') && input.value.trim() !== '') {
    input.classList.remove('error');
  }
});

// Filter buttons
filters.forEach(button => {
  button.onclick = () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    button.classList.add('active');
    showTasks(button.dataset.filter);
  };
});

// Add via button or Enter key
addBtn.onclick = addTask;
input.onkeydown = e => {
  if (e.key === 'Enter') addTask();
};

// Initial load
showTasks();
