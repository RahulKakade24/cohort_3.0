// /*========================================= 1. WORKNEST AUTH SYSTEM =========================================*/ 
// const USERS_KEY = "worknest-users"; 
// const CURRENT_USER_KEY = "worknest-current-user";

// const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || []; 
// const saveUsers = users => localStorage.setItem(USERS_KEY, JSON.stringify(users)); 
// const getCurrentUser = () => JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY));

// /* --- Register Flow --- */
// const registerForm = document.getElementById("registerForm");
// if (registerForm) {
//   registerForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const name = document.getElementById("registerName").value.trim();
//     const email = document.getElementById("registerEmail").value.trim().toLowerCase();
//     const password = document.getElementById("registerPassword").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

//     if (!passwordRegex.test(password)) {
//       alert("Password must contain:\n\n• Minimum 8 characters\n• One uppercase letter\n• One lowercase letter\n• One number\n• One special character");
//       return; 
//     }
//     if (password !== confirmPassword) { 
//       alert("Passwords do not match."); 
//       return;
//     }
//     const users = getUsers(); 
//     if (users.some(user => user.email === email)) { 
//       alert("Email already registered.");
//       return; 
//     }
//     users.push({ id: Date.now(), name, email, password });
//     saveUsers(users);
//     alert("Registration Successful!"); 
//     window.location.href = "login.html"; 
//   });
// }

// /* --- Login Flow --- */
// const loginForm = document.getElementById("loginForm");
// if (loginForm) {
//   loginForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const name = document.getElementById("loginName").value.trim();
//     const password = document.getElementById("loginPassword").value;
//     const remember = document.getElementById("rememberMe").checked;

//     const users = getUsers();
//     const user = users.find(u => u.name === name && u.password === password);
  
//     if (!user) { 
//       alert("Invalid Name or Password."); 
//       return; 
//     }
//     if (remember) { 
//       localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
//     } else { 
//       sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
//     } 
//     alert("Login Successful!"); 
//     window.location.href = "index.html"; 
//   }); 
// }
         
// /* --- Routing & Page Protection --- */
// const currentUser = getCurrentUser(); 
// const page = window.location.pathname;
// const isHomePage = page.endsWith("index.html") || page === "/" || page.endsWith("/");
// const isAuthPage = page.includes("login.html") || page.includes("register.html");

// if (isHomePage && !currentUser) { 
//   window.location.href = "login.html"; 
// }
// if (isAuthPage && currentUser) { 
//   window.location.href = "index.html"; 
// }

// /* --- UI Personalization Display --- */
// document.addEventListener("DOMContentLoaded", () => {
//   if (currentUser) {
//     const headerName = document.getElementById("profileNameSpan"); 
//     const greetingName = document.getElementById("greetingNameSpan");
//     if (headerName) headerName.textContent = currentUser.name; 
//     if (greetingName) greetingName.textContent = currentUser.name; 
//   } 
// });

// /* --- Logout Action --- */
// const logoutBtn = document.querySelector(".logout-btn");
// logoutBtn?.addEventListener("click", () => {
//   if (!confirm("Logout?")) return;
//   localStorage.removeItem(CURRENT_USER_KEY);
//   sessionStorage.removeItem(CURRENT_USER_KEY);
//   window.location.href = "login.html";
// });

// /* --- Input Visibility Toggler --- */
// document.querySelectorAll(".toggle-password").forEach(icon => {
//   icon.addEventListener("click", () => {
//     const input = icon.previousElementSibling;
//     input.type = input.type === "password" ? "text" : "password";
//     icon.classList.toggle("fa-eye"); 
//     icon.classList.toggle("fa-eye-slash"); 
//   });
// });


// /*========================================= 2. LIVE DATE & TIME MODULE =========================================*/
// const TIME_API_URL = "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata";
// const dayElement = document.getElementById("widgetDay");
// const dateElement = document.getElementById("widgetDate");
// const timeElement = document.getElementById("widgetTime");

// const daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// async function syncDashboardClock() {
//   if (!dayElement || !dateElement || !timeElement) return;
//   try {
//     const response = await fetch(TIME_API_URL);
//     if (!response.ok) throw new Error("API rate bound reached");
//     const data = await response.json();
    
//     dayElement.textContent = data.dayOfWeek;
//     dateElement.textContent = `${data.day} ${monthsArray[data.month - 1]} ${data.year}`;
//     timeElement.textContent = data.time;
//   } catch (error) {
//     useLocalClockFallback();
//   }
// }

// function useLocalClockFallback() {
//   const now = new Date();
//   if (dayElement) dayElement.textContent = daysArray[now.getDay()];
//   if (dateElement) dateElement.textContent = `${now.getDate()} ${monthsArray[now.getMonth()]} ${now.getFullYear()}`;
//   if (timeElement) {
//     let hours = now.getHours();
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12 || 12;
//     timeElement.textContent = `${hours}:${minutes} ${ampm}`;
//   }
// }

// if (dayElement) {
//   syncDashboardClock();
//   setInterval(syncDashboardClock, 60000);
// }


// /*========================================= 3. MOTIVATIONAL QUOTES =========================================*/
// const quotes = [ 
//   "Success doesn't come from what you do occasionally. It comes from what you do consistently.", 
//   "Small progress is still progress.", "Dream big. Start small. Act now.", 
//   "Discipline is choosing between what you want now and what you want most.",
//   "Your future is created by what you do today, not tomorrow.", 
//   "Focus on progress, not perfection.", "Stay positive, work hard, and make it happen."
// ];
// const quoteText = document.getElementById("quoteText");
// let currentQuote = -1; 

