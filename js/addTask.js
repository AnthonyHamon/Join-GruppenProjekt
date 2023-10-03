let iconRotated = false;


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


function searchContacts() {
    const customDropdown = document.getElementById('customDropdown');
    const customIcon = document.getElementById('customIcon');

    customIcon.classList.toggle('rotate');

    if (customDropdown.style.display === 'block') {
        customDropdown.style.display = 'none';
    } else {
        customDropdown.style.display = 'block';
    }
}