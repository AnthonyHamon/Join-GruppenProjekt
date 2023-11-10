let resizeTimer;
let lastAnimationTime = 0;

function loadingProcess() {
    restartAnimation();
    hideWidthHTML();
    showLoadingSpinner();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        checkWidthInBoard();
        showWidthHTML();
        hideLoadingSpinner();
    }, 1000);
}

function restartAnimation() {
    let currentTime = new Date().getTime();
    if (currentTime - lastAnimationTime > 1000) {
        let animation = document.querySelector('animate');
        if (animation) {
            animation.beginElement();
            lastAnimationTime = currentTime;
        }
    }
}

function showLoadingSpinner() {
    document.getElementById('loading_spinner').classList.remove('d-none');
}

function hideLoadingSpinner() {
    document.getElementById('loading_spinner').classList.add('d-none');
}

function hideWidthHTML() {
    let widthHTML = document.getElementById('width_HTML');
    if (widthHTML) {
        widthHTML.style.display = 'none';
    }
}

function showWidthHTML() {
    let widthHTML = document.getElementById('width_HTML');
    if (widthHTML) {
        widthHTML.style.display = 'block';
    }
}

function checkWidthInBoard() {
    let contentDiv = document.querySelector('.contentBoard');
    if (contentDiv) {
        if (window.innerWidth >= 1300) {
            generateBoardWidthPlus1300HTML();
        } else {
            generateBoardWidthMinus1300HTML();
        }
        renderAllTasks();
    }
}

window.addEventListener("resize", loadingProcess);
