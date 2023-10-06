let content = document.getElementById('content');

function generateSummaryHTML() {
    content.innerHTML = '';
    content.innerHTML =/*html*/`
        <h1>Summary</h1>
    `;
    console.clear();
    console.table({ name: 'generateSummaryHTML()', where: 'in /js/summary.js', function: 'renderSummary()' });
}

function generateAddTaskHTML() {
    content.innerHTML = '';
    content.innerHTML =/*html*/`
        <h1>Add Task</h1>
    `;
    console.clear();
    console.table({ name: 'generateAddTaskHTML()', where: 'in /js/addTask.js', function: 'renderAddTask()' });
}

function generateContactsHTML() {
    content.innerHTML = '';
    content.innerHTML =/*html*/`
        <h1>Contacts</h1>
    `;
    console.clear();
    console.table({ name: 'generateContactsHTML', where: 'in /js/contacts.js', function: 'renderContacts()' });
}

function generateBoardHTML() {
    content.innerHTML = '';
    content.innerHTML =/*html*/`
        <div class="titleContain">
            <h1>Board</h1>
            <div class="flex inputPlusBtn">
                <div class="boardInputBox">
                    <input id="find_task" class="inputFindTask" type="text" placeholder="Find Task">
                    <img src="/images/search.svg">
                </div>
                <button id="add_taskBtn">Add task <img src="/images/add.svg"></button>
            </div>
        </div>
        <div class="maxWithFlex">
            <div class="progressNamesContain">
                <p>To do ${returnAddBtn('to_do')}</p>
                <p>In progress ${returnAddBtn('in_progress')}</p>
                <p>Await feedback ${returnAddBtn('feedback')}</p>
                <p>Done</p>
            </div>
            <div class="scrollbar">
                <div class="taskContain">
                    <div id="to_do" class="taskLine">
                    <section>
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
                    </div>
                    <div id="in_progress" class="taskLine">
                    <section>
                        <h2 class="userStory">User Story</h2>
                        <article>
                            <span class="taskTitle">Kochwelt Page & Recipe Recommender</span>
                            <p class="taskDescription">Build start er</p>
                        </article>
                        <div class="profilePropertyContain">
                            <div id="profile" class="profileContain">
                                <div class="profileBadge">RP</div>
                                <div class="profileBadge">RP</div>
                                <div class="profileBadge">RP</div>
                                <div class="profileBadge">RP</div>
                                <div class="profileBadge">RP</div>
                            </div>
                            <img src="/images/Property 1=Low.svg">
                        </div>
                    </section>
                    </div>
                    <div id="feedback" class="taskLine">
                    </div>
                    <div id="done" class="taskLine">
                    <section>
                        <h2 class="userStory">User Story</h2>
                        <article>
                            <span class="taskTitle">Kochwelt Page & Recipe Recommender</span>
                            <p class="taskDescription">Build start er</p>
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
                            </div>
                            <img src="/images/Property 1=Low.svg">
                        </div>
                    </section>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// HTML for Login & SignUp Page.

function returnPrivacyPoliceErrorMsg(){
    return `
    Please accept our Privacy Policy
    `
}

function returnPasswordError(){
    return `
    Wrong Password, please try it again!
    `
}