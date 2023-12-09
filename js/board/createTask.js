async function setNewTask() {
    let id = ++highestTaskId;
    let title = document.getElementById('titel-input').value;
    let description = document.getElementById('read-description').value;
    let date = document.getElementById('calender-input').value;
    let priority = currentPrioriyToCreateTask;
    let category = document.getElementById('selectedCategory').value.replace(/\s/g, '_');
    let status = 'to_do';
    let contacts = [...selectedContacts];
    let subtasks = [...createdSubtaskList];

    tasks.push({ id, title, description, date, priority, category, status, contacts, subtasks });
    await setItem('tasks', JSON.stringify(tasks));

    renderBoard();
<<<<<<< HEAD
    clearArraysInAddTaskSiteAgain();
=======
    resetArraysForNewTasks();
}

function ifContainerEmpty(container) {
    if (container.innerHTML === '') {
        container.innerHTML = `<div class="emptyTaskLine"><span>No tasks to do</span></div>`;
    }
}

function resetArraysForNewTasks() {
    selectedContacts = [];
    createdSubtaskList = [];
>>>>>>> c26d806478ee318a768f97dc608d1af8b7ee0a5a
}