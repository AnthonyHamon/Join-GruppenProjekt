let iconRotated = false;
let datesContainer = document.querySelector('.dates');

const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

let currentMonthIndex = new Date().getMonth();
currentYear = new Date().getFullYear();

const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
];

let isImagesOpen = false;
let subtasks = [];


function renderAddTask() {
    changeAddTaskContent();
    addTaskBgrColor();
    removeBgrColorWithoutAddTask();
    addJoinLogoClickable();
    generateAddTaskHTML();
}

function changeAddTaskContent() {
    document.getElementById('content').classList.remove('content_section');
    document.getElementById('content').classList.remove('contentBoard');
    document.getElementById('content').classList.add('content');
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


function selectCategory(event) {
    if (event.target.tagName === 'LI') {
        const category = event.target.getAttribute('data-category');
        document.getElementById('selectedCategory').innerHTML = category;
        toggleDropdown();
    }
}


function rotateIcon() {
    const icon = document.querySelector('.assign-button img');
    icon.classList.toggle('rotate');
}


function toggleContacts() {
    const contactContainer = document.getElementById('contactContainer');
    const arrowIcon = document.getElementById('arrowIcon');

    contactContainer.classList.toggle('hidden');  // Ein- und Ausblenden des Kontaktcontainers

    // Überprüfen, ob der Kontaktcontainer jetzt sichtbar ist
    if (!contactContainer.classList.contains('hidden')) {
        arrowIcon.classList.add('rotate');  // Drehen des Icons um 180 Grad, wenn sichtbar
    } else {
        arrowIcon.classList.remove('rotate');  // Entfernen der Rotation, wenn unsichtbar
    }
}


function changeButtonStyles(color) {
    let button = document.getElementById(`button${color}`);
    let icon = document.getElementById(`icon${color}`);

    // Zurücksetzen des vorher ausgewählten Buttons
    resetSelectedPrioButton();

    // Ändern des aktuellen Buttons
    button.classList.add('selected');
    icon.classList.add('selected_icon');
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


// Subtask Element



function toggleImages() {
    const imageContainer = document.getElementById("imageContainer");
    const newImages = document.getElementById("newImages");
    document.getElementById("subtaskInput").disabled = false;

    if (imageContainer.style.display !== "none") {
        imageContainer.style.display = "none";
        newImages.style.display = "block";
    } else {
        newImages.style.display = "none";
        imageContainer.style.display = "block";
    }
}



function closeImages() {
    const imageContainer = document.getElementById("imageContainer");
    const newImages = document.getElementById("newImages");

    imageContainer.style.display = "block";
    newImages.style.display = "none";
    clearInputField("subtaskInput");
}


function clearInputField(inputsField) {
    const inputField = document.getElementById(inputsField);
    if (inputField) {
        inputField.value = "";
    }
}


function createCheckImage() {
    const checkImage = document.createElement("img");
    checkImage.setAttribute("src", "../images/Property 1=check.svg");
    checkImage.setAttribute("alt", "");
    checkImage.addEventListener('click', function () {
        addSubtask();
        closeImages();
        // Weitere Funktionen, die nach dem Klick ausgeführt werden sollen
    });
    return checkImage;
}


function addSubtask() {
    let subtaskInput = document.getElementById('subtaskInput').value;
    subtasks.push(subtaskInput);

    renderSubtask();
}


function renderSubtask() {
    let subtaskContent = document.getElementById('subtaskContent');
    subtaskContent.innerHTML = '';
    for (let index = 0; index < subtasks.length; index++) {
        const subtask = subtasks[index];

        subtaskContent.innerHTML += returnSubtask(subtask, index);

    }
}


function returnSubtask(inputText, i) {
    return `
    <div class="task-list" id="taskList${i}">
        <div class="liest-field">
            <div class="tasks-content">
                <p class="finished-content" id="finishedContent${i}">${inputText}</p>
                <input id="subtaskInput" class="subtask-input d-none" value="${inputText}" type="text">
            </div>
            <div class="edit-delete-container">
                <div class="edit-box">
                    <img onclick="toggleSubtask()" class="edit-image" id="editImage${i}" src="../images/Property 1=edit.svg" alt="">
                </div>
                <div class="delete-box" id="deleteBox">
                    <img onclick="deleteButton(${i})" class="delete-image" id="deleteImage${i}" src="../images/Property 1=delete.svg" alt="" >
                </div>
            </div>
        </div>
    </div>
    <div class="task-list" id="editTaskList${i}">
        <div class="liest-field">
            <div class="tasks-content">
                <input id="subtaskInput" class="subtask-input d-none" value="${inputText}" type="text">
            </div>
            <div class="edit-delete-container">
                <div class="delete-box">
                    <img onclick="deleteButton(${i})" class="delete-image" src="../images/Property 1=delete.svg" alt="">
                </div>
                <div class="edit-box">
                    <img id="checkImage" class="subtask-button-check" src="../images/Property 1=check.svg" alt="" onclick="addSubtask(); closeImages();">
                </div>
            </div>
        </div>
    </div>
    `
};


function toggleSubtask() {
    document.getElementById('').classList.toggle('d-none');
    document.getElementById('').classList.toggle('d-none');
}


function deleteButton(i) {
    subtasks.splice(i, 1);

    renderSubtask();
}























