// function changeQuote(){ 
//   let randomIndex; 
//   do { 
//     randomIndex = Math.floor(Math.random() * quotes.length); 
//   } while (randomIndex === currentQuote);
//   currentQuote = randomIndex; 
//   if (quoteText) quoteText.textContent = quotes[currentQuote];
// }
// if (quoteText) {
//   changeQuote(); 
//   setInterval(changeQuote, 5000);
// }


// /*========================================= 4. DASHBOARD VIEW CONTROLLER =========================================*/
// const featureGrid = document.querySelector(".feature-grid");
// const todoPage = document.getElementById("todo-page");
// const plannerPage = document.getElementById("planner-page");

// // Helper function to turn off all views
// function hideAllPages() {
//   if (featureGrid) featureGrid.style.display = "none";
//   if (todoPage) todoPage.style.display = "none";
//   if (plannerPage) plannerPage.style.display = "none";
// }

// function showDashboardHome() {
//   hideAllPages();
//   if (featureGrid) featureGrid.style.display = "grid";
// }

// // Global generic module back buttons handler
// document.querySelectorAll(".back-btn").forEach(btn => {
//   btn.addEventListener("click", showDashboardHome);
// });


// /*========================================= 5. TODO MODULE =========================================*/ 
// const TODO_STORAGE_KEY = "worknest-todos"; 
// const todoInput = document.getElementById("todoInput");
// const addTodoBtn = document.getElementById("addTodoBtn");
// const searchTodo = document.getElementById("searchTodo");
// const filterTodo = document.getElementById("filterTodo");
// const todoList = document.getElementById("todoList");
// const emptyTodo = document.getElementById("emptyTodo");
// const totalTasks = document.getElementById("totalTasks");
// const activeTasks = document.getElementById("activeTasks");
// const completedTasks = document.getElementById("completedTasks");
// const mainTaskCount = document.getElementById("taskCount");

// let todos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [];

// document.getElementById("openTodoBtn")?.addEventListener("click", () => {
//   hideAllPages();
//   if (todoPage) todoPage.style.display = "block";
//   renderTodos();
// });

// function saveTodos(){
//   localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos)); 
// }

// function addTodo(){ 
//   if (!todoInput) return;
//   const text = todoInput.value.trim();
//   if(text === "") return alert("Please enter a task."); 
//   todos.unshift({ id: Date.now(), text, completed: false });
//   todoInput.value = ""; 
//   saveTodos(); 
//   renderTodos(); 
// }

// function deleteTodo(id){
//   if(!confirm("Delete this task?")) return;
//   todos = todos.filter(todo => todo.id !== id); 
//   saveTodos();
//   renderTodos();
// }

// function toggleTodo(id){ 
//   const todo = todos.find(t => t.id === id); 
//   if(todo) {
//     todo.completed = !todo.completed; 
//     saveTodos(); 
//     renderTodos();
//   }
// }

// function editTodo(id){
//   const todo = todos.find(t => t.id === id); 
//   if(!todo) return;
//   const updated = prompt("Edit Task", todo.text);
//   if(!updated || updated.trim() === "") return;
//   todo.text = updated.trim(); 
//   saveTodos(); 
//   renderTodos(); 
// }

// function updateStats(){ 
//   const activeCount = todos.filter(t => !t.completed).length;
//   if(totalTasks) totalTasks.textContent = todos.length;
//   if(activeTasks) activeTasks.textContent = activeCount; 
//   if(completedTasks) completedTasks.textContent = todos.filter(t => t.completed).length;
//   if(mainTaskCount) mainTaskCount.textContent = activeCount; // Matches metric on homepage
// }

// function renderTodos(){ 
//   if (!todoList) return;
//   todoList.innerHTML = ""; 
//   let search = searchTodo ? searchTodo.value.toLowerCase() : "";
//   let filter = filterTodo ? filterTodo.value : "all";  

//   let filtered = todos.filter(todo => { 
//     const match = todo.text.toLowerCase().includes(search);
//     if(filter === "active") return !todo.completed && match;
//     if(filter === "completed") return todo.completed && match; 
//     return match;
//   });

//   if (emptyTodo) emptyTodo.style.display = filtered.length === 0 ? "block" : "none"; 

//   filtered.forEach(todo => { 
//     const li = document.createElement("li"); 
//     li.className = `todo-item ${todo.completed ? "completed" : ""}`;
//     li.innerHTML = `
//       <div class="todo-left"> 
//         <input type="checkbox" ${todo.completed ? "checked" : ""} > 
//         <span class="task-text ${todo.completed ? "completed" : ""}">${todo.text}</span> 
//       </div> 
//       <div class="todo-actions"> 
//         <button class="edit-btn"><i class="fa-solid fa-pen"></i></button> 
//         <button class="delete-btn"><i class="fa-solid fa-trash"></i></button> 
//       </div>`; 

//     li.querySelector("input").addEventListener("change", () => toggleTodo(todo.id)); 
//     li.querySelector(".edit-btn").addEventListener("click", () => editTodo(todo.id)); 
//     li.querySelector(".delete-btn").addEventListener("click", () => deleteTodo(todo.id)); 
//     todoList.appendChild(li);
//   }); 
//   updateStats();
// }

