let iconRotated = false;
let datesContainer = document.querySelector('.dates');
let selectedButton = null;


let isImagesOpen = false;
let subtasks = [];


function renderAddTask() {
    addContentCSS()
    addTaskBgrColor();
    removeBgrColorWithoutAddTask();
    addJoinLogoClickable();
    generateAddTaskHTML();
    renderAssignedToCurrentUser();
    renderAssignedToContactList();
}

// assigned to

function renderAssignedToCurrentUser(){
    let currentUserCtn = document.getElementById('assigned-to-current-user-ctn')
    let currentUserName = document.getElementById('current-user-name');
    let currentUserInitial = document.getElementById('current-user-initial');
    if(currentUser){
        currentUserName.innerHTML = currentUser[0]['user'] + ' (You)';
        currentUserInitial.innerHTML = currentUser[0]['initial'];
        currentUserInitial.style.backgroundColor = currentUser[0]['BgColor'];
    }else{
        currentUserCtn.classList.add('d-none');
    }
}

function renderAssignedToContactList(){
    let assignedToContactList = document.getElementById('assigned-to-contact-list');
    contacts.sort((a, b) => { return compareStrings(a.name, b.name) });
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        assignedToContactList.innerHTML += returnAssignedToContactList(i, contact);
    }
}

function assignTo(){
    
}

function toggleCheckImage(i){
    document.getElementById(`check-contact${i}-img`).classList.toggle('d-none');
    document.getElementById(`checked-contact${i}-img`).classList.toggle('d-none');
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

    contactContainer.classList.toggle('d-none');  // Ein- und Ausblenden des Kontaktcontainers

    // Überprüfen, ob der Kontaktcontainer jetzt sichtbar ist
    if (!contactContainer.classList.contains('d-none')) {
        arrowIcon.classList.add('rotate');  // Drehen des Icons um 180 Grad, wenn sichtbar
    } else {
        arrowIcon.classList.remove('rotate');  // Entfernen der Rotation, wenn unsichtbar
    }
}


function changeButtonStyles(color) {
    let button = document.getElementById(`button${color}`);
    let icon = document.getElementById(`icon${color}`);
    
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


function checkEditedTaskList(i, subtask) {
        let index = subtasks.findIndex(s => s === subtask);
        subtask= document.getElementById(`editInput${i}`).value;
        
        subtasks.splice(index, 1, (subtask));

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


function toggleSubtask(i) {
    document.getElementById(`taskList${i}`).classList.toggle('d-none');
    document.getElementById(`editTaskList${i}`).classList.toggle('d-none');
}


function deleteButton(i) {
    subtasks.splice(i, 1);

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














































