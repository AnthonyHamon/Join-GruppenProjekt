async function setNewTask() {
    let id = ++highestTaskId;
    let title = 'D';
    let description = 'Lorem, ipsum kakadudu dolor sit amet consectetur adipisicing elit...';
    let date = '33.33.2023';
    let priority = 'Urgent';
    let category = 'Web_Performance';
    let status = 'feedback';

    tasks.push({ id, title, description, date, priority, category, status });
    await setItem('tasks', JSON.stringify(tasks));
    loadingProcess();
}

function ifContainerEmpty(container) {
    if (container.innerHTML === '') {
        container.innerHTML = `<div class="emptyTaskLine"><span>No tasks to do</span></div>`;
    }
}