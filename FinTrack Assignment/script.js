//  Local Storage Keys

const STORAGE_KEYS = {
    TRANSACTIONS: "fintrack_transactions",
    PROFILE: "fintrack_profile",
    THEME: "fintrack_theme"
};

//    Currency Symbols

const CURRENCIES = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥"
};

// Global Variables

let transactions = [];

let profile = {
    name: "",
    currency: "INR"
};

let currentFilter = "all";

let cashChart = null;
//  DOM Elements

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const totalTransactionEl = document.getElementById("count");

const transactionTable =
    document.getElementById("transactionTable");

const addTransactionBtn =
    document.getElementById("addTransactionBtn");

const transactionModal =
    document.getElementById("transactionModal");

const closeModalBtn =
    document.querySelector(".close");

const transactionForm =
    document.getElementById("transactionForm");

const transactionCounter =
    document.getElementById("transactionCounter");  
    
const profileName =
    document.getElementById("profileName");

const currencySelect =
    document.getElementById("currency");

const darkModeToggle =
    document.getElementById("darkMode");

const saveProfileBtn =
    document.getElementById("saveProfile");

const resetDataBtn =
    document.getElementById("resetData");
//   Utility Functions



document.addEventListener("DOMContentLoaded", () => {


    const navButtons = document.querySelectorAll(".nav-btn");

    const pages = document.querySelectorAll(".page");

    const addTransactionBtn = document.getElementById("addTransactionBtn");

    const transactionModal = document.getElementById("transactionModal");

    const closeModal = document.getElementById("closeModal");

    const cancelBtn = document.getElementById("cancelTransaction");

    const logoutBtn = document.getElementById("logoutBtn");




    function showPage(pageName) {

        pages.forEach(page => {

            page.classList.remove("active");

        });

        const currentPage = document.getElementById(pageName + "Page");

        if (currentPage) {

            currentPage.classList.add("active");

        }

    }



    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            navButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            showPage(button.dataset.page);

        });

    });




    function openModal() {

        if (!transactionModal) return;

        transactionModal.classList.add("show");

        document.body.style.overflow = "hidden";

    }



    function closeTransactionModal() {

        if (!transactionModal) return;

        transactionModal.classList.remove("show");

        document.body.style.overflow = "auto";

    }



    if (addTransactionBtn) {

        addTransactionBtn.addEventListener("click", openModal);

    }



    if (closeModal) {

        closeModal.addEventListener("click", closeTransactionModal);

    }



    if (cancelBtn) {

        cancelBtn.addEventListener("click", closeTransactionModal);

    }



    window.addEventListener("click", (e) => {

        if (e.target === transactionModal) {

            closeTransactionModal();

        }

    });



    document.addEventListener("keydown", (e) => {

        if (

            e.key === "Escape" &&

            transactionModal &&

            transactionModal.classList.contains("show")

        ) {

            closeTransactionModal();

        }

    });



  //logout
    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            const logout = confirm("Are you sure you want to logout?");

            if (!logout) return;

            window.location.href = "login.html";

        });

    }


    showPage("dashboard");

});



function getCurrencySymbol() {

    return CURRENCIES[profile.currency] || "₹";

}

function formatCurrency(amount) {

    return `${getCurrencySymbol()}${Number(amount).toLocaleString(
        undefined,
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    )}`;

}

function generateID() {

    return Date.now() + Math.floor(Math.random() * 1000);

}

function showAlert(message) {

    alert(message);

}

//  Local Storage

function loadTransactions() {

    const data =
        localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);

    if (!data) {

        transactions = [];
        return;

    }

    transactions = JSON.parse(data);

}

function saveTransactions() {

    localStorage.setItem(

        STORAGE_KEYS.TRANSACTIONS,

        JSON.stringify(transactions)

    );

}

function loadProfile() {

    const data =
        localStorage.getItem(STORAGE_KEYS.PROFILE);

    if (!data) return;

    profile = JSON.parse(data);

}

function saveProfile() {

    localStorage.setItem(

        STORAGE_KEYS.PROFILE,

        JSON.stringify(profile)

    );

}

