async function setNewTask() {
    let id = ++highestTaskId;
    let title = document.getElementById('titel-input').value;
    let description = document.getElementById('read-description').value;
    let date = document.getElementById('calender-input').value;
    let priority = currentPrioriyToCreateTask;
    let category = document.getElementById('selectedCategory').value.replace(/\s/g, '_');
    let status = 'to_do';
    let contacts = [...selectedContacts];

    tasks.push({ id, title, description, date, priority, category, status, contacts });
    await setItem('tasks', JSON.stringify(tasks));
    renderBoard();
    resetArray();
}

function ifContainerEmpty(container) {
    if (container.innerHTML === '') {
        container.innerHTML = `<div class="emptyTaskLine"><span>No tasks to do</span></div>`;
    }
}

function resetArray(){
    selectedContacts = [];
    subtasks = [];
}