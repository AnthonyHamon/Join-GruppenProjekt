async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.log('users could not be loaded');
    }
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
