let users = []; 
let currentUser = [];
let isChecked = false;
let loginIsValid = false;
let hasBeenGreeted = false;



async function initLogin() {
    await loadUsers();
    checkSavedLogin();
}

async function initSignUp() {
    await loadUsers();
}

function logOut(){
    localStorage.removeItem('currentUser');
    window.location.href = '../HTML/login.html';
}

function login() {
    let username = document.getElementById('user-login').value;
    let userpassword = document.getElementById('password-input').value;
    let user = users.find(u => u.user == username || u.email == username);
    let password = users.find(u => u.password == userpassword);
    if (user && password) {
        localStorage.setItem('hasBeenGreeted', false);
        setCurrentUser(user);
        rememberMe();
        window.location.href = '../index.html';
    } else if (user && !password) {
        showPasswordError();
    } else {
        showNoUserError();
        setTimeout(() => window.location.href = '../HTML/sign_up.html', 3000);
    }
}

function setCurrentUser(user){
    let initial = returnContactInitialLetter(user['user']);
    let BgColor = setRandomColor();
    currentUser.push({user: user['user'], email: user['email'], initial: initial, BgColor: BgColor});
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function returnContactInitialLetter(name) {
    return name.replace(/[^A-Z]+/g, '');
}

function setRandomColor() {
    const letters = '0123456789ABCDEF';
    let BgColor = '#';
    for (let i = 0; i < 6; i++) {
        BgColor += letters[Math.floor(Math.random() * 16)];
    }
    return BgColor;
}


function guestLogin() {
    isChecked = true;
    loginIsValid = true;
    localStorage.setItem('hasBeenGreeted', false);
    window.location.href = "../index.html"
}

function showPasswordError() {
    let errorMsg = document.getElementById('input-error');
    !errorMsg.textContent ? errorMsg.innerHTML = "Wrong Password, please try again!" :
        errorMsg.textContent = '';
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.log('users could not be loaded');
    }
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

function rememberMe() {
    let username = document.getElementById('user-login').value;
    let password = document.getElementById('password-input').value;
    let user = { username, password }
    isChecked ? localStorage.setItem('userdata', JSON.stringify(user)) : '';
}

async function signUp() {
    let user = document.getElementById('user-input').value;
    let email = document.getElementById('email-input').value;
    let password = document.getElementById('password-input').value;
    if (loginIsValid && isChecked) {
        users.push({ user, email, password });
        await setItem('users', JSON.stringify(users));
        resetForm();
        showSignUpConfirmation();
        setTimeout(() => window.location.href = "../HTML/login.html", 2000);
    }
}

function showNoUserError() {
    document.getElementById('no-user-animation-div').classList.remove('d-none');
    document.getElementById('no-user-animation').classList.add('.add_login_signUp_animation');
}

function showSignUpConfirmation() {
    document.getElementById('sign-up-animation-div').classList.remove('d-none');
    document.getElementById('sign-up-animation').classList.add('add_sign_Up_animation');
}

function checkExistingUser() {
    resetSignUpCustomValidity();
    let userError = document.getElementById('user-input');
    let emailError = document.getElementById('email-input');
    let username = document.getElementById('user-input').value;
    let userEmail = document.getElementById('email-input').value;
    let user = users.find(u => u.user == username);
    let email = users.find(u => u.email == userEmail);
    returnLoginCustomValidityMessage(user, email, userError, emailError);
}

function returnLoginCustomValidityMessage(user, email, userError, emailError) {
    if (user) {
        !loginIsValid
        userError.setCustomValidity('This User Already exist');
    } else if (email) {
        !loginIsValid
        emailError.setCustomValidity('This email adress has already been registered');
    } else {
        loginIsValid;
    }
}

function resetSignUpCustomValidity() {
    document.getElementById('user-input').setCustomValidity('');
    document.getElementById('email-input').setCustomValidity('');
}

function activateButton() {
    let signUpButton = document.getElementById('signUpButton');
    isChecked ? signUpButton.disabled = false : signUpButton.disabled = true && signUpValidation();
}

function resetForm() {
    let signUpButton = document.getElementById('signUpButton');
    let user = document.getElementById('user-input');
    let email = document.getElementById('email-input');
    let password = document.getElementById('password-input');
    let confirmedPassword = document.getElementById('password-confirmation');
    user.value = "";
    email.value = "";
    password.value = "";
    confirmedPassword.value = "";
    signUpButton.disabled = true;
}

function passwordValidation() {
    let password = document.getElementById('password-input');
    let confirmedPassword = document.getElementById('password-confirmation');
    let passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    passwordValidation.test(password.value) ? loginIsValid = true : loginIsValid = false;
    !loginIsValid ? password.setCustomValidity('The Password must be at least 8 characters with at least one lowercase, one uppercase and one digit. ') :
        password.setCustomValidity('');
    password.value === confirmedPassword.value ? loginIsValid = true : loginIsValid = false;
    !loginIsValid ? confirmedPassword.setCustomValidity('The Confirm Password confirmation does not match') :
        confirmedPassword.setCustomValidity('');
}

function signUpValidation() {
    let errorMsg = document.getElementById('input-error');
    !isChecked && !errorMsg.textContent ? errorMsg.innerHTML = returnPrivacyPoliceErrorMsg() :
        errorMsg.innerHTML = '';
}


function toggleRememberMeButton() {
    isChecked = !isChecked;
    document.getElementById('check-button').classList.toggle('d-none');
    document.getElementById('checked-button').classList.toggle('d-none');
}

function checkPrivatePolicyButton() {
    isChecked = !isChecked;
    document.getElementById('check-button').classList.toggle('d-none');
    document.getElementById('checked-button').classList.toggle('d-none');
}

function togglePasswordImg() {
    let passwordVisibility = document.getElementById('password-visibility-on');
    let passwordVisibilityOff = document.getElementById('password-visibility-off');
    let passwordLock = document.getElementById('password-lock');
    let passwordInput = document.getElementById('password-input');
    if (!passwordInput.value == 0 && passwordInput.type === 'password') {
        passwordLock.classList.add('d-none');
        passwordVisibilityOff.classList.remove('d-none');
    } else if (!passwordInput.value == 0 && passwordInput.type === 'text') {
        passwordVisibilityOff.classList.add('d-none');
    } else {
        passwordLock.classList.remove('d-none');
        passwordVisibilityOff.classList.add('d-none');
        passwordVisibility.classList.add('d-none');
        passwordInput.type = 'password';
    }
}

function toggleShowPassword() {
    let passwordInput = document.getElementById('password-input');
    let passwordVisibilityOff = document.getElementById('password-visibility-off');
    let passwordVisibility = document.getElementById('password-visibility-on');
    passwordVisibilityOff.classList.toggle('d-none');
    passwordVisibility.classList.toggle('d-none');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}



// trying to return to login without logo animation

function loginRedirection() {
    localStorage.setItem('isComingFromSignUP', true);
    window.location.href = "login.html";
}

function deactivateLoginAnimation() {
    document.getElementById('animation-ctn').classList.add('d-none');
    document.getElementById('logo-animation-img').classList.remove('logo_animation_img');
    document.getElementById('logo-animation-img').classList.add('no_animation');
}

