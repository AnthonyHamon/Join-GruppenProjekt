async function setNewTask() {
    let id = ++highestTaskId;
    let title = document.getElementById('titel-input').value;
    let description = document.getElementById('read-description').value;
    let date = document.getElementById('calender-input').value;
    let priority = currentPrioriyToCreateTask;
    let category = 'Web_Performance';
    let status = 'to_do';
    let contacts = [...selectedContacts];

    tasks.push({ id, title, description, date, priority, category, status, contacts });
    await setItem('tasks', JSON.stringify(tasks));
    renderBoard();
}

function ifContainerEmpty(container) {
    if (container.innerHTML === '') {
        container.innerHTML = `<div class="emptyTaskLine"><span>No tasks to do</span></div>`;
    }
}