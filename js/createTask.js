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
    'category': 'user',
    'status': 'feedback'
}, {
    'id': 2,
    'title': 'The Title 2',
    'description': 'here you sa segoj oerahja ujgn awn asd3 ip ti as sas on 2',
    'category': 'user',
    'status': 'todo'
}, {
    'id': 3,
    'title': 'The Title 3',
    'description': 'here you see the description 3',
    'category': 'user',
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
            <section id="${element['id']}" class="section">
                <div>
                    ${checkTaskCategory(element['category'])}
                </div>
                <article>
                    <span class="taskTitle">${checkTaskTitle(element['title'])}</span>
                    <p class="taskDescription">${checkTaskDescription(element['description'])}</p>
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
}

function checkTaskDescription(description) {
    if (description.length > 48 && currentTask == 'small') {
        return description.substring(0, 48) + '...';
    } else if (description.length <= 48 && currentTask == 'small') {
        return description;
    } else if (currentTask == 'big') {
        return description;
    }
}

function checkTaskTitle(title) {

}

function checkTaskCategory(category) {
    if (category == 'user') {
        return `<h2 class="userStory">User Story</h2>`;
    } else {
        return `<h2 class="technicalTask">Technical Task</h2>`;
    }
}

function renderTasksInProgress(inProgress) {
    document.getElementById('in_progress').innerHTML = '';
    for (i = 0; i < inProgress.length; i++) {
        let element = inProgress[i];
        console.log(`in Progress : (${element['id']})`, element);
    }
}

function renderTasksFeedback(feedback) {
    document.getElementById('feedback').innerHTML = '';
    for (i = 0; i < feedback.length; i++) {
        let element = feedback[i];
        console.log(`Feedback : (${element['id']})`, element);
    }
}

function renderTasksDone(done) {
    document.getElementById('done').innerHTML = '';
    for (i = 0; i < done.length; i++) {
        let element = done[i];
        console.log(`Done : (${element['id']})`, element);
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
