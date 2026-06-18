/* ==========================================
   DOMFLOW PRO - TASK MANAGER
   Vanilla JavaScript Only
   Covers:
   - DOM Manipulation
   - Event Handling
   - Event Delegation
   - Event Bubbling
   - Event Capturing
   - Attributes vs Properties
   - Local Storage
   - DocumentFragment
========================================== */

/* ==========================================
   ELEMENTS
========================================== */

const taskInput = document.getElementById("taskInput");
const taskCategory = document.getElementById("taskCategory");
const addTaskBtn = document.getElementById("addTask");

const taskContainer = document.getElementById("taskContainer");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const clearAllBtn = document.getElementById("clearAll");

const searchTask = document.getElementById("searchTask");
const filterCategory = document.getElementById("filterCategory");

const themeToggle = document.getElementById("themeToggle");

const compareBtn = document.getElementById("compareBtn");
const demoInput = document.getElementById("demoInput");
const comparisonResult = document.getElementById("comparisonResult");

const eventLogs = document.getElementById("eventLogs");

let tasks = [];

// LOAD DATA

window.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  loadTheme();
  renderTasks();
});

//THEME TOGGLE

themeToggle.addEventListener("click", () => {
  const html = document.documentElement;

  const currentTheme = html.dataset.theme;

  if (currentTheme === "light") {
    html.dataset.theme = "dark";

    // Using setAttribute()
    html.setAttribute("data-theme", "dark");

    themeToggle.textContent = "☀️ Light Mode";
  } else {
    html.dataset.theme = "light";

    html.setAttribute("data-theme", "light");

    themeToggle.textContent = "🌙 Dark Mode";
  }

  localStorage.setItem("theme", html.dataset.theme);
});

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;

    if (savedTheme === "dark") {
      themeToggle.textContent = "☀️ Light Mode";
    }
  }
}

//Add Task

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const title = taskInput.value.trim();
  const category = taskCategory.value;

  if (!title) {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    category,
    status: "pending",
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  taskInput.value = "";
}

//create task card

function createTaskCard(task) {
  const card = document.createElement("div");

  card.className = "task-card";

  card.setAttribute("data-id", task.id);
  card.setAttribute("data-status", task.status);
  card.setAttribute("data-category", task.category);

  // dataset demo
  card.dataset.id = task.id;
  card.dataset.status = task.status;
  card.dataset.category = task.category;

  if (task.status === "completed") {
    card.classList.add("completed");
  }

  const title = document.createElement("h3");
  title.appendChild(document.createTextNode(task.title));

  const category = document.createElement("p");
  category.appendChild(
    document.createTextNode(`Category: ${task.category}`)
  );

  const actionDiv = document.createElement("div");
  actionDiv.className = "actions";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";

  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.textContent = "Complete";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  actionDiv.append(editBtn, completeBtn, deleteBtn);

  card.append(title, category, actionDiv);

  return card;
}

//render task

function renderTasks() {
  taskContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  const searchValue = searchTask.value.toLowerCase();
  const selectedCategory = filterCategory.value;

  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title
      .toLowerCase()
      .includes(searchValue);

    const categoryMatch =
      selectedCategory === "all" ||
      task.category === selectedCategory;

    return titleMatch && categoryMatch;
  });

  filteredTasks.forEach((task) => {
    fragment.appendChild(createTaskCard(task));
  });

  taskContainer.appendChild(fragment);

  updateStats();
}

//event delegation

taskContainer.addEventListener("click", (e) => {
  const taskCard = e.target.closest(".task-card");

  if (!taskCard) return;

  const id = Number(taskCard.dataset.id);

  // delete
  if (e.target.classList.contains("delete-btn")) {
    deleteTask(id);
  }

  // complete
  if (e.target.classList.contains("complete-btn")) {
    completeTask(id);
  }

  // edit
  if (e.target.classList.contains("edit-btn")) {
    editTask(id);
  }
});

//delete task

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();
  renderTasks();
}

//complete task

function completeTask(id) {
  const task = tasks.find((task) => task.id === id);

  if (!task) return;

  task.status =
    task.status === "completed"
      ? "pending"
      : "completed";

  saveTasks();
  renderTasks();
}

//edit task

function editTask(id) {
  const task = tasks.find((task) => task.id === id);

  if (!task) return;

  const newTitle = prompt(
    "Edit Task",
    task.title
  );

  if (newTitle !== null && newTitle.trim() !== "") {
    task.title = newTitle.trim();

    saveTasks();
    renderTasks();
  }
}
//counter task

