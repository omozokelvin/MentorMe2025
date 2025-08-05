// Load todos from localStorage if they exist, otherwise initialize empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];



const renderTodoItems = () => {
    // Clear existing content before re-rendering
    renderTodo.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        if (todo.completed) {
            todoItem.classList.add('completed');
        }
        todoItem.setAttribute('data-index', index);
        
        // Format the date for display
        const formattedDate = todo.date ? new Date(todo.date).toLocaleDateString() : 'No date';
        
        todoItem.innerHTML = `
        <div class="todo-container">
            <div class="todo-lis">
                <ul id="todo-${index}">
                    <li>${index + 1}</li>
                    <li>${todo.todoItem || 'No task'}</li>
                    <li><strong>Priority:</strong> <span class="priority-${todo.priority || 'none'}">${todo.priority ? todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1) : 'Not set'}</span></li>
                    <li><strong>Due:</strong> ${formattedDate}</li>
                </ul>
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
        
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this todo?')) {
                deleteTodo(index);
            }
        });
        editBtn.addEventListener('click', () => editTodo(index));
        
        checkbox.addEventListener('change', (e) => {
            const isCompleted = e.target.checked;
            todos[index].completed = isCompleted;
            
            // Toggle the completed class on the todo item
            if (isCompleted) {
                todoItem.classList.add('completed');
            } else {
                todoItem.classList.remove('completed');
            }
            
            saveTodos();
        });
        
        renderTodo.appendChild(todoItem);
    });
}

// Function to save todos to localStorage
const saveTodos = () =>{
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoItems();
}

// Function to delete a todo
const deleteTodo = (index) => {
    todos.splice(index, 1);
    saveTodos();
}

// Function to edit a todo
const editTodo = (index) => {
    const newText = prompt('Edit your todo:', todos[index].todoItem);
    if (newText !== null && newText.trim() !== '') {
        todos[index].todoItem = newText.trim();
        saveTodos();
    }
}

// Function to display table on form submit
const form = document.querySelector('form')
const renderTodo = document.querySelector('#todo-contents')
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

// Initial render of existing todos
renderTodoItems()
