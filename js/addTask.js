let selectedContacts = [];
let createdSubtaskList = [];
let iconRotated = false;
let categorys = ['Frontend', 'Backend', 'Web Security'];


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


// assigned to

/**
 * The renderAssignedToCurrentUser function updates user display on an HTML page.
 *  It retrieves HTML elements for username, initial value, and a container.
 *  If a current user (currentUser) exists, it updates the username with the label "(You),"
 *  displays the initial value, and sets the background color accordingly.
 *  If no user is present, it hides the container.
 * 
 */
function renderAssignedToCurrentUser() {
    let currentUserCtn = document.getElementById('assigned-to-current-user-ctn')
    let currentUserName = document.getElementById('current-user-name');
    let currentUserInitial = document.getElementById('current-user-initial');
    if (currentUser) {
        currentUserName.innerHTML = currentUser[0]['user'] + ' (You)';
        currentUserInitial.innerHTML = currentUser[0]['initial'];
        currentUserInitial.style.backgroundColor = currentUser[0]['BgColor'];
    } else {
        currentUserCtn.classList.add('d-none');
    }
}


/**
 * The renderAssignedToContactList function creates a sorted contact list on an HTML page.
 * It retrieves an HTML element with the ID 'assigned-to-contact-list,' 
 * sorts the contacts by name, and then renders each contact using the returnAssignedToContactList function,
 * appending the generated HTML code to the element.
 * 
 */
function renderAssignedToContactList() {
    let assignedToContactList = document.getElementById('assigned-to-contact-list');
    contacts.sort((a, b) => { return compareStrings(a.name, b.name) });
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        assignedToContactList.innerHTML += returnAssignedToContactList(i, contact);
    }
}


/**
 * The searchContactToAssign function searches through a contact list based on the entered search term.
 * It retrieves the search term element and the contact list container, removes the 'd-none' class, and clears the displayed list.
 * Then, it iterates through the contact list, adds matching contacts to the displayed list, and applies specific styles.
 * If the search query is empty, all contacts are displayed again, and previously selected contacts receive special styles.
 * 
 */
function serchContactToAssign() {
    let searchedContact = document.getElementById('assignTo-input').value.toLowerCase();
    let assignedToContactList = document.getElementById('assigned-to-contact-list');
    contactContainer.classList.remove('d-none');
    assignedToContactList.innerHTML = '';
    for (let index = 0; index < contacts.length; index++) {
        const contact = contacts[index];
        if (contact['name'].toLowerCase().startsWith(searchedContact) && !searchedContact == '') {
            assignedToContactList.innerHTML += returnAssignedToContactList(index, contact);
            styleAlreadySelectedContact(index, searchedContact);
        }
    }

    if (searchedContact === '') {
        renderAssignedToContactList();
        for (let j = 0; j < contacts.length; j++) {
            const contact = contacts[j];
            selectedContacts.forEach((selectedContacts) => {
                if (selectedContacts['name'] === contact['name']) {
                    styleSelectedContact(j)
                }
            })
        }
    }
}


function resetArraysForNewTasks() {
    selectedContacts = [];
    createdSubtaskList = [];
}



/**
 *The styleAlreadySelectedContact function checks if an already selected contact starts with the entered
 *search term and applies specific styles to the contact identified by the index in the contact list.
 * 
 * @param {*} index 
 * @param {*} searchedContact 
 */
function styleAlreadySelectedContact(index, searchedContact) {
    selectedContacts.forEach((selectedContact) => {
        if (selectedContact['name'].toLowerCase().startsWith(searchedContact)) {
            styleSelectedContact(index);
        }
    })
}


/**
 * The assignTo function selects or deselects a contact. It finds the contact in the list of selected contacts based on the email address.
 * Depending on whether the contact is already selected or not, it is either added to or removed from the list.
 * The visual representation is updated to reflect the selection.
 * 
 * 
 * @param {*} i 
 * @param {*} name 
 * @param {*} email 
 * @param {*} phone 
 * @param {*} initial 
 * @param {*} BgColor 
 */
function assignTo(i, name, email, phone, initial, BgColor) {
    const index = selectedContacts.findIndex(c => c.email === email);
    styleSelectedContact(i);
    if (index > -1) {
        selectedContacts.splice(index, 1);
        renderSelectedContactBadges(selectedContacts)
    } else {
        selectedContacts.push({ name, email, phone, initial, BgColor });
        renderSelectedContactBadges(selectedContacts);
    }
}


