async function checkWidthInBoard() {
    let contentDiv = document.querySelector('.contentBoard');
    if (contentDiv) {
        if (window.innerWidth >= 1300) {
            generateBoardWidthPlus1300HTML();
        } else {
            generateBoardWidthMinus1300HTML();
        }
        await renderAllTasks();
        let currentTime = new Date().getTime();
        if (currentTime - lastAnimationTimestamp < mininamLoadingElementJoinTime) {
            await new Promise(resolve => setTimeout(resolve, mininamLoadingElementJoinTime - (currentTime - lastAnimationTimestamp)));
        }
        showWidthHTML();
        hideLoadingElementJoin();
    }
}

window.addEventListener('resize', loadingProcess);
