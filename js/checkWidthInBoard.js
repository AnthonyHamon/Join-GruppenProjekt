let resizeTimer;

function debounceResize() {
    hideWidthHTML();
    showLoadingSpinner();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        checkWidthInBoard();
        showWidthHTML();
        hideLoadingSpinner();
    }, 500);
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

window.addEventListener("resize", debounceResize);
