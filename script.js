let taskId = 0;

// Load saved tasks
window.onload = function () {
    loadTasks();
};

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") return;

    createTask(taskText, "todo");
    saveTasks();
    input.value = "";
}

function createTask(text, columnId) {
    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    task.id = "task-" + taskId++;
    task.innerText = text;

    task.ondragstart = drag;

    document.getElementById(columnId).appendChild(task);
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const task = document.getElementById(taskId);

    if (event.target.classList.contains("column")) {
        event.target.appendChild(task);
    } else {
        event.target.closest(".column").appendChild(task);
    }

    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    const columns = ["todo", "inprogress", "done"];
    const data = {};

    columns.forEach(column => {
        const tasks = [...document.getElementById(column).querySelectorAll(".task")];
        data[column] = tasks.map(task => task.innerText);
    });

    localStorage.setItem("tasks", JSON.stringify(data));
}

// Load tasks from localStorage
function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (!saved) return;

    Object.keys(saved).forEach(column => {
        saved[column].forEach(taskText => {
            createTask(taskText, column);
        });
    });
}

// Dark mode toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
