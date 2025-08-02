const form = document.querySelector('form')

// Load todos from localStorage if they exist, otherwise initialize empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];


form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('form submitted successfully')

    const formData = new FormData(form);

    const todo = Object.fromEntries(formData.entries());
    console.log(todo)

    todos.push(todo)
    console.log(todos)
    
    // Save to localStorage
    localStorage.setItem('todos', JSON.stringify(todos))
    
    renderTodoItems()
    form.reset()

})

// Function to display table
const renderTodo = document.querySelector('#todo-contents')

// Initial render of existing todos
renderTodoItems()

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoItems();
}

// Function to delete a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
}

// Function to edit a todo
function editTodo(index) {
    const newText = prompt('Edit your todo:', todos[index].todoItem);
    if (newText !== null && newText.trim() !== '') {
        todos[index].todoItem = newText.trim();
        saveTodos();
    }
}

function renderTodoItems() {
    // Clear existing content before re-rendering
    renderTodo.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.setAttribute('data-index', index);
        
        todoItem.innerHTML = `
        <div class="todo-container">
            <div class="todo-lis">
                <ul id="todo-${index}">${todo.todoItem}</ul>
            </div>
            
            <div class="list-status">
                <label>
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} class="completed-checkbox">
                    <span>completed</span>
                </label>
                <div class="todo-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        </div>`;
        
        // Add event listeners for the buttons
        const deleteBtn = todoItem.querySelector('.delete-btn');
        const editBtn = todoItem.querySelector('.edit-btn');
        const checkbox = todoItem.querySelector('.completed-checkbox');
        
        deleteBtn.addEventListener('click', () => deleteTodo(index));
        editBtn.addEventListener('click', () => editTodo(index));
        
        checkbox.addEventListener('change', (e) => {
            todos[index].completed = e.target.checked;
            saveTodos();
        });
        
        renderTodo.appendChild(todoItem);
    });
}