document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDate').value = today;
    document.getElementById('dateFilter').value = today;
    loadTasks();
});

function loadTasks() {
    const selectedDate = document.getElementById('dateFilter').value;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.filter(task => task.date === selectedDate).forEach(task => {
        displayTask(task.text, task.date, task.time, task.completed);
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const date = document.getElementById('taskDate').value;
    const time = document.getElementById('taskTime').value;
    const text = input.value.trim();
    if (!text || !date) return;

    displayTask(text, date, time, false);
    saveTask(text, date, time, false);
    input.value = '';
}

function displayTask(text, date, time, completed) {
    const list = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = completed ? 'completed' : '';
    li.innerHTML = `
        <div onclick="toggleTask(this)">
            <strong>${text}</strong><br>
            <small>${date} ${time}</small>
        </div>
        <button onclick="removeTask(this)">🗑️</button>
    `;
    list.appendChild(li);
}

function saveTask(text, date, time, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, date, time, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function removeTask(button) {
    const li = button.parentElement;
    const text = li.querySelector('strong').innerText;
    const time = li.querySelector('small').innerText.split(' ')[1];
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTasks = tasks.filter(task => !(task.text === text && task.time === time));
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    li.remove();
}

function toggleTask(div) {
    const li = div.parentElement;
    const text = div.querySelector('strong').innerText;
    const time = div.querySelector('small').innerText.split(' ')[1];

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task =>
        task.text === text && task.time === time
            ? { ...task, completed: !task.completed }
            : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    li.classList.toggle('completed');
}
