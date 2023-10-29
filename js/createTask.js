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
    'status': 'todo'
}, {
    'id': 3,
    'title': 'The Title 3',
    'description': 'here you see the description 3',
    'category': 'technical',
    'status': 'inProgress'
}];

let currentTask = 'small'



function renderAllTasks() {
    let todo = tasks.filter(t => t['status'] == 'todo');
    let inProgress = tasks.filter(t => t['status'] == 'inProgress');
    let feedback = tasks.filter(t => t['status'] == 'feedback');
    let done = tasks.filter(t => t['status'] == 'done');

    renderTasksTodo(todo);
    renderTasksInProgress(inProgress);
    renderTasksFeedback(feedback);
    renderTasksDone(done);
}

function renderTasksTodo(todo) {
    let todoContain = document.getElementById('to_do');
    todoContain.innerHTML = '';
    for (i = 0; i < todo.length; i++) {
        let element = todo[i];
        todoContain.innerHTML = /*html*/`
            ${renderTaskHTML(element['id'], element['title'], element['description'], element['category'])}
        `;
    }
}

function renderTasksInProgress(inProgress) {
    let inProgressContain = document.getElementById('in_progress');
    inProgressContain.innerHTML = '';
    for (i = 0; i < inProgress.length; i++) {
        let element = inProgress[i];
        inProgressContain.innerHTML = /*html*/`
            ${renderTaskHTML(element['id'], element['title'], element['description'], element['category'])}
        `;
    }
}

function renderTasksFeedback(feedback) {
    let feedbackContain = document.getElementById('feedback');
    feedbackContain.innerHTML = '';
    for (i = 0; i < feedback.length; i++) {
        let element = feedback[i];
        feedbackContain.innerHTML = /*html*/`
            ${renderTaskHTML(element['id'], element['title'], element['description'], element['category'])}
        `;
    }
}

function renderTasksDone(done) {
    let doneContain = document.getElementById('done');
    doneContain.innerHTML = '';
    for (i = 0; i < done.length; i++) {
        let element = done[i];
        doneContain.innerHTML = /*html*/`
            ${renderTaskHTML(element['id'], element['title'], element['description'], element['category'])}
        `;
    }
}

function renderTaskHTML(id, title, description, category) {
    return /*html*/`
        <section id="${id}" class="section">
            <div>
                ${checkTaskCategory(category)}
            </div>
            <article>
                <span class="taskTitle">${returnTaskTitle(title)}</span>
                <p class="taskDescription">${returnTaskDescription(description)}</p>
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
    `;
}

function returnTaskTitle(title) {
    if (title.length > 57 && currentTask == 'small') {
        return title.charAt(0).toUpperCase() + title.slice(1).substring(0, 57) + '...';
    } else if (title.length <= 57 && currentTask == 'small') {
        return title.charAt(0).toUpperCase() + title.slice(1);
    } else if (currentTask == 'big') {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }
}

function returnTaskDescription(description) {
    if (description.length > 57 && currentTask == 'small') {
        return description.charAt(0).toUpperCase() + description.slice(1).substring(0, 57) + '...';
    } else if (description.length <= 57 && currentTask == 'small') {
        return description.charAt(0).toUpperCase() + description.slice(1);
    } else if (currentTask == 'big') {
        return description.charAt(0).toUpperCase() + description.slice(1);
    }
}

function checkTaskCategory(category) {
    if (category == 'user') {
        return `<h2 class="userStory">User Story</h2>`;
    } else {
        return `<h2 class="technicalTask">Technical Task</h2>`;
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
