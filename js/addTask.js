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
}


// assigned to

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


function renderAssignedToContactList() {
    let assignedToContactList = document.getElementById('assigned-to-contact-list');
    contacts.sort((a, b) => { return compareStrings(a.name, b.name) });
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        assignedToContactList.innerHTML += returnAssignedToContactList(i, contact);
    }
}


function searchContactToAssign() {
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


function styleAlreadySelectedContact(index, searchedContact) {
    selectedContacts.forEach((selectedContact) => {
        if (selectedContact['name'].toLowerCase().startsWith(searchedContact)) {
            styleSelectedContact(index);
        }
    })
}


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


function renderSelectedContactBadges(selectedContacts) {
    let selectedContactCtn = document.getElementById('selected-contact-ctn');
    selectedContactCtn.innerHTML = '';
    for (let i = 0; i < selectedContacts.length; i++) {
        const selectedContact = selectedContacts[i];
        selectedContactCtn.innerHTML += returnSelectedContactBadges(selectedContact);
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


function toggleContacts(event) {
    const contactContainer = document.getElementById('contactContainer');
    const arrowIcon = document.getElementById('arrowIcon');

    contactContainer.classList.toggle('d-none');  // Ein- und Ausblenden des Kontaktcontainers

    // Überprüfen, ob der Kontaktcontainer jetzt sichtbar ist
    if (!contactContainer.classList.contains('d-none')) {
        arrowIcon.classList.add('rotate');  // Drehen des Icons um 180 Grad, wenn sichtbar
    } else {
        arrowIcon.classList.remove('rotate');  // Entfernen der Rotation, wenn unsichtbar
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

function checkEditedTaskList(i, subtask) {
    let index = createdSubtaskList.findIndex(s => s === subtask);
    subtask = document.getElementById(`editInput${i}`).value;

    createdSubtaskList.splice(index, 1, (subtask));

    renderSubtask();
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


function showSubtaskImagesByInput () {
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

function toggleSubtask(i) {
    document.getElementById(`taskList${i}`).classList.toggle('d-none');
    document.getElementById(`editTaskList${i}`).classList.toggle('d-none');

    document.getElementById(`editInput${i}`).focus();
    document.getElementById(`editInput${i}`).select();
}


function deleteButton(i) {
    createdSubtaskList.splice(i, 1);

    renderSubtask();
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
        dropdownOptions.style.display = 'block'; // Dropdown anzeigen
        icon.style.transform = 'rotate(180deg)';
    } else {
        dropdownOptions.style.display = 'none'; // Dropdown ausblenden
        icon.style.transform = 'rotate(0deg)';
    }
}

function clearBegonnenNewTask() {
    resetArraysForNewTasks();
    renderAddTask();
}

// AddTask in Board site

function renderAddTaskPopUp() {
    let popupCtn = document.getElementById('popup-ctn');
    popupCtn.classList.toggle('d-none');
    popupCtn.innerHTML = returnAddTaskPopUp();
    renderAssignedToCurrentUser();
    renderAssignedToContactList();
    showCategory();
}


function closeAddTaskPopUp() {
    let popupCtn = document.getElementById('popup-ctn');

    popupCtn.classList.add('d-none');
}