function loadTheme() {

    const theme =
        localStorage.getItem(STORAGE_KEYS.THEME);

    if (theme === "dark") {

        document.body.classList.add("dark");

        darkModeToggle.checked = true;

    }

}

function saveTheme(mode) {

    localStorage.setItem(

        STORAGE_KEYS.THEME,

        mode

    );

}

//  Modal Functions

function openModal() {

    transactionModal.style.display = "flex";

}

function closeModal() {

    transactionModal.style.display = "none";

    transactionForm.reset();

}

//  Event Listeners

addTransactionBtn.addEventListener(

    "click",

    openModal

);

closeModalBtn.addEventListener(

    "click",

    closeModal

);

window.addEventListener("click", (e) => {

    if (e.target === transactionModal) {

        closeModal();

    }

});

// Transaction Functions

function addTransaction(transaction) {

    transactions.push(transaction);

    saveTransactions();

    refreshDashboard();

}

function deleteTransaction(id) {

    transactions = transactions.filter(transaction => {

        return transaction.id !== id;

    });

    saveTransactions();

    refreshDashboard();

}
//  Form Validation

function validateForm() {

    const type =
        document.getElementById("type").value;

    const description =
        document.getElementById("description").value.trim();

    const amount =
        document.getElementById("amount").value;

    const date =
        document.getElementById("date").value;

    const category =
        document.getElementById("category").value;

    if (
        type === "" ||
        description === "" ||
        amount === "" ||
        date === "" ||
        category === ""
    ) {

        showAlert("Please fill all fields.");

        return false;

    }

    if (Number(amount) <= 0) {

        showAlert("Amount must be greater than zero.");

        return false;

    }

    return true;

}

//  Create Transaction Object

function createTransactionObject() {

    return {

        id: generateID(),

        type:
            document.getElementById("type").value,

        description:
            document.getElementById("description").value.trim(),

        amount:
            Number(document.getElementById("amount").value),

        date:
            document.getElementById("date").value,

        category:
            document.getElementById("category").value

    };

}

//    Transaction Form Submit

transactionForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!validateForm()) {

        return;

    }

    const transaction = createTransactionObject();

    addTransaction(transaction);

    closeModal();

});

//    Dashboard Calculations

function calculateTotals() {

    let income = 0;

    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }

    });

    return {

        income,

        expense,

        balance: income - expense,

        totalTransactions: transactions.length

    };

}

// Update Summary Cards
function updateSummaryCards() {

    const totals = calculateTotals();

    balanceEl.textContent =
        formatCurrency(totals.balance);

    incomeEl.textContent =
        formatCurrency(totals.income);

    expenseEl.textContent =
        formatCurrency(totals.expense);

    totalTransactionEl.textContent =
        totals.totalTransactions;

}
//   Dashboard Refresh

function refreshDashboard() {

    updateSummaryCards();

    renderTransactions();

    renderCashFlowChart();

}

// Make Delete Available Globally

window.deleteTransaction = deleteTransaction;

// Render Transactions
function renderTransactions() {

    transactionTable.innerHTML = "";

    let filteredTransactions = [...transactions];

    switch (currentFilter) {

        case "income":
            filteredTransactions = transactions.filter(
                transaction => transaction.type === "income"
            );
            break;

        case "expense":
            filteredTransactions = transactions.filter(
                transaction => transaction.type === "expense"
            );
            break;

        default:
            filteredTransactions = [...transactions];

    }

    if (filteredTransactions.length === 0) {

        renderEmptyState();

        return;

    }

    filteredTransactions.sort((a, b) => {

        return new Date(b.date) - new Date(a.date);

    });

    filteredTransactions.forEach(transaction => {

        const row = createTransactionRow(transaction);

        transactionTable.appendChild(row);

    });

    
transactionCounter.textContent = getTransactionCount();
}

//  Create Transaction Row

function createTransactionRow(transaction) {

    const tr = document.createElement("tr");

    const amountClass =
        transaction.type === "income"
            ? "income-text"
            : "expense-text";

    const sign =
        transaction.type === "income"
            ? "+"
            : "-";

    tr.innerHTML = `

        <td>${formatDate(transaction.date)}</td>

        <td>${transaction.description}</td>

        <td>${transaction.category}</td>

        <td>

            <span class="badge ${transaction.type}">
                ${capitalize(transaction.type)}
            </span>

        </td>

        <td class="${amountClass}">

            ${sign}${formatCurrency(transaction.amount)}

        </td>

        <td>

            <button
                class="delete-btn"
                onclick="deleteTransaction(${transaction.id})">

                Delete

            </button>

        </td>

    `;

    return tr;

}
//    Empty State

