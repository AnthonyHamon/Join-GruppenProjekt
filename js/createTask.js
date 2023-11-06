let tasks = [{
    'id': 0,
    'title': 'The Title 0',
    'description': 'here you see the description 0',
    'category': 'user',
    'status': 'done'
}, {
    'id': 1,
    'title': 'The Title 1',
    'description': 'here you see the description 1',
    'category': 'technical',
    'status': 'feedback'
}, {
    'id': 2,
    'title': 'asssssssssssssss sssssss sssssssasdadssssss asdadssssssasdadfas fasfsdasdsfsadsad2',
    'description': 'hoch hinauf war der kleine bär der mutvoll um den mond renn nt, doch als die krähe kam, gint er seines weges 2',
    'category': 'user',
    'status': 'to_do'
}, {
    'id': 3,
    'title': 'The Title 3',
    'description': 'here you see the description 3',
    'category': 'technical',
    'status': 'in_progress'
}];

let currentTask = 'small'

function renderAllTasks() {
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
    if (currentTask === 'small' && text.length > 57) {
        return text.charAt(0).toUpperCase() + text.slice(1, 57) + '...';
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
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
