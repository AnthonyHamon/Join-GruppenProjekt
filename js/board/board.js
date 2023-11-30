function renderBoard() {
    generateBoardHTML();
    changeBoardContent();
    loadingProcess();
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
    await assignTaskElementsToStatus('to_do');
    await assignTaskElementsToStatus('in_progress');
    await assignTaskElementsToStatus('feedback');
    await assignTaskElementsToStatus('done');
    checkProfileBadgeCount();
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

function searchTaskFromInput() {
    let value = document.getElementById('find_task').value.toLowerCase();

    tasks.forEach(task => {
        let taskSection = document.getElementById(`section${task.id}`);

        if (!taskSection) return;

        let title = task.title.toLowerCase();
        let description = task.description.toLowerCase();

        if (title.includes(value) || description.includes(value)) {
            taskSection.style.display = '';
        } else {
            taskSection.style.display = 'none';
        }
    });
}

function confirmTaskDeletion(taskId, taskTitle) {
    createConfirmPopup(taskId, taskTitle);
    createConfirmBackground();
}

function createConfirmPopup(taskId, taskTitle) {
    let confirmationMessage = `${returnConfirmationMessageHTML(taskTitle)}`;
    let confirmationPopup = document.createElement('div');
    confirmationPopup.className = 'confirmationPopup';
    confirmationPopup.innerHTML = `
        ${returnConfirmationPopupHTML(taskId, confirmationMessage)}
    `;
    document.body.appendChild(confirmationPopup);
}

function createConfirmBackground() {
    let modalBackground = document.createElement('div');
    modalBackground.className = 'modalBackground';
    document.body.appendChild(modalBackground);
}

async function deleteTask(taskId) {
    let index = tasks.findIndex(task => task.id == taskId);
    tasks.splice(index, 1);
    await setItem('tasks', JSON.stringify(tasks));
    closeTask();
    closeConfirmationPopup();
    renderAllTasks();
}

function closeConfirmationPopup() {
    let popup = document.querySelector('.confirmationPopup');
    let modalBackground = document.querySelector('.modalBackground');
    if (popup) {
        popup.remove();
    }
    if (modalBackground) {
        modalBackground.remove();
    }
}

function checkProfileBadgeCount() {
    let profileBadgeContainers = document.querySelectorAll('.profileBadgeContain');

    profileBadgeContainers.forEach(container => {
        let profileBadges = container.getElementsByClassName('profileBadge');
        let numberOfBadges = profileBadges.length;

        if (numberOfBadges > 5) {
            let additionalBadge = document.createElement('div');
            additionalBadge.className = 'profileBadgeToMuch';
            additionalBadge.textContent = `+${numberOfBadges - 4}`;

            while (container.children.length > 4) {
                container.removeChild(container.lastChild);
            }
            container.appendChild(additionalBadge);
        }
    });
}
