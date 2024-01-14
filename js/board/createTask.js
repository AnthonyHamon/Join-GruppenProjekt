async function setNewTask(status) {
    let id = ++highestTaskId;
    let title = document.getElementById('titel-input').value;
    let description = document.getElementById('read-description').value;
    let date = document.getElementById('calender-input').value;
    let priority = currentPrioriyToCreateTask;
    let category = document.getElementById('selectedCategory').value.replace(/\s/g, '_');
    status == undefined ? status = 'to_do' : status = status;
    let contacts = [...selectedContacts];
    let subtasks = [...createdSubtaskList];

    tasks.push({ id, title, description, date, priority, category, status, contacts, subtasks });
    await setItem('tasks', JSON.stringify(tasks));
    resetArraysForNewTasks();
    closeAddTaskPopUp();
    renderBoard();
}

async function editTask(id, title, description, date, priority, category, status) {
    let index = tasks.findIndex(t => t.id === id);
    title = document.getElementById('titel-input').value;
    description = document.getElementById('read-description').value;
    date = document.getElementById('calender-input').value;
    priority = currentPrioriyToCreateTask;
    let contacts = checkAndASssignContacts(id);
    let subtasks = checkSubtasksInTask(task[index][subtasks], task.id);
    tasks.splice(index, 1, { id, title, description, date, priority, category, status, contacts, subtasks });
}

function checkAndASssignContacts(id){
    let index = tasks.findIndex(t => t.id === id);
    let contacts = tasks[index]['contacts'];
    return contacts
}

function checkAndASssignContacts(id){
    let index = tasks.findIndex(t => t.id === id);
    let subtasks = tasks[index]['subtasks'];
    return subtasks;
}