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
    let hechas = 0;
    let nohechas = 0;

    tasks.filter(task => task.date === selectedDate).forEach(task => {
        displayTask(task.text, task.date, task.time, task.estado);
    });

    tasks.forEach(task => {
        if (task.estado === "hecha") hechas++;
        else if (task.estado === "no hecha") nohechas++;
    });

    document.getElementById("hechasCount").textContent = hechas;
    document.getElementById("nopuseCount").textContent = nohechas;
}

function addTask() {
    const input = document.getElementById('taskInput');
    const date = document.getElementById('taskDate').value;
    const time = document.getElementById('taskTime').value || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const text = input.value.trim();
    if (!text || !date) return;

    displayTask(text, date, time, "pendiente");
    saveTask(text, date, time, "pendiente");
    input.value = '';
}

function displayTask(text, date, time, estado) {
    const list = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = estado === "hecha" ? "completed" : "";

    li.innerHTML = `
        <div>
            <strong>${text}</strong><br>
            <small>🕒 ${time} | 📅 ${date}</small>
        </div>
        <div>
            <select onchange="cambiarEstado(this)" data-text="${text}" data-time="${time}">
                <option value="pendiente" ${estado === "pendiente" ? "selected" : ""}>Pendiente</option>
                <option value="hecha" ${estado === "hecha" ? "selected" : ""}>Hecha</option>
                <option value="no hecha" ${estado === "no hecha" ? "selected" : ""}>No hecha</option>
            </select>
            <button onclick="removeTask(this)">🗑️</button>
        </div>
    `;
    list.appendChild(li);
}

function saveTask(text, date, time, estado) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, date, time, estado });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function removeTask(button) {
    const li = button.closest('li');
    const text = li.querySelector('strong').innerText;
    const time = li.querySelector('small').innerText.split('|')[0].replace('🕒 ', '').trim();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => !(task.text === text && task.time === time));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function cambiarEstado(select) {
    const estado = select.value;
    const text = select.dataset.text;
    const time = select.dataset.time;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task =>
        task.text === text && task.time === time
            ? { ...task, estado: estado }
            : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}
