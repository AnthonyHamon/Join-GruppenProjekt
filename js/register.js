let users = [];
let isChecked = false;

function signUp() {
    addNewUserToBackEnd();
}

function addNewUserToBackEnd() {
    let user = document.getElementById('user-input').value;
    let email = document.getElementById('email-input').value;
    let password = document.getElementById('password-input').value;
    let confirmedPassword = document.getElementById('password-confirmation').value;
    password == confirmedPassword && isChecked == true ? users.push({ user, email, password }) : console.log('error')
    // confirmedPassword.setCustomValidity(invalid) && confirmedPassword.validationMessage('confirm password validation does not match')


}

function signUpValidation() {
    let user = document.getElementById('user-input').value;
    let password = document.getElementById('password-input').value;
    let confirmedPassword = document.getElementById('password-confirmation').value;
    user.length >= 3 &&
        password == /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ &&
        password == confirmedPassword &&
        isChecked == true
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

