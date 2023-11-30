async function setNewTask() {
    let id = ++highestTaskId;
    let title = `${highestTaskId}`;
    let description = 'Lorem, ipsum kakadudu dolor sit amet consectetur adipisicing elit...';
    let date = '33.33.2023';
    let priority = 'Urgent';
    let category = 'Web_Performance';
    let status = 'feedback';

    let task = {
        id,
        title,
        description,
        date,
        priority,
        category,
        status,
        assignedContacts: selectedContacts
    };

    tasks.push(task);
    await setItem('tasks', JSON.stringify(tasks));
    loadingProcess();

    return task;
}

function renderTaskElement(task) {
    let section = document.createElement('section');
    section.className = 'section';
    section.id = `section${task.id}`;
    section.onclick = function () {
        openTask(task);
    };
    section.innerHTML = renderTaskHTML(task);
    return section;
}

function ifContainerEmpty(container) {
    if (container.innerHTML === '') {
        container.innerHTML = `<div class="emptyTaskLine"><span>No tasks to do</span></div>`;
    }
}