// addTodoBtn?.addEventListener("click", addTodo);
// todoInput?.addEventListener("keypress", e => { if(e.key === "Enter") addTodo(); });
// searchTodo?.addEventListener("input", renderTodos);
// filterTodo?.addEventListener("change", renderTodos);





// // /*========================================= 6. DAILY PLANNER MODULE =========================================*/
// // const PLANNER_STORAGE_KEY = "worknest-planner-data";
// // const plannerTimelineContainer = document.getElementById("plannerTimelineContainer");
// // const plannerNotesInput = document.getElementById("plannerDayNotesInput");
// // const plannerProgressBar = document.getElementById("plannerProgressBarFill");
// // const plannerProgressText = document.getElementById("plannerProgressPercent");
// // const plannerDateDisplay = document.getElementById("plannerCurrentDateDisplay");
// // const plannerPrevBtn = document.getElementById("plannerPrevDayBtn");
// // const plannerNextBtn = document.getElementById("plannerNextDayBtn");

// // let plannerCurrentDate = new Date();

// // // Load master data object or create an empty container
// // let masterPlannerStore = JSON.parse(localStorage.getItem(PLANNER_STORAGE_KEY)) || {};

// // // Helper function to get an isolated ISO-style string key format: YYYY-MM-DD
// // function getPlannerDateKey() {
// //   const year = plannerCurrentDate.getFullYear();
// //   const month = String(plannerCurrentDate.getMonth() + 1).padStart(2, '0');
// //   const day = String(plannerCurrentDate.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // }

// // // Safely structuralizes or retrieves data specific to the actively viewed date
// // function getCurrentDayData() {
// //   const dateKey = getPlannerDateKey();
// //   if (!masterPlannerStore[dateKey]) {
// //     masterPlannerStore[dateKey] = {
// //       slots: {},
// //       priorities: [{ text: "", done: false }, { text: "", done: false }, { text: "", done: false }],
// //       notes: ""
// //     };
// //   }
// //   return masterPlannerStore[dateKey];
// // }

// // document.getElementById("openPlannerBtn")?.addEventListener("click", () => {
// //   hideAllPages();
// //   if (plannerPage) plannerPage.style.display = "block";
// //   plannerCurrentDate = new Date(); // Start at today
// //   renderPlannerDate();
// // });

// // function renderPlannerDate() {
// //   if (!plannerDateDisplay) return;
// //   const day = plannerCurrentDate.getDate();
// //   const month = monthsArray[plannerCurrentDate.getMonth()];
// //   const year = plannerCurrentDate.getFullYear();
// //   plannerDateDisplay.textContent = `${day} ${month} ${year}`;
  
// //   // Refresh input structures every single time the date alters
// //   initPlannerValues();
// // }

// // function savePlannerData() {
// //   localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(masterPlannerStore));
// //   updatePlannerProgress();
// // }

// // function initPlannerValues() {
// //   const currentDay = getCurrentDayData();

// //   if (plannerNotesInput) plannerNotesInput.value = currentDay.notes || "";

// //   for (let i = 1; i <= 3; i++) {
// //     const checkEl = document.getElementById(`plannerFocusCheck${i}`);
// //     const textEl = document.getElementById(`plannerFocusText${i}`);
// //     if (checkEl && textEl) {
// //       checkEl.checked = currentDay.priorities[i - 1].done;
// //       textEl.value = currentDay.priorities[i - 1].text;
// //     }
// //   }

// //   document.querySelectorAll(".planner-slot-input").forEach(input => {
// //     const row = input.closest(".planner-time-row");
// //     const hour = row ? row.getAttribute("data-hour") : null;
// //     if (hour) {
// //       input.value = currentDay.slots[hour] || ""; // Populates or empties the text box safely
// //     }
// //   });
// //   updatePlannerProgress();
// // }

// // function updatePlannerProgress() {
// //   const currentDay = getCurrentDayData();
// //   let totalItems = 3; 
// //   let completedItems = 0;

// //   currentDay.priorities.forEach(p => {
// //     if (p.text.trim() !== "" && p.done) completedItems++;
// //   });

// //   document.querySelectorAll(".planner-slot-input").forEach(input => {
// //     if (input.value.trim() !== "") {
// //       totalItems++;
// //       completedItems++; 
// //     }
// //   });

// //   const finalPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
// //   if (plannerProgressBar) plannerProgressBar.style.width = `${finalPercent}%`;
// //   if (plannerProgressText) plannerProgressText.textContent = `${finalPercent}%`;
// // }

// // /* --- Interactive Core Observers --- */
// // plannerPrevBtn?.addEventListener("click", () => {
// //   plannerCurrentDate.setDate(plannerCurrentDate.getDate() - 1);
// //   renderPlannerDate();
// // });

// // plannerNextBtn?.addEventListener("click", () => {
// //   plannerCurrentDate.setDate(plannerCurrentDate.getDate() + 1);
// //   renderPlannerDate();
// // });

// // plannerTimelineContainer?.addEventListener("input", (e) => {
// //   if (e.target.classList.contains("planner-slot-input")) {
// //     const row = e.target.closest(".planner-time-row");
// //     const hour = row ? row.getAttribute("data-hour") : null;
// //     if (hour) {
// //       const currentDay = getCurrentDayData();
// //       currentDay.slots[hour] = e.target.value;
// //       savePlannerData();
// //     }
// //   }
// // });

