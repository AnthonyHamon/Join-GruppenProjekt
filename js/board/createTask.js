async function setNewTask(status) {
    let id = ++highestTaskId;
    let title = document.getElementById('titel-input').value;
    let description = document.getElementById('read-description').value;
    let date = document.getElementById('calender-input').value;
    let priority = currentPrioriyToCreateTask;
    let category = document.getElementById('selectedCategory').value.replace(/\s/g, '_');
    if (status == undefined){
        status = 'to_do'
    }else{
        status = status;
    }
    let contacts = [...selectedContacts];
    let subtasks = [...createdSubtaskList];

    tasks.push({ id, title, description, date, priority, category, status, contacts, subtasks });
    await setItem('tasks', JSON.stringify(tasks));
    resetArraysForNewTasks();
    closeAddTaskPopUp();
    renderBoard();
}

async function editTask(contacts, date, description, priority, subtasks, title, id){
    let index = tasks.findIndex(t => t.id === id);
     contacts = [...selectedContacts];
     date = document.getElementById('calender-input').value;
     description = document.getElementById('read-description').value;
     priority = currentPrioriyToCreateTask;
     subtasks = [...createdSubtaskList];
     title = document.getElementById('titel-input').value;
     tasks.splice(index, 1, {contacts, date, description, priority, subtasks, title});
}