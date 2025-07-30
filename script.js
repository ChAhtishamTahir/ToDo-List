const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

window.onload = renderTasks;

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  const tasks = getTasks();
  tasks.push({ text: text, completed: false });
  saveTasks(tasks);
  renderTasks();
  taskInput.value = "";
});

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
    
    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div>
        <button class="complete-btn">✓</button>
        <button class="edit-btn">✏️</button>
        <button class="up-btn">⬆</button>
        <button class="down-btn">⬇</button>
        <button class="delete-btn">✕</button>
      </div>
    `;

    // Complete Task
    li.querySelector(".complete-btn").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks(tasks);
      renderTasks();
    });

    // Edit Task
    li.querySelector(".edit-btn").addEventListener("click", () => {
      const newText = prompt("Edit your task:", tasks[index].text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks(tasks);
        renderTasks();
      }
    });

    // Delete Task
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks();
    });

    // Move Up
    li.querySelector(".up-btn").addEventListener("click", () => {
      if (index === 0) return;
      [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
      saveTasks(tasks);
      renderTasks();
    });

    // Move Down
    li.querySelector(".down-btn").addEventListener("click", () => {
      if (index === tasks.length - 1) return;
      [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
      saveTasks(tasks);
      renderTasks();
    });

    taskList.appendChild(li);
  });
}