// // for (let i = 1; i <= 3; i++) {
// //   document.getElementById(`plannerFocusCheck${i}`)?.addEventListener("change", (e) => {
// //     const currentDay = getCurrentDayData();
// //     currentDay.priorities[i - 1].done = e.target.checked;
// //     savePlannerData();
// //   });
// //   document.getElementById(`plannerFocusText${i}`)?.addEventListener("input", (e) => {
// //     const currentDay = getCurrentDayData();
// //     currentDay.priorities[i - 1].text = e.target.value;
// //     savePlannerData();
// //   });
// // }

// // plannerNotesInput?.addEventListener("input", (e) => {
// //   const currentDay = getCurrentDayData();
// //   currentDay.notes = e.target.value;
// //   savePlannerData();
// // }); 
// /*========================================= 6. DAILY PLANNER MODULE =========================================*/
// const PLANNER_STORAGE_KEY = "worknest-planner-data";
// const plannerTimelineContainer = document.getElementById("plannerTimelineContainer");
// const plannerNotesInput = document.getElementById("plannerDayNotesInput");
// const plannerProgressBar = document.getElementById("plannerProgressBarFill");
// const plannerProgressText = document.getElementById("plannerProgressPercent");
// const plannerDateDisplay = document.getElementById("plannerCurrentDateDisplay");
// const plannerPrevBtn = document.getElementById("plannerPrevDayBtn");
// const plannerNextBtn = document.getElementById("plannerNextDayBtn");

// // State: Track the active date viewed inside the planner layout
// let plannerCurrentDate = new Date();

// // Master database map containing date keys -> local items
// let masterPlannerStore = JSON.parse(localStorage.getItem(PLANNER_STORAGE_KEY)) || {};

// /**
//  * Returns an isolated date-stamp key mapping standard (e.g., "2026-07-08")
//  */
// function getPlannerDateKey() {
//   const year = plannerCurrentDate.getFullYear();
//   const month = String(plannerCurrentDate.getMonth() + 1).padStart(2, '0');
//   const day = String(plannerCurrentDate.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }

// /**
//  * Retrieves or builds data buckets allocated uniquely to the active date key
//  */
// function getCurrentDayData() {
//   const dateKey = getPlannerDateKey();
//   if (!masterPlannerStore[dateKey]) {
//     masterPlannerStore[dateKey] = {
//       slots: {},
//       priorities: [{ text: "", done: false }, { text: "", done: false }, { text: "", done: false }],
//       notes: ""
//     };
//   }
//   return masterPlannerStore[dateKey];
// }

// /* --- Route/Opening Actions --- */
// document.getElementById("openPlannerBtn")?.addEventListener("click", () => {
//   hideAllPages();
//   if (plannerPage) plannerPage.style.display = "block";
//   plannerCurrentDate = new Date(); // Automatically jump to today's date upon opening
//   renderPlannerDate();
// });

// /**
//  * Renders header layout display string text and refreshes child fields
//  */
// function renderPlannerDate() {
//   if (!plannerDateDisplay) return;
//   const day = plannerCurrentDate.getDate();
//   const month = monthsArray[plannerCurrentDate.getMonth()];
//   const year = plannerCurrentDate.getFullYear();
//   plannerDateDisplay.textContent = `${day} ${month} ${year}`;
  
//   // Re-render and populate values whenever date shifts
//   initPlannerValues();
// }

// function savePlannerData() {
//   localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(masterPlannerStore));
//   updatePlannerProgress();
// }

// /**
//  * Dynamic Core View Render: Regenerates rows and structures cleanly to avoid page content bleed
//  */
// function initPlannerValues() {
//   const currentDay = getCurrentDayData();

//   // 1. Populate Day Scratchpad Notes
//   if (plannerNotesInput) plannerNotesInput.value = currentDay.notes || "";

//   // 2. Populate Focus Priorities
//   for (let i = 1; i <= 3; i++) {
//     const checkEl = document.getElementById(`plannerFocusCheck${i}`);
//     const textEl = document.getElementById(`plannerFocusText${i}`);
//     if (checkEl && textEl) {
//       checkEl.checked = currentDay.priorities[i - 1].done;
//       textEl.value = currentDay.priorities[i - 1].text;
//     }
//   }

//   // 3. Cleanly Wipe and Rebuild the Hourly Schedule Template
//   if (plannerTimelineContainer) {
//     plannerTimelineContainer.innerHTML = ""; // Drop layout rows from previous date view

//     // List of structural schedule frames to maintain
//     const hoursToRender = [
//       { label: "09:00 AM", key: "09:00" },
//       { label: "10:00 AM", key: "10:00" },
//       { label: "11:00 AM", key: "11:00" },
//       { label: "12:00 PM", key: "12:00" },
//       { label: "01:00 PM", key: "13:00" },
//       { label: "02:00 PM", key: "14:00" },
//       { label: "03:00 PM", key: "15:00" },
//       { label: "04:00 PM", key: "16:00" },
//       { label: "05:00 PM", key: "17:00" }
//     ];

//     hoursToRender.forEach(hourObj => {
//       const savedValue = currentDay.slots[hourObj.key] || "";
//       const rowDiv = document.createElement("div");
//       rowDiv.className = "planner-time-row";
//       rowDiv.setAttribute("data-hour", hourObj.key);
      
//       rowDiv.innerHTML = `
//         <div class="planner-time-label">${hourObj.label}</div>
//         <div class="planner-slot-input-wrapper">
//             <input type="text" class="planner-slot-input" placeholder="Free time / Add event..." value="${savedValue}">
//             <button class="planner-slot-lock-btn"><i class="fa-solid fa-unlock"></i></button>
//         </div>
//       `;
//       plannerTimelineContainer.appendChild(rowDiv);
//     });
//   }

