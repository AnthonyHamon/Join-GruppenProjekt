let tasks = [{
    'id': 0,
    'title': 'The Title 0',
    'description': 'here you see the description 0',
    'status': 'done'
}, {
    'id': 1,
    'title': 'The Title 1',
    'description': 'here you see the description 1',
    'status': 'feedback'
}, {
    'id': 2,
    'title': 'The Title 2',
    'description': 'here you see the description 2',
    'status': 'todo'
}, {
    'id': 3,
    'title': 'The Title 3',
    'description': 'here you see the description 3',
    'status': 'inProgress'
}];


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
    document.getElementById('to_do').innerHTML = '';
    for (i = 0; i < todo.length; i++) {
        let element = todo[i];
        console.log(`todo : (${element['id']})`, element);
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
