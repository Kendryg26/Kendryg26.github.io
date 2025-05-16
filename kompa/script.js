document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => displayTask(task.text, task.completed));
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (!text) return;

    displayTask(text, false);
    saveTask(text, false);
    input.value = '';
}

function displayTask(text, completed) {
    const list = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = completed ? 'completed' : '';
    li.innerHTML = `
        <span onclick="toggleTask(this)">${text}</span>
        <button onclick="removeTask(this)">🗑️</button>
    `;
    list.appendChild(li);
}

function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(button) {
    const li = button.parentElement;
    const text = li.querySelector('span').innerText;
    li.remove();

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTask(span) {
    const li = span.parentElement;
    li.classList.toggle('completed');

    const text = span.innerText;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.text === text ? { ...task, completed: !task.completed } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}