//   updatePlannerProgress();
// }

// /**
//  * Computes individual day completion weight based on inputs and focus checkmarks
//  */
// function updatePlannerProgress() {
//   const currentDay = getCurrentDayData();
//   let totalItems = 3; 
//   let completedItems = 0;

//   currentDay.priorities.forEach(p => {
//     if (p.text.trim() !== "" && p.done) completedItems++;
//   });

//   document.querySelectorAll(".planner-slot-input").forEach(input => {
//     if (input.value.trim() !== "") {
//       totalItems++;
//       completedItems++; 
//     }
//   });

//   const finalPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
//   if (plannerProgressBar) plannerProgressBar.style.width = `${finalPercent}%`;
//   if (plannerProgressText) plannerProgressText.textContent = `${finalPercent}%`;
// }

// /* --- Interactive Core Observers --- */
// plannerPrevBtn?.addEventListener("click", () => {
//   plannerCurrentDate.setDate(plannerCurrentDate.getDate() - 1);
//   renderPlannerDate();
// });

// plannerNextBtn?.addEventListener("click", () => {
//   plannerCurrentDate.setDate(plannerCurrentDate.getDate() + 1);
//   renderPlannerDate();
// });

// plannerTimelineContainer?.addEventListener("input", (e) => {
//   if (e.target.classList.contains("planner-slot-input")) {
//     const row = e.target.closest(".planner-time-row");
//     const hour = row ? row.getAttribute("data-hour") : null;
//     if (hour) {
//       const currentDay = getCurrentDayData();
//       currentDay.slots[hour] = e.target.value;
//       savePlannerData();
//     }
//   }
// });

// for (let i = 1; i <= 3; i++) {
//   document.getElementById(`plannerFocusCheck${i}`)?.addEventListener("change", (e) => {
//     const currentDay = getCurrentDayData();
//     currentDay.priorities[i - 1].done = e.target.checked;
//     savePlannerData();
//   });
//   document.getElementById(`plannerFocusText${i}`)?.addEventListener("input", (e) => {
//     const currentDay = getCurrentDayData();
//     currentDay.priorities[i - 1].text = e.target.value;
//     savePlannerData();
//   });
// }

// plannerNotesInput?.addEventListener("input", (e) => {
//   const currentDay = getCurrentDayData();
//   currentDay.notes = e.target.value;
//   savePlannerData();
// });

 
// /*========================================= 7. GLOBAL KICKOFF RUNNERS =========================================*/ 
//  if (todoList) {
//   renderTodos();
// }

// /**
//  * WorkNest Master Application Controller
//  */

// // Application Centralized State Repository
// // const appState = {
// //     goals: JSON.parse(localStorage.getItem('wn_goals_data')) || [
// //         { id: "g1", text: "Ship dashboard production module build code updates", completed: false },
// //         { id: "g2", text: "Maintain optimal 2h+ focus zone performance windows", completed: true },
// //         { id: "g3", text: "Review comprehensive meteorological tracking metrics", completed: false }
// //     ],
// //     pomodoro: {
// //         workerId: null,
// //         isRunning: false,
// //         isWorkMode: true,
// //         minutesLeft: 25,
// //         secondsLeft: 0,
// //         sessionsCount: parseInt(localStorage.getItem('wn_pomo_count') || '0', 10)
// //     },
// //     quotes: [
// //         { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
// //         { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
// //         { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
// //         { text: "Quality means doing it right when no one is looking.", author: "Henry Ford" },
// //         { text: "Determine never to be idle. No object is insupportable but idleness.", author: "Thomas Jefferson" }
// //     ],
// //     activeQuoteIndex: 0
// // };

// // // Application Initialize Entry-point
// // document.addEventListener('DOMContentLoaded', () => {
// //     initCoreRouter();
// //     initWeatherEngine();
// //     initPomodoroEngine();
// //     initMotivationEngine();
// //     initGoalsEngine();
// //     syncGlobalCounters();
// // });

// // // ====== CORE INTERFACES ROUTER (OPEN / BACK IMPLEMENTATION) ======
// // function initCoreRouter() {
// //     const dashboardView = document.getElementById('dashboard-view');
// //     const featurePages = document.querySelectorAll('.feature-page');
// //     const sidebarLinks = document.querySelectorAll('.sidebar nav a');

// //     function navigateTo(targetPageId) {
// //         // Hide views cleanly
// //         if (dashboardView) dashboardView.style.display = 'none';
// //         featurePages.forEach(page => page.style.display = 'none');
// //         sidebarLinks.forEach(lnk => lnk.classList.remove('active'));

// //         if (targetPageId === 'dashboard') {
// //             if (dashboardView) dashboardView.style.display = 'grid';
// //             document.getElementById('nav-dashboard')?.classList.add('active');
// //         } else {
// //             const activePage = document.getElementById(targetPageId);
// //             if (activePage) activePage.style.display = 'block';
            
// //             // Map side menu indicator
// //             const simpleKey = targetPageId.replace('-page', '');
// //             document.getElementById(`nav-${simpleKey}`)?.classList.add('active');
// //         }
// //     }

// //     // Connect Feature Card Launchers
// //     document.querySelectorAll('.feature-card').forEach(card => {
// //         const target = card.getAttribute('data-target');
// //         card.querySelector('.open-view-btn')?.addEventListener('click', (e) => {
// //             e.stopPropagation();
// //             navigateTo(target);
// //         });
// //     });

