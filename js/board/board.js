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
    updateAllProgressBars();
}

function updateAllProgressBars() {
    tasks.forEach(task => {
        updateSubtasksCount(task.id);
    });
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
    let loadingSpinner = document.getElementById('loading_spinner');
    if (loadingSpinner) {
        loadingSpinner.classList.add('d-none');
    }
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

function openTask(id) {
    if (isDragging) {
        return;
    }
    let task = tasks.find(t => t.id === id);
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

function checkContactsInTask(contacts) {
    let html = '';
    let isLastOdd = contacts.length % 2 !== 0;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let isLast = i === contacts.length - 1;

        if (currentTaskStatus === 'small') {
            html += /*html*/`
                <div class="profileBadge" style="background-color: ${contact.BgColor}">${contact.initial}</div>
            `;
        } else if (currentTaskStatus === 'big') {
            let assignedNameStyle = isLast && isLastOdd ? 'style="width: 100%;"' : '';

            html += /*html*/`
                <div class="assignedProfil">
                    <span class="assignedBadge" style="background-color: ${contact.BgColor}">${contact.initial}</span>
                    <div class="assignedName" ${assignedNameStyle}>
                        <span class="assignedNameText">${contact.name}</span>
                    </div>
                </div>
            `;
        }
    }
    return html;
}

function checkSubtasksInTask(subtasks, taskId) {
    let html = '';
    if (currentTaskStatus === 'small') {
        return /*html*/`
            <div id="subtask_contain${taskId}" class="subtaskContain">
                <div class="progressbar-container">
                    <div id="progressbar${taskId}"></div>
                </div>
                <span id="subtaskTxt${taskId}" class="subtaskTxt">${subtasksCompleted(subtasks, taskId)}/${subtasks.length}</span>
            </div>
        `;
    } else if (currentTaskStatus === 'big') {
        for (let i = 0; i < subtasks.length; i++) {
            let subtask = subtasks[i];
            html += /*html*/`
                ${returnSubtasksDetailsHTML(i, subtask, taskId)}
            `;
        }
    }
    return html;
}

function updateSubtasksCount(taskId) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
        let completedCount = subtasksCompleted(task.subtasks);
        let totalSubtasks = task.subtasks.length;
        let subtaskTxtElement = document.getElementById(`subtaskTxt${taskId}`);
        let progressbarElement = document.getElementById(`progressbar${taskId}`);

        if (subtaskTxtElement) {
            subtaskTxtElement.textContent = `${completedCount}/${totalSubtasks}`;
        }

        if (progressbarElement) {
            let progressPercentage = totalSubtasks > 0 ? (completedCount / totalSubtasks) * 100 : 0;
            progressbarElement.style.width = `${progressPercentage}%`;
            progressbarElement.style.height = '100%';
            progressbarElement.style.backgroundColor = '#4589FF';
            progressbarElement.style.borderRadius = '16px';
        }
    }
}

function returnSubtasksDetailsHTML(subtaskId, subtask, taskId) {
    let imageHTML;

    if (subtask.subtaskStatus === 'finished') {
        imageHTML = `<img id="checkedBox${subtaskId}${taskId}" src="/images/checked_button.svg">`;
    } else {
        imageHTML = `<img id="checkBox${subtaskId}${taskId}" src="/images/check_button.svg">`;
    }

    return /*html*/`
        <div onclick="selectSubtaskInDetails(${subtaskId},${taskId})" class="subtaskContainDetails">
            ${imageHTML}
            <span id="subtask${subtaskId}${taskId}">${subtask.description}</span>
        </div>
    `;
}

function subtasksCompleted(subtasks) {
    let completedCount = 0;
    for (let i = 0; i < subtasks.length; i++) {
        if (subtasks[i].subtaskStatus === 'finished') {
            completedCount++;
        }
    }
    return completedCount;
}

async function selectSubtaskInDetails(subtaskId, taskId) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
        let subtask = task.subtasks[subtaskId];
        subtask.subtaskStatus = subtask.subtaskStatus === 'finished' ? 'unfinished' : 'finished';

        await setItem('tasks', JSON.stringify(tasks));

        updateSubtasksInDetails(task);
        updateSubtasksCount(taskId);
    }
}

function updateSubtasksInDetails(task) {
    let subtasksContainer = document.getElementById(`allSubtasksContainDetails${task.id}`);
    if (subtasksContainer) {
        subtasksContainer.innerHTML = checkSubtasksInTask(task.subtasks, task.id);
        updateSubtasksCount(task.id);
    }
}

function updateSubtaskUI(subtaskId, taskId, subtaskStatus) {
    let checkBox = document.getElementById(`checkBox${subtaskId}${taskId}`);
    let checkedBox = document.getElementById(`checkedBox${subtaskId}${taskId}`);
    let subtaskElement = document.getElementById(`subtask${subtaskId}${taskId}`);

    if (subtaskStatus === 'finished') {
        checkBox.classList.add('d-none');
        checkedBox.classList.remove('d-none');
        subtaskElement.classList.add('lineThrough');
    } else {
        checkBox.classList.remove('d-none');
        checkedBox.classList.add('d-none');
        subtaskElement.classList.remove('lineThrough');
    }
}

function editTaskInBordSite(taskId) {
    let contain = document.getElementById('taskDetails');
    contain.style.display = 'flex';
    contain.style.justifyContent = 'center';
    contain.style.alignItems = 'center';
    contain.innerHTML = /*html*/`
        <b>HIER DIE EDIT OPTION HTML EINFÜGEN ${taskId}<b>
    `;
}