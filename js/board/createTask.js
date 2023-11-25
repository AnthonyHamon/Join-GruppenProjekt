async function setNewTask() {
    let index = tasks.length;
    let id = `${index}`;
    let title = 'Lorem, ipsum dolor sit epelle ndis impedit.';
    let description = 'Lorem, ipsum kakadudu dolor sit amet consectetur adipisicing elit. Quidem eos a repelle Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem eos a repell endus numquam libero consectetur non ut omnis illum mollitia dignissimos maiores aliquid exercitationem, optio facilis, porro, maxime reiciendis impedit.';
    let date = '33.33.2023';
    let priority = 'Medium';
    let category = 'Web_Performance';
    let status = 'feedback';
    tasks.push({ id, title, description, date, priority, category, status });
    await setItem('tasks', JSON.stringify(tasks));
    loadingProcess();
}

async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'));
    } catch {
        await setItem('tasks', JSON.stringify(tasks));
    }
}

function assignTaskElementsToStatus(status) {
    let container = document.getElementById(status);
    let tasksByStatus = tasks.filter(task => task.status === status);
    container.innerHTML = '';
    tasksByStatus.forEach((task, i) => {
        container.appendChild(renderTaskElement(task, i));
    });
    ifContainerEmpty(container);
}


function ifContainerEmpty(container) {
    if (container.innerHTML === '') {
        container.innerHTML = `<div class="emptyTaskLine"><span>No tasks to do</span></div>`;
    }
}