/**
 * 
 * The renderSelectedContactBadges function updates the display of selected contacts by clearing
 * the content of the HTML element with the ID 'selected-contact-ctn' and then adding badges for each selected 
 * contact based on the information in the list of selected contacts.
 * 
 * @param {*} selectedContacts 
 */
function renderSelectedContactBadges(selectedContacts) {
    let selectedContactCtn = document.getElementById('selected-contact-ctn');
    selectedContactCtn.innerHTML = '';
    for (let i = 0; i < selectedContacts.length; i++) {
        const selectedContact = selectedContacts[i];
        selectedContactCtn.innerHTML += returnSelectedContactBadges(selectedContact);
    }
}


/**
 * 
 * The renderSelectedContactBadgesForEditOption function updates the display of selected contacts for the editing option
 *  by clearing the content of the HTML element with the ID 'selected-contact-ctn' and then adding badges
 *  for each assigned contact based on the information in the list of assigned contacts.
 * 
 * @param {*} assignedContacts 
 */
function renderSelectedContactBadgesForEditOption(assignedContacts) {
    let selectedContactCtn = document.getElementById('selected-contact-ctn');
    selectedContactCtn.innerHTML = '';
    for (let i = 0; i < assignedContacts.length; i++) {
        const assignedContact = assignedContacts[i];
        selectedContactCtn.innerHTML += returnSelectedContactBadges(assignedContact);
    }
}


function styleSelectedContact(i) {
    document.getElementById(`check-contact${i}-img`).classList.toggle('d-none');
    document.getElementById(`checked-contact${i}-img`).classList.toggle('d-none');
    document.getElementById(`contact${i}`).classList.toggle('contact_selected');
}


function rotateIcon() {
    const icon = document.querySelector('.assign-button img');
    icon.classList.toggle('rotate');
}


/**
 * 
 * The toggleContacts function toggles the visibility of the contact list on an HTML page. 
 * It uses the CSS class 'd-none' to show or hide the contact container and adds or removes a class ('rotate') to rotate an arrow icon, 
 * indicating the state of the contact list.
 * 
 * @param {*} event 
 */
