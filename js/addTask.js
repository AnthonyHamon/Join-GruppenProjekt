let iconRotated = false;
let isCustomDropdownVisible = false;


function renderAddTask() {
    addTaskBgrColor();
    removeBgrColorWithoutAddTask();
    addJoinLogoClickable();
    generateAddTaskHTML();
}

function addTaskBgrColor() {
    document.getElementById('add_task').classList.add('currentTemplate', 'p-none');

}

function removeBgrColorWithoutAddTask() {
    document.getElementById('summary').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
}

function addJoinLogoClickable() {
    document.getElementById('join_logo').classList.remove('p-none');
}

function toggleDropdown() {
    const dropdownOptions = document.getElementById('dropdownOptions');
    const icon = document.getElementById('icon');

    iconRotated = !iconRotated;

    if (iconRotated) {
    dropdownOptions.style.display = 'block';
    icon.style.transform = 'rotate(180deg)';
    } else {
    dropdownOptions.style.display = 'none';
    icon.style.transform = 'rotate(0deg)';
    }
}


function selectCategory(category) {
    document.getElementById('selectedCategory').innerHTML = category;

    toggleDropdown();
}

function toggleCustomDropdown() {
    const customIcon = document.getElementById('customIcon');
    const customDropdownContent = document.getElementById('customDropdownContent');

    isCustomDropdownVisible = !isCustomDropdownVisible;

    if (isCustomDropdownVisible) {
        customIcon.classList.add('rotate');
        customDropdownContent.style.display = 'block';
    } else {
        customIcon.classList.remove('rotate');
        customDropdownContent.style.display = 'none';
    }
}

function selectCustomContact(contactName) {
    const selectedCustomContacts = document.getElementById('selectedCustomContacts');
    const newContact = document.createElement('div');
    newContact.innerText = contactName;
    selectedCustomContacts.appendChild(newContact);
    toggleCustomDropdown();  // Schließe das Dropdown nach der Auswahl
}