function renderEmptyState() {

    transactionTable.innerHTML = `

        <tr>

            <td colspan="6" class="empty-state">

                No transactions found.

            </td>

        </tr>

    `;

}

// Helper Functions

function capitalize(text) {

    return text.charAt(0).toUpperCase() +

        text.slice(1);

}

function formatDate(date) {

    return new Date(date).toLocaleDateString(

        undefined,

        {

            year: "numeric",

            month: "short",

            day: "numeric"

        }

    );

}
//    Filter Buttons

const filterButtons =

    document.querySelectorAll(".filter");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        currentFilter =

            this.dataset.filter;

        renderTransactions();

    });

});

//   Search Transactions

const searchInput =

    document.getElementById("searchTransaction");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const keyword =

            this.value.toLowerCase();

        transactionTable.innerHTML = "";

        const results = transactions.filter(transaction => {

            return (

                transaction.description

                    .toLowerCase()

                    .includes(keyword)

                ||

                transaction.category

                    .toLowerCase()

                    .includes(keyword)

            );

        });

        if (results.length === 0) {

            renderEmptyState();

            return;

        }

        results.forEach(transaction => {

            transactionTable.appendChild(

                createTransactionRow(transaction)

            );

        });

    });

}

//   Sort Transactions

function sortTransactions(type = "latest") {

    switch (type) {

        case "latest":

            transactions.sort((a, b) =>

                new Date(b.date) -

                new Date(a.date)

            );

            break;

        case "oldest":

            transactions.sort((a, b) =>

                new Date(a.date) -

                new Date(b.date)

            );

            break;

        case "highest":

            transactions.sort((a, b) =>

                b.amount - a.amount

            );

            break;

        case "lowest":

            transactions.sort((a, b) =>

                a.amount - b.amount

            );

            break;

    }

    renderTransactions();

}

//  Transaction Counter

function getTransactionCount(type = "all") {

    if (type === "all") {

        return transactions.length;

    }

    return transactions.filter(transaction =>

        transaction.type === type

    ).length;

}

//Chart Configuration

function getChartColors() {

    const darkMode =
        document.body.classList.contains("dark");

    return {

        income: "#16a34a",

        expense: "#dc2626",

        grid: darkMode
            ? "#374151"
            : "#e5e7eb",

        text: darkMode
            ? "#f3f4f6"
            : "#374151"

    };

}

//  Prepare Chart Data

function getChartData() {

    const labels = [];

    const incomeData = [];

    const expenseData = [];

    transactions.forEach(transaction => {

        labels.push(

            formatDate(transaction.date)

        );

        if (transaction.type === "income") {

            incomeData.push(transaction.amount);

            expenseData.push(0);

        } else {

            incomeData.push(0);

            expenseData.push(transaction.amount);

        }

    });

    return {

        labels,

        incomeData,

        expenseData

    };

}

// Render Cash Flow Chart

