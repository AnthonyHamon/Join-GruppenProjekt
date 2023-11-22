function renderBoard() {
    generateBoardHTML();
    changeBoardContent();
    loadingProcess();
    checkWidthInBoard();
    boardBgrColor();
    removeBgrColorWithoutBoard();
    addJoinLogoClickable();
}

function loadingProcess() {
    if (!document.querySelector('#content').classList.contains('contentBoard')) {
        return;
    }
    restartLoadingElementJoinAnimation();
    hideWidthHTML();
    showLoadingElementJoin();
    delayedWidthCheckAndHide();
}

async function renderAllTasks() {
    await loadTasks();
    assignTaskElementsToStatus('to_do');
    assignTaskElementsToStatus('in_progress');
    assignTaskElementsToStatus('feedback');
    assignTaskElementsToStatus('done');
}

function changeBoardContent() {
    document.getElementById('content').classList.remove('content_section');
    document.getElementById('content').classList.remove('content');
    document.getElementById('content').classList.add('contentBoard');
}

function boardBgrColor() {
    document.getElementById('board').classList.add('currentTemplate', 'p-none');
    document.getElementById('board_mobile').classList.add('currentTemplate', 'p-none');

}

function removeBgrColorWithoutBoard() {
    document.getElementById('add_task').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
    document.getElementById('add_task_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts_mobile').classList.remove('currentTemplate', 'p-none');
}

function addJoinLogoClickable() {
    document.getElementById('join_logo').classList.remove('p-none');
    document.getElementById('join_logo_mobile').classList.remove('p-none');
}

function addTaskFromBtn(status) {
    console.info(`function is in progress.... and the status from button is -> ${status} <-`);
}

function showLoadingElementJoin() {
    document.getElementById('loading_spinner').classList.remove('d-none');
}

function hideLoadingElementJoin() {
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

function openTask(task) {
    let contain = document.getElementById('taskDetailsContain');
    currentTaskStatus = 'big';
    contain.innerHTML = `
        ${renderTaskHTMLDetails(task)}
    `;
    contain.classList.remove('d-none');
    checkNameTextLengthToSlideAnimation();
}

function closeTask() {
    let contain = document.getElementById('taskDetailsContain');
    let popup = document.getElementById('taskDetails');
    let background = document.getElementById('backgroundFromTaskPopup');
    currentTaskStatus = 'small';
    popup.classList.add('slideOutToRight');
    contain.classList.add('fadeOut');
    background.classList.add('fadeOutBackground');
    popup.addEventListener('animationend', function () {
        contain.classList.add('d-none');
    }, { once: true });
}