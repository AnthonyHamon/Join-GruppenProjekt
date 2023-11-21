async function checkWidthInBoard() {
    let contentDiv = document.querySelector('.contentBoard');
    if (contentDiv) {
        if (window.innerWidth >= 1300) {
            generateBoardWidthPlus1300HTML();
        } else {
            generateBoardWidthMinus1300HTML();
        }
        checkTaskStatusWhetherBig();
        await renderAllTasks();
        await checkMinLoadingTime();
        showWidthHTML();
        hideLoadingElementJoin();
    }
}

function delayedWidthCheckAndHide() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        checkWidthInBoard();
        hideLoadingElementJoin();
    }, mininamLoadingElementJoinTime);
}

function checkTaskStatusWhetherBig() {
    if (currentTaskStatus == 'big') {
        currentTaskStatus = 'small';
    }
}

async function checkMinLoadingTime() {
    let currentTime = new Date().getTime();
    if (currentTime - lastAnimationTimestamp < mininamLoadingElementJoinTime) {
        await new Promise(resolve => setTimeout(resolve, mininamLoadingElementJoinTime - (currentTime - lastAnimationTimestamp)));
    }
}

window.addEventListener('resize', loadingProcess);
