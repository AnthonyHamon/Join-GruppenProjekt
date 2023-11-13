let tasks = [];
let currentTask = 'small'


async function setNewTask() {
    let index = tasks.length;
    let id = `${index}`;
    let title = 'Lorem, ipsum dolor sit epelle ndis impedit.';
    let description = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem eos a repellendus numquam libero consectetur non ut omnis illum mollitia dignissimos maiores aliquid exercitationem, optio facilis, porro, maxime reiciendis impedit.';
    let date = '33.33.2023';
    let priority = 'Low';
    let category = 'Backend';
    let status = 'to_do';
    tasks.push({ id, title, description, date, priority, category, status });
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
    if (container.innerHTML === '') {
        container.innerHTML = `<div class="emptyTaskLine"><span>No tasks to do</span></div>`;
    }
}

function renderTaskElement(task) {
    let section = document.createElement('section');
    section.className = 'section';
    section.onclick = function () {
        openTask(task);
    };
    section.innerHTML = renderTaskHTML(task);
    return section;
}

function openTask(task) {
    let contain = document.getElementById('taskDetailsContain');
    currentTask = 'big';
    contain.innerHTML = /*html*/`
        <div onclick="stop(event)" class="taskDetails">
            ${renderTaskHTMLDetails(task)}
        </div>
    `;
    contain.classList.remove('d-none');
}

function closeTask() {
    let contain = document.getElementById('taskDetailsContain');
    currentTask = 'small';
    contain.classList.add('d-none');
}

function renderTaskHTMLDetails(task) {
    return /*html*/`
        <div>
            ${checkTaskCategory(task.category)}
        </div>
        <span class="taskTitleDetails">${formatTaskText(task.title)}</span>
        <p class="taskDescriptionDetails">${formatTaskText(task.description)}</p>
        <div>
            <span class="dateTitleDetails">Due date:</span>
            <span class="dateTxtDetails">12.11.2023</span>
        </div>
        <div>
            <span class="priorityTitleDetails">Priority:</span>
            <span class="priorityTxtDetails">${checkPriority(task.priority)}</span>
        </div>
        <span class="assignedTitle">Assigned To:</span>
        <div class="assignedContain">
            <div class="assignedProfil">
                <div class="assignedBadge">ED</div>
                <span>Elisabeth Derella</span>
            </div>
            <div class="assignedProfil">
                <div class="assignedBadge">RP</div>
                <span>René Porzelt</span>
            </div>
        </div>
        <span>Subtasks</span>
        <div>
            <p></p>
            <p></p>
        </div>
    `;
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
            <div id="task_priority_contain">
                ${checkPriority(task.priority)}
            </div>
        </div>
    `;
}

function formatTaskText(text) {
    let trimmedText = text.trim();
    if (currentTask === 'small' && trimmedText.length > 57) {
        return trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1, 57) + '...';
    } else {
        return trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1);
    }
}

function checkPriority(priority) {
    if (currentTask === 'small') {
        return returnTaskPrioritySmallHTML(priority);
    } else if (currentTask === 'big') {
        return returnTaskPriorityBigHTML(priority);
    }
}

function checkTaskCategory(category) {
    let formattedCategory = category.replace(/_/g, ' ');
    if (currentTask === 'small') {
        return returnTaskCategorySmallHTML(category, formattedCategory);
    } else if (currentTask === 'big') {
        return returnTaskCategoryBigHTML(category, formattedCategory);
    }
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