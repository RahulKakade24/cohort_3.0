// Local Storage Keys

const USER_KEY = "fintrack_users";
const SESSION_KEY = "fintrack_session";

// Toast Notification
function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    if (!toast) {

        alert(message);
        return;

    }

    toast.textContent = message;

    toast.className = "toast show";

    if (type === "error") {

        toast.style.background = "#dc2626";

    } else {

        toast.style.background = "#16a34a";

    }

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

// Helpers

function getUser() {

    return JSON.parse(localStorage.getItem(USER_KEY));

}

function saveUser(user) {

    localStorage.setItem(

        USER_KEY,

        JSON.stringify(user)

    );

}

function setSession(email) {

    localStorage.setItem(

        SESSION_KEY,

        email

    );

}

function getSession() {

    return localStorage.getItem(

        SESSION_KEY

    );

}

function clearSession() {

    localStorage.removeItem(

        SESSION_KEY

    );

}

//    Validation

function validateEmail(email) {

    const regex =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

function validatePassword(password) {

    return password.length >= 6;

}

//   Register User

const registerForm =

    document.getElementById(

        "registerForm"

    );

if (registerForm) {

    registerForm.addEventListener(

        "submit",

        function (event) {

            event.preventDefault();

            const name =

                document.getElementById(

                    "registerName"

                ).value.trim();

            const email =

                document.getElementById(

                    "registerEmail"

                ).value.trim().toLowerCase();

            const password =

                document.getElementById(

                    "registerPassword"

                ).value;

            const confirm =

                document.getElementById(

                    "confirmPassword"

                ).value;

            const terms =

                document.getElementById(

                    "terms"

                ).checked;

            if (

                name === "" ||

                email === "" ||

                password === ""

            ) {

                showToast(

                    "Please fill all fields.",

                    "error"

                );

                return;

            }

            if (!validateEmail(email)) {

                showToast(

                    "Invalid email address.",

                    "error"

                );

                return;

            }

            if (!validatePassword(password)) {

                showToast(

                    "Password must contain at least 6 characters.",

                    "error"

                );

                return;

            }

            if (password !== confirm) {

                showToast(

                    "Passwords do not match.",

                    "error"

                );

                return;

            }

            if (!terms) {

                showToast(

                    "Please accept the Terms & Conditions.",

                    "error"

                );

                return;

            }

            if (getUser()) {

                showToast(

                    "An account already exists.",

                    "error"

                );

                return;

            }

            const user = {

                name,

                email,

                password

            };

            saveUser(user);

            showToast(

                "Registration Successful!"

            );

            setTimeout(() => {

                window.location.href =

                    "login.html";

            }, 1500);

        }

    );

}



//   Login User

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("loginPassword")
            .value;

        const rememberMe = document
            .getElementById("rememberMe")
            .checked;

        const user = getUser();

        if (!user) {

            showToast(
                "No account found. Please register first.",
                "error"
            );

            setTimeout(() => {

                window.location.href = "register.html";

            }, 1800);

            return;

        }

        if (
            user.email !== email ||
            user.password !== password
        ) {

            showToast(
                "Invalid email or password.",
                "error"
            );

            return;

        }

        setSession(user.email);

        if (rememberMe) {

            localStorage.setItem(

                "fintrack_remember",

                "true"

            );

        } else {

            localStorage.removeItem(

                "fintrack_remember"

            );

        }

        showToast("Login Successful!");

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1200);

    });

}

//    Auto Login

function autoLogin() {

    const remember = localStorage.getItem(

        "fintrack_remember"

    );

    const session = getSession();

    if (

        remember === "true" &&

        session &&

        window.location.pathname.includes("login.html")

    ) {

        window.location.href = "index.html";

    }

}

//  Route Protection

function protectDashboard() {

    const session = getSession();

    const page =

        window.location.pathname;

    if (

        page.includes("index.html") ||

        page.endsWith("/")

    ) {

        if (!session) {

            window.location.href =

                "login.html";

        }

    }

}

/* 
   Prevent Logged-in User
   from Opening Login/Register
*/

function preventAuthPages() {

    const session = getSession();

    const page =

        window.location.pathname;

    if (

        session &&

        (

            page.includes("login.html") ||

            page.includes("register.html")

        )

    ) {

        window.location.href =

            "index.html";

    }

}

//   Logout

function logout() {

    clearSession();

    localStorage.removeItem(

        "fintrack_remember"

    );

    showToast("Logged out successfully!");

    setTimeout(() => {

        window.location.href =

            "login.html";

    }, 1000);

}

//   Create Logout Button

const logoutBtn =

    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(

        "click",

        logout

    );

}

// Display Logged-in User

function loadCurrentUser() {

    const user = getUser();

    if (!user) return;

    const displayName =

        document.getElementById(

            "displayName"

        );

    if (displayName) {

        displayName.textContent =

            "Welcome, " + user.name;

    }

}

// Session Expiry (Optional)

function sessionHeartbeat() {

    const session = getSession();

    if (!session) return;

    console.log(

        "User session active."

    );

}

//   Initialize Authentication
document.addEventListener(

    "DOMContentLoaded",

    function () {

        autoLogin();

        protectDashboard();

        preventAuthPages();

        loadCurrentUser();

        sessionHeartbeat();

    }

);
