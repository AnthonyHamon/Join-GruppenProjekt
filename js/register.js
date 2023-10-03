let users = [];
let isChecked = false;
let isValid = false;


async function initLogin() {
    await loadUsers();
}

function login() {
    let username = document.getElementById('user-login').value;
    let userpassword = document.getElementById('password-input').value;
    let user = users.find(u => u.user == username || u.email == username);
    let password = users.find(u => u.password == userpassword);
    if (user && password) {
        window.location.href = '../index.html';
    }else if (user &&!password){
        showPasswordError();
    }else{
        console.log('this user could not be find.')
    }
}


function showPasswordError(){
    let errorMsg = document.getElementById('input-error');
    errorMsg.classList.contains('opacity_zero') ? errorMsg.classList.toggle('opacity_zero') :
    errorMsg.classList.add('opacity_zero');
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.log('users could not be loaded');
    }
}

async function signUp() {
    let signUpButton = document.getElementById('signUpButton');
    signUpButton.disabled = true;
    let user = document.getElementById('user-input').value;
    let email = document.getElementById('email-input').value;
    let password = document.getElementById('password-input').value;
    signUpValidation();
    isValid && isChecked ? users.push({ user, email, password }) &&
        // await setItem('users', JSON.stringify(users)) &&
        resetForm() : '';
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
    signUpButton.disabled = false;
}

function passwordValidation() {
    let password = document.getElementById('password-input');
    let confirmedPassword = document.getElementById('password-confirmation');
    let passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    passwordValidation.test(password.value) ? isValid = true : isValid = false;
    !isValid ? password.setCustomValidity('The Password must be at least 8 characters with at least one lowercase, one uppercase and one digit. ') :
        password.setCustomValidity('');
    password.value === confirmedPassword.value ? isValid = true : isValid = false;
    !isValid ? confirmedPassword.setCustomValidity('The Confirm Password confirmation does not match') :
        confirmedPassword.setCustomValidity('');
}

function signUpValidation() {
    let errorMsg = document.getElementById('input-error');
    !isChecked && errorMsg.classList.contains('opacity_zero') ? errorMsg.classList.toggle('opacity_zero') :
        errorMsg.classList.add('opacity_zero');
}


function toggleRememberMeButton() {
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
    // localStorage.setItem('isComingFromSignUP', 'true')
    window.location.href = "login.html";
}

// function initLogin() {
//     let isComingFromSignUP = localStorage.getItem('isComingFromSignUP');
//     if (isComingFromSignUP = true) {
//         deactivateLoginAnimation();
//     }
//     isComingFromSignUP = false;
//     localStorage.setItem('isComingFromSignUP', isComingFromSignUP);
// }

// function deactivateLoginAnimation() {
//     document.getElementById('animation-ctn').innerHTML = returnLoginAnimationHTML();
// }

// function returnLoginAnimationHTML() {
//     return `
//     <div class="logo_animation_ctn no_animation" id="logo-animation">
//         <img id="logo-animation-img" class="logo_animation_img no_animation" src="../images/join_login_animation_logo.svg" alt="">
//     </div>
//     `
// }

// function deactivateLoginAnimation() {
//     document.getElementById('logo-animation').classList.remove('logo_animation_ctn');
//     document.getElementById('logo-animation-img').classList.remove('logo_animation_img');
//     document.getElementById('logo-animation-img').classList.add('no_animation');
// }