function toggleContacts(event) {
    const contactContainer = document.getElementById('contactContainer');
    const arrowIcon = document.getElementById('arrowIcon');
    contactContainer.classList.toggle('d-none');
    stop(event);
    if (!contactContainer.classList.contains('d-none')) {
        arrowIcon.classList.add('rotate');
    } else {
        arrowIcon.classList.remove('rotate');
    }
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


// Subtask........

function addSubtask() {
    let subtaskInput = document.getElementById('subtaskInput');

    if (!subtaskInput.value == "") {
        createdSubtaskList.push({
            description: subtaskInput.value,
            subtaskStatus: "unfinished"
        });

        toggleSubtaskImages();
        renderSubtask();
    }
    subtaskInput.value = "";
}


/**
 * 
 * The checkEditedTaskList function checks if an edited subtask is present in the created subtask list. 
 * If found, it updates the subtask description and re-renders the subtask list. Otherwise, it outputs an error message.
 * 
 * @param {*} i 
 * @param {*} subtask 
 */
function checkEditedTaskList(i, subtask, id) {
    let index = createdSubtaskList.findIndex(s => s.description === subtask);
    editSubtasksWhilecreatingTask(i, subtask, index);
    if (id !== undefined) {
        editSubtaskOnAlreadyCreatedTask(i, subtask, id);
    }

}

function editSubtaskOnAlreadyCreatedTask(i, subtask, id) {
    let index = tasks.findIndex(t => t.id === id);
    const subtasks = tasks[index]['subtasks'];
    for (let j = 0; j < subtasks.length; j++) {
        const subtaskDescription = subtasks[j].description;
        if (subtaskDescription === subtask) {
            subtask = document.getElementById(`editInput${i}`).value;
            subtasks.splice(j, 1, {
                description: subtask,
                subtaskStatus: subtasks[j]['subtaskStatus']
            });
            renderSubtaskForEditOption(subtasks, id);
        }

    }

}

function editSubtasksWhilecreatingTask(i, subtask, index) {
    if (index !== -1) {
        subtask = document.getElementById(`editInput${i}`).value;

        createdSubtaskList.splice(index, 1, {
            description: subtask,
            subtaskStatus: createdSubtaskList[index].subtaskStatus
        });

        renderSubtask();
    }
}

function toggleSubtaskImages() {
    const imageContainer = document.getElementById("imageContainer");
    const newImages = document.getElementById("newImages");

    let subtaskInput = document.getElementById('subtaskInput');

    subtaskInput.focus();
    subtaskInput.select();

    subtaskInput.value = "";

    imageContainer.classList.toggle('d-none');
    newImages.classList.toggle('d-none');
}


function showSubtaskImagesByInput() {
    const imageContainer = document.getElementById("imageContainer");
    const newImages = document.getElementById("newImages");
    let subtaskInput = document.getElementById('subtaskInput');

    if (!subtaskInput.value == "") {
        imageContainer.classList.add('d-none');
        newImages.classList.remove('d-none');
    } else {
        imageContainer.classList.remove('d-none');
        newImages.classList.add('d-none');
    }
}


function renderSubtask() {
    let subtaskContent = document.getElementById('subtaskContent');
    subtaskContent.innerHTML = '';
    for (let index = 0; index < createdSubtaskList.length; index++) {
        const subtask = createdSubtaskList[index];

        subtaskContent.innerHTML += returnSubtask(subtask.description, index);
    }
}


/**
 * 
 * The renderSubtaskForEditOption function updates the display of subtasks for the editing option. 
 * It clears the content of the HTML element with the ID 'subtaskContent' 
 * and then adds subtasks based on the provided information using the returnSubtask function.
 * 
 * @param {*} subtasks 
 */
function renderSubtaskForEditOption(subtasks, id) {
    let subtaskContent = document.getElementById('subtaskContent');
    subtaskContent.innerHTML = '';
    for (let index = 0; index < subtasks.length; index++) {
        const subtask = subtasks[index].description;

        subtaskContent.innerHTML += returnSubtask(subtask, index, id);
    }
}

function toggleSubtask(i) {
    document.getElementById(`taskList${i}`).classList.toggle('d-none');
    document.getElementById(`editTaskList${i}`).classList.toggle('d-none');

    document.getElementById(`editInput${i}`).focus();
    document.getElementById(`editInput${i}`).select();
}


function deleteButton(i, subtask, id) {
    deleteSubtaskWhileCreatingTask(i);
    if (id !== undefined) {
        deleteSubtaskOnAlreadyCreatedTaks(subtask, id)
    }

}

function deleteSubtaskWhileCreatingTask(i) {
    createdSubtaskList.splice(i, 1);
    renderSubtask();
}

function deleteSubtaskOnAlreadyCreatedTaks(subtask, id) {
    let index = tasks.findIndex(t => t.id === id);
    const subtasks = tasks[index]['subtasks'];
    for (let j = 0; j < subtasks.length; j++) {
        const subtaskDescription = subtasks[j].description;
        if (subtaskDescription === subtask) {
            subtasks.splice(j, 1)
        }
        renderSubtaskForEditOption(subtasks, id);
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


function acceptCategory(category) {
    let selectInput = document.getElementById('selectedCategory');
    selectInput.value = category;

    toggleDropdown()
}


function toggleDropdown() {
    const dropdownOptions = document.getElementById('dropdownOptions');
    const icon = document.getElementById('selectIcon');

    iconRotated = !iconRotated;

    if (iconRotated) {
        dropdownOptions.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    } else {
        dropdownOptions.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    }
}

function closeCategoryMenu(){
    const dropdownOptions = document.getElementById('dropdownOptions');
    const icon = document.getElementById('selectIcon');
}

function clearBegonnenNewTask() {
    resetArraysForNewTasks();
    renderAddTask();
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
        popupCtn.classList.remove('closing');
        popupCtn.classList.add('opening');
    } else {
        renderAddTask();
    }
}


function closeAddTaskPopUp() {
    let popupCtn = document.getElementById('popup-ctn');

    popupCtn.classList.remove('opening');
    popupCtn.classList.add('closing');

    setTimeout(() => {
        popupCtn.classList.add('d-none');
    }, 350);
}

function closeOpenedMenu() {
    let contactCtn = document.getElementById('contactContainer');
    let categoryCtn = document.getElementById('dropdownOptions');
    if (!contactCtn.classList.contains('d-none') || !categoryCtn.classList.contains('d-none')) {
        contactCtn.classList.add('d-none');
        categoryCtn.classList.add('d-none');
        rotateIcon();
        
    };
}