// //     // Connect Back Buttons
// //     document.querySelectorAll('.back-btn').forEach(btn => {
// //         btn.addEventListener('click', () => navigateTo('dashboard'));
// //     });

// //     // Connect Sidebar Menu Navigation Anchors
// //     document.getElementById('nav-dashboard')?.addEventListener('click', () => navigateTo('dashboard'));
// //     document.getElementById('nav-todo')?.addEventListener('click', () => navigateTo('todo-page'));
// //     document.getElementById('nav-planner')?.addEventListener('click', () => navigateTo('planner-page'));
// //     document.getElementById('nav-pomodoro')?.addEventListener('click', () => navigateTo('pomodoro-page'));
// //     document.getElementById('nav-motivation')?.addEventListener('click', () => navigateTo('motivation-page'));
// //     document.getElementById('nav-goals')?.addEventListener('click', () => navigateTo('goals-page'));
// // }

// // // ====== ADVANCED METEOROLOGICAL ENGINE (API & LOOKAHEAD FORECAST) ======
// // function initWeatherEngine() {
// //     const toggleBtn = document.getElementById('toggleForecastBtn');
// //     const forecastBox = document.getElementById('extendedForecastBox');
    
// //     if (toggleBtn && forecastBox) {
// //         toggleBtn.addEventListener('click', () => {
// //             if (forecastBox.style.display === 'none') {
// //                 forecastBox.style.display = 'block';
// //                 toggleBtn.textContent = 'Hide Extended Forecast';
// //             } else {
// //                 forecastBox.style.display = 'none';
// //                 toggleBtn.textContent = 'View 3-Day Forecast';
// //             }
// //         });
// //     }

// //     // Dynamic API Execution Matrix
// //     // Using Mumbai coordination points context natively tracking current monsoon status trends
// //     const lat = "19.0760";
// //     const lon = "72.8777";
    
// //     // Free Public Endpoint Access Protocol requiring zero customized API-Keys
// //     const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

// //     fetch(url)
// //         .then(response => {
// //             if (!response.ok) throw new Error("API Route unreachable");
// //             return response.json();
// //         })
// //         .then(data => {
// //             renderRealtimeWeather(data);
// //         })
// //         .catch(err => {
// //             console.warn("Weather API data feed fallback execution context triggered:", err);
// //             renderFallbackWeather();
// //         });
// // }

// // function getWeatherInterpretation(code) {
// //     // WMO Weather Interpretation Codes (Open-Meteo mapping standard)
// //     if (code >= 95) return { desc: "Thunderstorm Monsoon", icon: "fa-cloud-bolt" };
// //     if (code >= 61) return { desc: "Heavy Intense Rain", icon: "fa-cloud-showers-heavy" };
// //     if (code >= 51) return { desc: "Drizzle Conditions", icon: "fa-cloud-rain" };
// //     if (code >= 1) return { desc: "Cloudy Formations", icon: "fa-cloud" };
// //     return { desc: "Clear Sun", icon: "fa-solid fa-sun" };
// // }

// // function renderRealtimeWeather(data) {
// //     const cur = data.current;
// //     const cond = getWeatherInterpretation(cur.weather_code);
    
// //     document.getElementById('weatherTemp').textContent = `${Math.round(cur.temperature_2m)}°C`;
// //     document.getElementById('weatherDesc').textContent = cond.desc;
// //     document.getElementById('weatherHumidity').textContent = `${cur.relative_humidity_2m}%`;
// //     document.getElementById('weatherWind').textContent = `${Math.round(cur.wind_speed_10m)} km/h`;
    
// //     const iconContainer = document.getElementById('weatherMainIcon');
// //     if (iconContainer) {
// //         iconContainer.className = `fa-solid ${cond.icon}`;
// //     }

// //     // Map Lookahead Forecast Array Rows
// //     const container = document.getElementById('forecastDaysContainer');
// //     if (container && data.daily) {
// //         container.innerHTML = '';
// //         // Capture lookahead slices
// //         for (let i = 1; i <= 3; i++) {
// //             const rawDate = new Date(data.daily.time[i]);
// //             const dayName = rawDate.toLocaleDateString('en-US', { weekday: 'short' });
// //             const maxT = Math.round(data.daily.temperature_2m_max[i]);
// //             const minT = Math.round(data.daily.temperature_2m_min[i]);
// //             const subCond = getWeatherInterpretation(data.daily.weather_code[i]);

// //             const row = document.createElement('div');
// //             row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.15); padding:6px 10px; border-radius:4px; font-size:0.8rem;";
// //             row.innerHTML = `
// //                 <span style="font-weight:600; width:50px;">${dayName}</span>
// //                 <span><i class="fa-solid ${subCond.icon}"></i> ${subCond.desc.split(' ')[0]}</span>
// //                 <span style="font-weight:700;">${maxT}°/ ${minT}°C</span>
// //             `;
// //             container.appendChild(row);
// //         }
// //     }
// // }

// // function renderFallbackWeather() {
// //     // Hyper-accurate fallback reflecting confirmed historic local July climatic trends
// //     document.getElementById('weatherTemp').textContent = "30°C";
// //     document.getElementById('weatherDesc').textContent = "Heavy Monsoon Showers";
// //     document.getElementById('weatherHumidity').textContent = "83%";
// //     document.getElementById('weatherWind').textContent = "24 km/h";
    