function renderCashFlowChart() {

    const canvas =
        document.getElementById("cashChart");

    if (!canvas) return;

    const context =
        canvas.getContext("2d");

    const data =
        getChartData();

    const colors =
        getChartColors();

    if (cashChart) {

        cashChart.destroy();

    }

    cashChart = new Chart(context, {

        type: "bar",

        data: {

            labels: data.labels,

            datasets: [

                {

                    label: "Income",

                    data: data.incomeData,

                    backgroundColor:
                        colors.income,

                    borderRadius: 8,

                    borderSkipped: false

                },

                {

                    label: "Expense",

                    data: data.expenseData,

                    backgroundColor:
                        colors.expense,

                    borderRadius: 8,

                    borderSkipped: false

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {

                intersect: false,

                mode: "index"

            },

            animation: {

                duration: 900,

                easing: "easeOutQuart"

            },

            plugins: {

                legend: {

                    position: "top",

                    labels: {

                        color: colors.text,

                        font: {

                            size: 14,

                            weight: "600"

                        }

                    }

                },

                tooltip: {

                    callbacks: {

                        label(context) {

                            return `${context.dataset.label}: ${formatCurrency(context.raw)}`;

                        }

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: colors.text

                    },

                    grid: {

                        color: colors.grid

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: colors.text,

                        callback(value) {

                            return formatCurrency(value);

                        }

                    },

                    grid: {

                        color: colors.grid

                    }

                }

            }

        }

    });

}

//    Refresh Chart

function refreshChart() {

    if (cashChart) {

        cashChart.destroy();

    }

    renderCashFlowChart();

}


function refreshDashboard() {

    updateSummaryCards();

    renderTransactions();

    refreshChart();

} 
//    Update Currency Display

function updateCurrency() {

    updateSummaryCards();

    renderTransactions();

    refreshChart();

}

//  Currency Change
currencySelect.addEventListener(

    "change",

    function () {

        profile.currency = this.value;

        saveProfile();

        updateCurrency();

    }

);

//  Dark Mode

darkModeToggle.addEventListener(

    "change",

    function () {

        if (this.checked) {

            document.body.classList.add("dark");

            saveTheme("dark");

        } else {

            document.body.classList.remove("dark");

            saveTheme("light");

        }

        refreshChart();

    }

);

//  Window Resize

window.addEventListener(

    "resize",

    function () {

        if (cashChart) {

            cashChart.resize();

        }

    }

);

// Chart Export (Optional)
function exportChartImage() {

    if (!cashChart) return;

    const link = document.createElement("a");

    link.download = "cash-flow-chart.png";

    link.href = cashChart.toBase64Image();

    link.click();

}


//  Profile Functions

function loadUserProfile() {

    profileName.value = profile.name;
    currencySelect.value = profile.currency;

}

function updateProfile() {

    profile.name = profileName.value.trim();

    profile.currency = currencySelect.value;

    saveProfile();

    updateCurrency();

    showToast("Profile updated successfully!");

}
// Save Profile

saveProfileBtn.addEventListener(

    "click",

    updateProfile

);

// Theme Initialization

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(STORAGE_KEYS.THEME);

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        darkModeToggle.checked = true;

    }

}
//  Reset Application

function resetApplication() {

    const confirmation = confirm(

        "Are you sure you want to delete all saved data?"

    );

    if (!confirmation) return;

    localStorage.removeItem(

        STORAGE_KEYS.TRANSACTIONS

    );

    localStorage.removeItem(

        STORAGE_KEYS.PROFILE

    );

    localStorage.removeItem(

        STORAGE_KEYS.THEME

    );

    transactions = [];

    profile = {

        name: "",

        currency: "INR"

    };

    refreshDashboard();

    loadUserProfile();

    document.body.classList.remove("dark");

    darkModeToggle.checked = false;

    showToast("All data has been reset.");

}

resetDataBtn.addEventListener(

    "click",

    resetApplication

);
//  Toast Notification System

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

// Keyboard Shortcuts
document.addEventListener(

    "keydown",

    function (event) {

        // Ctrl + N → Add Transaction

        if (event.ctrlKey && event.key === "n") {

            event.preventDefault();

            openModal();

        }

        // Escape → Close Modal

        if (event.key === "Escape") {

            closeModal();

        }

    }

);



//       Navigation
const pages = document.querySelectorAll(".page");

const navButtons = document.querySelectorAll(".nav-btn");

function showPage(pageId) {

    pages.forEach(page => {

        page.style.display = "none";

    });

    document.getElementById(pageId).style.display = "block";

    navButtons.forEach(button => {

        button.classList.remove("active");

    });

    document.querySelector(

        `[data-page="${pageId.replace("Page","")}"]`

    )?.classList.add("active");

}

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const page = button.dataset.page;

        showPage(page + "Page");

    });

});

//   Application Initialization
function initializeApp() {

    loadTransactions();

    loadProfile();

    initializeTheme();

    loadUserProfile();

    refreshDashboard();

    showPage("dashboardPage");

}

//  Start Application

document.addEventListener(

    "DOMContentLoaded",

    initializeApp

);
