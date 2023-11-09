let tasks = [];
let currentTask = 'small'


async function setNewTask() {
    let index = tasks.length;
    let id = `${index}`;
    let title = 'title title title title title title title title                                        ';
    let description = 'description description description description description description description description          ';
    let date = '11.11.2023';
    let prio = 'low';
    let category = 'user';
    let status = 'in_progress';
    tasks.push({ id, title, description, date, prio, category, status });
    await setItem('tasks', JSON.stringify(tasks));
}


async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'));
    } catch {
        await setItem('tasks', JSON.stringify(tasks));
    }
}

async function renderAllTasks() {
    await loadTasks();
    renderTasksByStatus('to_do');
    renderTasksByStatus('in_progress');
    renderTasksByStatus('feedback');
    renderTasksByStatus('done');
}

function renderTasksByStatus(status) {
    let container = document.getElementById(status);
    let tasksByStatus = tasks.filter(task => task.status === status);
    container.innerHTML = '';
    tasksByStatus.forEach(task => {
        container.appendChild(renderTaskElement(task));
    });
    ifContainerEmpty(container);
}

function ifContainerEmpty(container) {
    container.innerHTML === '' && (container.innerHTML = `<div class="emptyTaskLine"><span>No tasks to do</span></div>`);
}

function renderTaskElement(task) {
    let section = document.createElement('section');
    section.id = task.id;
    section.className = 'section';
    section.innerHTML = renderTaskHTML(task);
    return section;
}

function renderTaskHTML(task) {
    return /*html*/`
        <div>
            ${checkTaskCategory(task.category)}
        </div>
        <article>
            <span class="taskTitle">${formatTaskText(task.title)}</span>
            <p class="taskDescription">${formatTaskText(task.description)}</p>
        </article>
        <div id="subtask_contain${task.id}" class="subtaskContain">
            <div class="progressbar-container">
                <div class="progressbar"></div>
            </div>
            <span id="subtaskTxt${task.id}" class="subtaskTxt">1/2 Subtasks</span>
        </div>
        <div class="profilePropertyContain">
            <div id="profile${task.id}" class="profileContain">
                <div class="profileBadge">RP</div>
                <div class="profileBadge">RP</div>
                <div class="profileBadge">RP</div>
                <div class="profileBadge">RP</div>
                <div class="profileBadge">RP</div>
                <div class="profileBadge">RP</div>
                <div class="profileBadge">RP</div>
                <div class="profileBadge">RP</div>
                <div class="profileBadge">RP</div>
            </div>
            <img src="/images/Property 1=Low.svg">
        </div>
    `;
}

function formatTaskText(text) {
    let trimmedText = text.trim();
    return currentTask === 'small' && trimmedText.length > 57
        ? trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1, 57) + '...'
        : trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1);
}

function checkTaskCategory(category) {
    return category === 'user' ?
        `<h2 class="userStory">User Story</h2>` :
        `<h2 class="technicalTask">Technical Task</h2>`;
}







/** document.getElementById('to_do').innerHTML += html`
<section class="section">
    <h2 class="userStory">User Story</h2>
    <article>
        <span class="taskTitle">Kochwelt Page & Recipe Recommender</span>
        <p class="taskDescription">Build start page with recipe recommender</p>
    </article>
    <div id="subtask_contain">
        <div class="progressbar-container">
            <div class="progressbar"></div>
        </div>
        <span id="subtask">1/2 Subtasks</span>
    </div>
    <div class="profilePropertyContain">
        <div id="profile" class="profileContain">
            <div class="profileBadge">RP</div>
            <div class="profileBadge">RP</div>
            <div class="profileBadge">RP</div>
            <div class="profileBadge">RP</div>
            <div class="profileBadge">RP</div>
            <div class="profileBadge">RP</div>
            <div class="profileBadge">RP</div>
            <div class="profileBadge">RP</div>
            <div class="profileBadge">RP</div>
        </div>
        <img src="/images/Property 1=Low.svg">
    </div>
</section>
*/

/** <div class="emptyTaskLine"><span>No tasks to do</span></div>
*/