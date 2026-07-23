/*=========================================
        WORKNEST AUTH SYSTEM
=========================================*/

const USERS_KEY = "worknest-users";
const CURRENT_USER_KEY = "worknest-current-user";


/*=========================================
        HELPERS
=========================================*/

const getUsers = () =>
    JSON.parse(localStorage.getItem(USERS_KEY)) || [];

const saveUsers = users =>
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

const getCurrentUser = () =>
    JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) ||
    JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY));


/*=========================================
        REGISTER
=========================================*/

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("registerName").value.trim();

        const email = document.getElementById("registerEmail").value.trim().toLowerCase();

        const password = document.getElementById("registerPassword").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!passwordRegex.test(password)) {

            alert(
                "Password must contain:\n\n" +
                "• Minimum 8 characters\n" +
                "• One uppercase letter\n" +
                "• One lowercase letter\n" +
                "• One number\n" +
                "• One special character"
            );

            return;
        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }

        const users = getUsers();

        if (users.some(user => user.email === email)) {

            alert("Email already registered.");

            return;
        }

        users.push({

            id: Date.now(),

            name,

            email,

            password

        });

        saveUsers(users);

        alert("Registration Successful!");

        window.location.href = "login.html";

    });

}


/*=========================================
        LOGIN
=========================================*/

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("loginName").value.trim();

        const password = document.getElementById("loginPassword").value;

        const remember = document.getElementById("rememberMe").checked;

        const users = getUsers();

        const user = users.find(u =>

            u.name === name &&

            u.password === password

        );

        if (!user) {

            alert("Invalid Name or Password.");

            return;
        }

        if (remember) {

            localStorage.setItem(

                CURRENT_USER_KEY,

                JSON.stringify(user)

            );

        } else {

            sessionStorage.setItem(

                CURRENT_USER_KEY,

                JSON.stringify(user)

            );

        }

        alert("Login Successful!");

        window.location.href = "index.html";

    });

}


/*=========================================
        PAGE PROTECTION
=========================================*/

// const currentUser = getCurrentUser();

// const page = window.location.pathname;

// if (
//     page.includes("index.html") &&
//     !currentUser
// ) {

//     window.location.href = "login.html";

// }

// if (
//     (page.includes("login.html") ||
//      page.includes("register.html")) &&
//     currentUser
// ) {

//     window.location.href = "index.html";

// }


// /*=========================================
//         SHOW USER NAME
// =========================================*/

// const profileName = document.querySelector(".profile span");

// if (profileName && currentUser) {

//     profileName.textContent = currentUser.name;

// }
/*=========================================
        PAGE PROTECTION
=========================================*/

const currentUser = getCurrentUser();
const page = window.location.pathname;

// Checks if the user is on the homepage (either index.html or just "/")
const isHomePage = page.endsWith("index.html") || page === "/" || page.endsWith("/");
const isAuthPage = page.includes("login.html") || page.includes("register.html");

if (isHomePage && !currentUser) {
    window.location.href = "login.html";
}

if (isAuthPage && currentUser) {
    window.location.href = "index.html";
}


/*=========================================
        SHOW USER NAME
=========================================*/

// Run this code only after the HTML elements have loaded safely
document.addEventListener("DOMContentLoaded", () => {
    if (currentUser) {
        const headerName = document.getElementById("profileNameSpan");
        const greetingName = document.getElementById("greetingNameSpan");

        if (headerName) {
            headerName.textContent = currentUser.name;
        }
        if (greetingName) {
            greetingName.textContent = currentUser.name;
        }
    }
});


/*=========================================
        LOGOUT
=========================================*/

const logoutBtn = document.querySelector(".logout-btn");

logoutBtn?.addEventListener("click", () => {

    if (!confirm("Logout?")) return;

    localStorage.removeItem(CURRENT_USER_KEY);

    sessionStorage.removeItem(CURRENT_USER_KEY);

    window.location.href = "login.html";

});


/*=========================================
        SHOW PASSWORD
=========================================*/

document.querySelectorAll(".toggle-password").forEach(icon => {

    icon.addEventListener("click", () => {

        const input = icon.previousElementSibling;

        input.type =
            input.type === "password"
            ? "text"
            : "password";

        icon.classList.toggle("fa-eye");

        icon.classList.toggle("fa-eye-slash");

    });

});
const quotes = [

    "Success doesn't come from what you do occasionally. It comes from what you do consistently.",

    "Small progress is still progress.",

    "Dream big. Start small. Act now.",

    "Discipline is choosing between what you want now and what you want most.",

    "Your future is created by what you do today, not tomorrow.",

    "Focus on progress, not perfection.",

    "Stay positive, work hard, and make it happen.",

    "Every accomplishment starts with the decision to try.",

    "Don't stop until you're proud.",

    "Believe you can and you're halfway there."

];

const quoteText = document.getElementById("quoteText");

let currentQuote = -1;

function changeQuote() {

    let randomIndex;

    do {

        randomIndex = Math.floor(Math.random() * quotes.length);

    } while (randomIndex === currentQuote);

    currentQuote = randomIndex;

    quoteText.textContent = quotes[currentQuote];

}

// Show first quote
changeQuote();

// Change quote every 5 seconds
setInterval(changeQuote, 5000);
 