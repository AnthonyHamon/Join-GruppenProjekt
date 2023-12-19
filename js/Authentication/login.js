let users = [];
let currentUser = [];
let isChecked = false;
let loginIsValid = false;
let hasBeenGreeted = false;

async function initLogin() {
    await loadUsers();
    checkSavedLogin();
}

function logOut() {
    localStorage.removeItem('currentUser');
    window.location.href = './login.html';
}

function login() {
    let username = document.getElementById('user-login').value;
    let userpassword = document.getElementById('password-input').value;
    let user = users.find(u => u.user == username || u.email == username);
    let password = users.find(u => u.password == userpassword);
    loginValidation(user, password);
}

/**
 * 
 * @param {object} user 
 * @param {string} password 
 * 
 * login validation before redirection to user page, password failure message or redirection to sign-up page.
 */

function loginValidation(user, password) {
    if (user && password) {
        localStorage.setItem('hasBeenGreeted', false);
        setCurrentUser(user);
        rememberMe();
        window.location.href = '../HTML/index.html';
    } else if (user && !password) {
        showPasswordError();
    } else {
        showNoUserError();
        setTimeout(() => window.location.href = '../HTML/sign_up.html', 3000);
    }
}

/**
 * set current user and save it in local storage for use after redirection.
 * @param {object} user 
 * 
 */

function setCurrentUser(user) {
    let userName = formatName(user['user']);
    let initial = returnContactInitialLetter(userName);
    let BgColor = setRandomColor();
    currentUser.push({ user: userName, email: user['email'], initial: initial, BgColor: BgColor });
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function guestLogin(e) {
    e.preventDefault();
    localStorage.setItem('hasBeenGreeted', false);
    window.location.href = "../HTML/index.html";
}

function showPasswordError() {
    let errorMsg = document.getElementById('input-error');
    !errorMsg.textContent ? errorMsg.innerHTML = "Wrong Password, please try again!" :
        errorMsg.textContent = '';
}

function rememberMe() {
    let username = document.getElementById('user-login').value;
    let password = document.getElementById('password-input').value;
    let user = { username, password }
    isChecked ? localStorage.setItem('userdata', JSON.stringify(user)) : '';
}

function checkSavedLogin() {
    try {
        let user = []
        let username = document.getElementById('user-login');
        let password = document.getElementById('password-input');
        user = JSON.parse(localStorage.getItem('userdata'));
        username.value = user['username'];
        password.value = user['password'];
    } catch (e) {
        console.log(`there's currently no saved login information`);
    };
}

function showNoUserError() {
    document.getElementById('no-user-animation-div').classList.remove('d-none');
    document.getElementById('no-user-animation').classList.add('.add_login_signUp_animation');
}

function toggleRememberMeButton() {
    isChecked = !isChecked;
    document.getElementById('check-button').classList.toggle('d-none');
    document.getElementById('checked-button').classList.toggle('d-none');
}

function formatName(name) {
    return name.replace(/\b\w/g, l => l.toUpperCase());
}