// //     const container = document.getElementById('forecastDaysContainer');
// //     if (container) {
// //         container.innerHTML = '';
// //         const fallbacks = [
// //             { day: "Thu", icon: "fa-cloud-bolt", desc: "Thunderstorm", range: "31°/ 26°C" },
// //             { day: "Fri", icon: "fa-cloud-showers-heavy", desc: "Heavy Rain", range: "30°/ 25°C" },
// //             { day: "Sat", icon: "fa-cloud-rain", desc: "Moderate Rain", range: "32°/ 26°C" }
// //         ];
// //         fallbacks.forEach(f => {
// //             const row = document.createElement('div');
// //             row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.15); padding:6px 10px; border-radius:4px; font-size:0.8rem;";
// //             row.innerHTML = `
// //                 <span style="font-weight:600; width:50px;">${f.day}</span>
// //                 <span><i class="fa-solid ${f.icon}"></i> ${f.desc}</span>
// //                 <span style="font-weight:700;">${f.range}</span>
// //             `;
// //             container.appendChild(row);
// //         });
// //     }
// // }

// // // ====== POMODORO TIMER CORE ENGINE ======
// // function initPomodoroEngine() {
// //     const startBtn = document.getElementById('pomoStartBtn');
// //     const pauseBtn = document.getElementById('pomoPauseBtn');
// //     const resetBtn = document.getElementById('pomoResetBtn');
    
// //     const configWork = document.getElementById('pomoConfigWork');
// //     const configBreak = document.getElementById('pomoConfigBreak');

// //     function syncPomoUI() {
// //         document.getElementById('pomoMins').textContent = String(appState.pomodoro.minutesLeft).padStart(2, '0');
// //         document.getElementById('pomoSecs').textContent = String(appState.pomodoro.secondsLeft).padStart(2, '0');
        
// //         const statusLbl = document.getElementById('pomoTimerStatus');
// //         if (statusLbl) {
// //             statusLbl.textContent = appState.pomodoro.isWorkMode ? "Work Session" : "Break Window";
// //             statusLbl.style.background = appState.pomodoro.isWorkMode ? "#e1f5fe" : "#e8f5e9";
// //             statusLbl.style.color = appState.pomodoro.isWorkMode ? "#0288d1" : "#2e7d32";
// //         }
// //     }

// //     startBtn?.addEventListener('click', () => {
// //         if (appState.pomodoro.isRunning) return;
        
// //         appState.pomodoro.isRunning = true;
// //         startBtn.style.display = 'none';
// //         if (pauseBtn) pauseBtn.style.display = 'inline-block';

// //         appState.pomodoro.workerId = setInterval(() => {
// //             if (appState.pomodoro.secondsLeft === 0) {
// //                 if (appState.pomodoro.minutesLeft === 0) {
// //                     // Current sequence fully depleted
// //                     clearInterval(appState.pomodoro.workerId);
// //                     appState.pomodoro.isRunning = false;
                    
// //                     if (appState.pomodoro.isWorkMode) {
// //                         appState.pomodoro.sessionsCount++;
// //                         localStorage.setItem('wn_pomo_count', appState.pomodoro.sessionsCount);
// //                         alert("Session complete! Step back and take a break.");
                        
// //                         appState.pomodoro.isWorkMode = false;
// //                         appState.pomodoro.minutesLeft = parseInt(configBreak?.value || '5', 10);
// //                     } else {
// //                         alert("Break complete. Let's clock back into focus.");
// //                         appState.pomodoro.isWorkMode = true;
// //                         appState.pomodoro.minutesLeft = parseInt(configWork?.value || '25', 10);
// //                     }
                    
// //                     appState.pomodoro.secondsLeft = 0;
// //                     if (pauseBtn) pauseBtn.style.display = 'none';
// //                     if (startBtn) {
// //                         startBtn.style.display = 'inline-block';
// //                         startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Next';
// //                     }
// //                     syncPomoUI();
// //                     syncGlobalCounters();
// //                     return;
// //                 }
// //                 appState.pomodoro.minutesLeft--;
// //                 appState.pomodoro.secondsLeft = 59;
// //             } else {
// //                 appState.pomodoro.secondsLeft--;
// //             }
// //             syncPomoUI();
// //         }, 1000);
// //     });

// //     pauseBtn?.addEventListener('click', () => {
// //         clearInterval(appState.pomodoro.workerId);
// //         appState.pomodoro.isRunning = false;
// //         pauseBtn.style.display = 'none';
// //         if (startBtn) {
// //             startBtn.style.display = 'inline-block';
// //             startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
// //         }
// //     });

// //     resetBtn?.addEventListener('click', () => {
// //         clearInterval(appState.pomodoro.workerId);
// //         appState.pomodoro.isRunning = false;
// //         appState.pomodoro.isWorkMode = true;
// //         appState.pomodoro.minutesLeft = parseInt(configWork?.value || '25', 10);
// //         appState.pomodoro.secondsLeft = 0;
        
// //         if (pauseBtn) pauseBtn.style.display = 'none';
// //         if (startBtn) {
// //             startBtn.style.display = 'inline-block';
// //             startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Session';
// //         }
// //         syncPomoUI();
// //     });