function updateStats() {
  totalCount.textContent = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  completedCount.textContent = completed;

  pendingCount.textContent =
    tasks.length - completed;
}

// search

searchTask.addEventListener("input", renderTasks);

//filter

filterCategory.addEventListener(
  "change",
  renderTasks
);

//clear all

clearAllBtn.addEventListener("click", () => {
  if (
    confirm(
      "Are you sure you want to delete all tasks?"
    )
  ) {
    tasks = [];

    saveTasks();
    renderTasks();
  }
});

//local storage

function saveTasks() {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function loadTasks() {
  const savedTasks =
    localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}
//attribute and property

compareBtn.addEventListener("click", () => {
  const propertyValue = demoInput.value;

  const attributeValue =
    demoInput.getAttribute("value");

  comparisonResult.innerHTML = `
        <strong>Property Value:</strong>
        ${propertyValue}
        <br><br>

        <strong>Attribute Value:</strong>
        ${attributeValue}
    `;

  console.log(
    "Property Value:",
    propertyValue
  );

  console.log(
    "Attribute Value:",
    attributeValue
  );
});

//attrtibute method

function attributeDemo() {
  const box = document.createElement("div");

  box.setAttribute(
    "data-demo",
    "attribute-example"
  );

  console.log(
    "getAttribute:",
    box.getAttribute("data-demo")
  );

  console.log(
    "hasAttribute:",
    box.hasAttribute("data-demo")
  );

  box.removeAttribute("data-demo");

  console.log(
    "After remove:",
    box.hasAttribute("data-demo")
  );
}

attributeDemo();

//dom manipulation method

const appendDemo =
  document.getElementById("appendDemo");

const prependDemo =
  document.getElementById("prependDemo");

const beforeDemo =
  document.getElementById("beforeDemo");

const afterDemo =
  document.getElementById("afterDemo");

const replaceDemo =
  document.getElementById("replaceDemo");

const removeDemo =
  document.getElementById("removeDemo");

appendDemo.addEventListener("click", () => {
  const target =
    document.getElementById("demoBox");

  if (!target) return;

  const span =
    document.createElement("span");

  span.textContent = " [append()] ";

  target.append(span);
});

prependDemo.addEventListener("click", () => {
  const target =
    document.getElementById("demoBox");

  if (!target) return;

  const span =
    document.createElement("span");

  span.textContent = " [prepend()] ";

  target.prepend(span);
});

beforeDemo.addEventListener("click", () => {
  const target =
    document.getElementById("demoBox");

  if (!target) return;

  const div =
    document.createElement("div");

  div.textContent = "before() Element";

  target.before(div);
});

afterDemo.addEventListener("click", () => {
  const target =
    document.getElementById("demoBox");

  if (!target) return;

  const div =
    document.createElement("div");

  div.textContent = "after() Element";

  target.after(div);
});

replaceDemo.addEventListener("click", () => {
  const target =
    document.getElementById("demoBox");

  if (!target) return;

  const newElement =
    document.createElement("div");

  newElement.id = "demoBox";

  newElement.textContent =
    "Element Replaced Successfully";

  target.replaceWith(newElement);
});

removeDemo.addEventListener("click", () => {
  const target =
    document.getElementById("demoBox");

  if (!target) return;

  target.remove();
});

//event delegation

const grandparent =
  document.querySelector(".grandparent");

const parent =
  document.querySelector(".parent");

const child =
  document.querySelector(".child");

//capturing phase

grandparent.addEventListener(
  "click",
  () => {
    console.log("Capturing: Grandparent");
  },
  true
);

parent.addEventListener(
  "click",
  () => {
    console.log("Capturing: Parent");
  },
  true
);

child.addEventListener(
  "click",
  () => {
    console.log("Capturing: Child");
  },
  true
);

//bubbling phase

grandparent.addEventListener("click", () => {
  console.log("Bubbling: Grandparent");
});

parent.addEventListener("click", () => {
  console.log("Bubbling: Parent");
});

child.addEventListener("click", () => {
  console.log("Bubbling: Child");

  eventLogs.innerHTML = `
        <strong>Check Console:</strong><br>
        Capturing:
        Grandparent → Parent → Child
        <br><br>
        Bubbling:
        Child → Parent → Grandparent
    `;
});

console.log(
  "DOMFlow Pro Loaded Successfully 🚀"
);
