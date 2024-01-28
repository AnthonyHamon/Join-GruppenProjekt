let selectedContacts = [];
let createdSubtaskList = [];
let iconRotated = false;
let categorys = ['Frontend', 'Backend', 'Web Security'];
let currentPrioriyToCreateTask = 'Medium';


function renderAddTask() {
    addContentCSS()
    addTaskBgrColor();
    removeBgrColorWithoutAddTask();
    addJoinLogoClickable();
    generateAddTaskHTML();
    renderAssignedToCurrentUser();
    renderAssignedToContactList();
    showCategory();
    hideLegalContent();
}

function resetArraysForNewTasks() {
    selectedContacts = [];
    createdSubtaskList = [];
}

function getTodaysDateForCalender() {
    let currentDate = new Date();
    const day = currentDate.getDate();
    currentDate.setHours(23, 59, 59, 999);
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
}


/**
 * 
 * The changeButtonStyles function updates the style of a priority button on an HTML page. 
 * It first resets all buttons, then removes the selection from all buttons and adds it to the clicked button, 
 * including a special style class for the icon. The selected priority value is updated.
 * 
 * @param {*} priority 
 */
function changeButtonStyles(priority) {
    let button = document.getElementById(`button${priority}`);
    let icon = document.getElementById(`icon${priority}`);
    currentPrioriyToCreateTask = priority;

    if (button.classList.contains('selected')) {
        resetSelectedPrioButton();
    } else {
        resetSelectedPrioButton();
        button.classList.add('selected');
        icon.classList.add('selected_icon');
    }
}


function resetSelectedPrioButton() {
    let allPrioSelectedButton = document.querySelectorAll('.selected');
        allPrioSelectedButton.forEach((allPrioSelectedButton) => {
        allPrioSelectedButton.classList.remove('selected');
    });
    let allPrioSelectedIcon = document.querySelectorAll('.selected_icon');
        allPrioSelectedIcon.forEach((allPrioSelectedIcon) => {
        allPrioSelectedIcon.classList.remove('selected_icon');
    });
}


function clearInputField(inputsField) {
    const inputField = document.getElementById(inputsField);
    if (inputField) {
        inputField.value = "";
    }
}

function addTaskBgrColor() {
    document.getElementById('add_task').classList.add('currentTemplate', 'p-none');
    document.getElementById('add_task_mobile').classList.add('currentTemplate', 'p-none');
}


function removeBgrColorWithoutAddTask() {
    document.getElementById('summary').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts_mobile').classList.remove('currentTemplate', 'p-none');
}


function addJoinLogoClickable() {
    document.getElementById('join_logo').classList.remove('p-none');
    document.getElementById('join_logo_mobile').classList.remove('p-none');
}


// Category........

function showCategory() {
    let categoryList = document.getElementById('dropdownOptions');
    categoryList.innerHTML = '';

    for (let c = 0; c < categorys.length; c++) {
        const category = categorys[c];

        categoryList.innerHTML += renderCategory(category, c)
    }
}


function acceptCategory(category, event) {
    let selectInput = document.getElementById('selectedCategory');
    selectInput.value = category;

    toggleDropdown(event);
    toggleNoCategoryError();
}


function toggleDropdown(event) {
    const dropdownOptions = document.getElementById('dropdownOptions');
    const icon = document.getElementById('selectIcon');

    dropdownOptions.classList.toggle('d-none');
    stop(event);

    if (!dropdownOptions.classList.contains('d-none')) {
        icon.classList.add('rotate');
    } else {
        icon.classList.remove('rotate');
    }
}


function clearBegonnenNewTask(event) {
    resetArraysForNewTasks();
    document.getElementById('titel-input').value = '';
    document.getElementById('calender-input').value = '';
    document.getElementById('read-description').value = '';
    document.getElementById('assignTo-input').value = '';
    document.getElementById('selected-contact-ctn').innerHTML = '';
    document.getElementById('selectedCategory').value = '';
    document.getElementById('subtaskInput').value = '';
    renderAssignedToContactList();
    renderSubtask();
    changeButtonStyles('Medium');
    closeOpenedMenu(event);
}

// AddTask in Board site


/**
 * 
 * The renderAddTaskPopUp function displays or hides a popup window for adding tasks on an HTML page based on the window width. 
 * For larger screens, it toggles the visibility of the popup window, 
 * fills it with the necessary content, including user and contact information, 
 * and shows categories. For smaller screens, it renders the task addition without using a popup.
 * 
 * @param {*} status 
 */
function renderAddTaskPopUp(status) {
    let popupCtn = document.getElementById('popup-ctn');

    if (window.matchMedia("(min-width: 1000px)").matches) {
        popupCtn.classList.toggle('d-none');
        popupCtn.innerHTML = returnAddTaskPopUp(status);
        renderAssignedToCurrentUser();
        renderAssignedToContactList();
        showCategory();
        showPopupAnimation();
    } else {
        renderAddTask();
    }
}


function showPopupAnimation(){
    let popup = document.getElementById('popup');
    popup.classList.add('opening');
}


function closeAddTaskPopUp() {
    let popupCtn = document.getElementById('popup-ctn');
    
    if(!popupCtn.classList.contains('d-none')){
        let popup = document.getElementById('popup');
        popup.classList.remove('opening');
        popup.classList.add('closing');
    
        setTimeout(() => {
            popupCtn.classList.add('d-none');
            popupCtn.innerHTML = '';
        }, 350);
    }
}


function closeOpenedMenu(event) {
    stop(event);
    closeAssignContactMenu();
    closeCategoryMenu();
}


function closeAssignContactMenu(){
    let contactCtn = document.getElementById('contactContainer');
    if (contactCtn && !contactCtn.classList.contains('d-none')) {
        contactCtn.classList.add('d-none');
        rotateIcon();
    };
}


function closeCategoryMenu(){
    let CategorymenuArrow = document.getElementById('selectIcon');
    let categoryCtn = document.getElementById('dropdownOptions');
    if (categoryCtn && !categoryCtn.classList.contains('d-none')) {
        categoryCtn.classList.add('d-none');
    };
    if (CategorymenuArrow && CategorymenuArrow.classList.contains('rotate')) {
        CategorymenuArrow.classList.toggle('rotate');
    };
}

function togglePopup() {
    let popupContainer = document.getElementById('popup-ctn');
    popupContainer.classList.toggle('d-none');
}


function showTaskAddedToBoardPopup() {
    let popupContainer = document.getElementById('popup-ctn');
    
    if (popupContainer.classList.contains('d-none')) {
        togglePopup();
        popupContainer.innerHTML = taskAddedToBoard();
        setTimeout(() => {
            togglePopup();
        }, 2000);
    } else {
        appendTaskToPopup();
        hideTaskAddedToBoardPopup();
    }
}


function appendTaskToPopup() {
    let addTasksPopup = document.getElementById('added-task-to-board-popup-div');
    addTasksPopup.innerHTML += taskAddedToBoard();
}


function hideTaskAddedToBoardPopup() {
    let addTasksPopup = document.getElementById('added-task-to-board-popup-div');
    let taskAddedToBoardPopup = document.getElementById('task-added-to-board');

    taskAddedToBoardPopup.classList.remove('showaddedtoBoard');
    addTasksPopup.classList.remove('d-none');
    setTimeout(() => {
        togglePopup();
    }, 2000);
}


function showAddedToBoard() {
    showTaskAddedToBoardPopup();
}