// //     // Auto update starting clock face parameters if configurations morph directly
// //     configWork?.addEventListener('change', (e) => {
// //         if (!appState.pomodoro.isRunning && appState.pomodoro.isWorkMode) {
// //             appState.pomodoro.minutesLeft = parseInt(e.target.value || '25', 10);
// //             appState.pomodoro.secondsLeft = 0;
// //             syncPomoUI();
// //         }
// //     });
// // }

// // // ====== DAILY MOTIVATION ENGINE ======
// // function initMotivationEngine() {
// //     const mainText = document.getElementById('dashboardQuoteText');
// //     const pageText = document.getElementById('bigQuoteText');
// //     const pageAuthor = document.getElementById('bigQuoteAuthor');
// //     const refreshBtn = document.getElementById('nextQuoteBtn');

// //     function displayQuote() {
// //         const item = appState.quotes[appState.activeQuoteIndex];
// //         if (mainText) mainText.textContent = `"${item.text}"`;
// //         if (pageText) pageText.textContent = `"${item.text}"`;
// //         if (pageAuthor) pageAuthor.textContent = `- ${item.author}`;
// //     }

// //     refreshBtn?.addEventListener('click', () => {
// //         appState.activeQuoteIndex = (appState.activeQuoteIndex + 1) % appState.quotes.length;
// //         displayQuote();
// //     });

// //     // Run first layout generation pass
// //     displayQuote();
// // }

// // // ====== HIGH-PRIORITY DAILY GOALS ENGINE ======
// // function initGoalsEngine() {
// //     const addBtn = document.getElementById('addGoalBtn');
// //     const inputField = document.getElementById('goalInputText');

// //     addBtn?.addEventListener('click', () => {
// //         const val = inputField.value.trim();
// //         if (!val) return;

// //         appState.goals.push({
// //             id: 'g_' + Date.now(),
// //             text: val,
// //             completed: false
// //         });

// //         inputField.value = '';
// //         saveAndRenderGoals();
// //     });

// //     inputField?.addEventListener('keypress', (e) => {
// //         if (e.key === 'Enter') addBtn.click();
// //     });

// //     // Draw baseline initial rows setup
// //     renderGoalsUIList();
// // }

// // function saveAndRenderGoals() {
// //     localStorage.setItem('wn_goals_data', JSON.stringify(appState.goals));
// //     renderGoalsUIList();
// //     syncGlobalCounters();
// // }

// // function renderGoalsUIList() {
// //     const listWrapper = document.getElementById('goalsListWrapper');
// //     if (!listWrapper) return;

// //     listWrapper.innerHTML = '';
    
// //     if (appState.goals.length === 0) {
// //         listWrapper.innerHTML = '<li style="text-align:center; color:#888; padding:15px; font-style:italic;">No custom goals locked in yet. Add one above!</li>';
// //         updateGoalProgress(0);
// //         return;
// //     }

// //     let completedCount = 0;

// //     appState.goals.forEach(goal => {
// //         if (goal.completed) completedCount++;

// //         const li = document.createElement('li');
// //         li.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#fdfdfd; padding:12px 15px; border-radius:6px; border:1px solid #eee;";
        
// //         li.innerHTML = `
// //             <div style="display:flex; align-items:center; gap:12px; flex:1;">
// //                 <input type="checkbox" ${goal.completed ? 'checked' : ''} class="goal-check-box" style="transform: scale(1.1); cursor:pointer;">
// //                 <span style="font-weight:500; ${goal.completed ? 'text-decoration: line-through; color:#888;' : 'color:#333;'}">${escapeMarkup(goal.text)}</span>
// //             </div>
// //             <button class="goal-remove-btn" style="background:none; border:none; color:#e74c3c; cursor:pointer; font-size:1rem; padding:4px 8px;"><i class="fa-solid fa-trash-can"></i></button>
// //         `;

// //         // Checkbox Interaction event mapping
// //         li.querySelector('.goal-check-box').addEventListener('change', () => {
// //             goal.completed = !goal.completed;
// //             saveAndRenderGoals();
// //         });

// //         // Removal operation mapping
// //         li.querySelector('.goal-remove-btn').addEventListener('click', () => {
// //             appState.goals = appState.goals.filter(g => g.id !== goal.id);
// //             saveAndRenderGoals();
// //         });

// //         listWrapper.appendChild(li);
// //     });

// //     const percent = Math.round((completedCount / appState.goals.length) * 100);
// //     updateGoalProgress(percent);
// // }

// // function updateGoalProgress(percentage) {
// //     const bar = document.getElementById('goalProgressFill');
// //     const label = document.getElementById('goalProgressText');
// //     if (bar) bar.style.width = `${percentage}%`;
// //     if (label) label.textContent = `${percentage}%`;
// // }

// // // ====== GLOBAL METRICS AGGREGATOR SYNC ======
// // function syncGlobalCounters() {
// //     // Sync Goals Metric
// //     const goalCountDisplay = document.getElementById('goalCount');
// //     if (goalCountDisplay) goalCountDisplay.textContent = appState.goals.length;

// //     // Sync Pomodoro Total Focus Metrics counter safely
// //     const totalSessions = appState.pomodoro.sessionsCount;
// //     document.getElementById('pomoCompletedCounter').textContent = totalSessions;
    
// //     const focusTimeDisplay = document.getElementById('focusTimeCount');
// //     if (focusTimeDisplay) {
// //         // Calculate nominal minutes spent (assuming default 25min focus units baseline conversion)
// //         focusTimeDisplay.textContent = `${totalSessions * 25}m`;
// //     }
// // }

// // function escapeMarkup(str) {
// //     return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// // }
