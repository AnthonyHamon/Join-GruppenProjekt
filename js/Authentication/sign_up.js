async function initSignUp() {
    await loadUsers();
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

function showSignUpConfirmation() {
    document.getElementById('sign-up-animation-div').classList.remove('d-none');
    document.getElementById('sign-up-animation').classList.add('add_sign_Up_animation');
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

function checkPrivatePolicyButton() {
    isChecked = !isChecked;
    document.getElementById('check-button').classList.toggle('d-none');
    document.getElementById('checked-button').classList.toggle('d-none');
}



