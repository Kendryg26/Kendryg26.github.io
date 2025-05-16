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
    const time = document.getElementById('taskTime').value || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        <div>
            <strong>${text}</strong><br>
            <small>🕒 ${time} | 📅 ${date}</small>
        </div>
        <div>
            <button class="hecha-btn" onclick="toggleTask(this)">Hecha</button>
            <button onclick="removeTask(this)">🗑️</button>
        </div>
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
    const li = button.closest('li');
    const text = li.querySelector('strong').innerText;
    const time = li.querySelector('small').innerText.split('|')[0].replace('🕒 ', '').trim();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTasks = tasks.filter(task => !(task.text === text && task.time === time));
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    li.remove();
}

function toggleTask(button) {
    const li = button.closest('li');
    const text = li.querySelector('strong').innerText;
    const time = li.querySelector('small').innerText.split('|')[0].replace('🕒 ', '').trim();

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task =>
        task.text === text && task.time === time
            ? { ...task, completed: !task.completed }
            : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    li.classList.toggle('completed');
}
