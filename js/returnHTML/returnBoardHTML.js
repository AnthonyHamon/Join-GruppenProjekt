function generateBoardHTML() {
    content.innerHTML = '';
    content.innerHTML =/*html*/`
        <div class="titleContain">
            <h1>Board</h1>
            <div class="flex inputPlusBtn">
                <div class="boardInputBox">
                    <input id="find_task" onkeyup="searchTaskFromInput()" class="inputFindTask" type="text" placeholder="Find Task">
                    <img src="/images/search.svg">
                </div>
                <button onclick="setNewTask()" class="addTaskBtn"><span class="addBtnText">Add task</span><img src="/images/add.svg"></button>
            </div>
        </div>
        <div id="width_HTML"></div>
        <div id="loading_spinner" class="loadingSpinnerDiv d-none">
            <div>
                ${returnLoadingJoinSvg()}
            </div>
        </div>
    `;
}

function generateBoardWidthPlus1300HTML() {
    document.getElementById('width_HTML').innerHTML = /*html*/`
                    <div class="progressNamesContain">
                <p class="progressName">To do ${returnAddBtnSVG('to_do')}</p>
                <p class="progressName">In progress ${returnAddBtnSVG('in_progress')}</p>
                <p class="progressName">Await feedback ${returnAddBtnSVG('feedback')}</p>
                <p class="progressName">Done</p>
            </div>
            <div class="scrollbar">
                <div class="taskContain">
                    <div id="to_do" class="taskLine"></div>
                    <div id="in_progress" class="taskLine"></div>
                    <div id="feedback" class="taskLine"></div>
                    <div id="done" class="taskLine"></div>
                </div>
            </div>
        </div>
    `;
}

function generateBoardWidthMinus1300HTML() {
    document.getElementById('width_HTML').innerHTML = /*html*/`
        <div class="scrollbar">
            <div class="progressNamesContain">
                <div class="progressNameWithLine">
                    <p class="progressName">To do ${returnAddBtnSVG('to_do')}</p>
                    <div id="to_do" class="taskLine scrollbarTaskLine"></div>
                <div class="progressNameWithLine">
                    <p class="progressName">In progress ${returnAddBtnSVG('in_progress')}</p>
                    <div id="in_progress" class="taskLine scrollbarTaskLine"></div>
                </div>
                <div class="progressNameWithLine">
                    <p class="progressName">Await feedback ${returnAddBtnSVG('feedback')}</p>
                    <div id="feedback" class="taskLine scrollbarTaskLine"></div>
                <div class="progressNameWithLine">
                    <p class="progressName">Done</p>
                    <div id="done" class="taskLine scrollbarTaskLine"></div>
                </div> 
            </div>
        </div>
    `;
}

function renderTaskHTMLDetails(task) {
    return /*html*/`
        <div id="backgroundFromTaskPopup" class="background fadeInBackground"></div>
        <div onclick="stop(event)" id ="taskDetails" class="taskDetails slideInFromRight">
            <div class="flex spaceBetween">
                ${checkTaskCategory(task.category)}
            </div>
            <span class="taskTitleDetails">${formatTaskText(task.title)}</span>
            <p class="taskDescriptionDetails">${formatTaskText(task.description)}</p>
            <div class="titleTxtDetailsContain">
                <span class="titleDetails">Due date:</span>
                <span class="dateTxtDetails">10/05/2023</span>
            </div>
            <div class="titleTxtDetailsContain">
                <span class="titleDetails">Priority:</span>
                <span class="priorityTxtDetails">${checkPriority(task.priority)}</span>
            </div>
            <span class="titleDetails">Assigned To:</span>
            <div class="assignedContain">
                <div class="assignedProfil">
                    <div class="assignedBadge">ED</div>
                    <div class="assignedName">
                        <span class="assignedNameText">René Porzelt</span>
                    </div>
                </div>
                <div class="assignedProfil">
                <div class="assignedBadge">ED</div>
                    <div class="assignedName">
                        <span class="assignedNameText">Elisa Papetti</span>
                    </div>
                </div>
                <div class="assignedProfil">
                <div class="assignedBadge">ED</div>
                    <div class="assignedName">
                        <span class="assignedNameText">DieElisabeth Großhausendurchhausen</span>
                    </div>
                </div>
                <div class="assignedProfil">
                <div class="assignedBadge">ED</div>
                    <div class="assignedName">
                        <span class="assignedNameText">Renéasf asfasgasfasfsafafssss</span>
                    </div>
                </div>
            </div>
            <span class="titleDetails">Subtasks</span>
            <div>
                <p></p>
                <p></p>
            </div>
            <div class="editOptionsDetailsContain">
                <div onclick="confirmTaskDeletion(${task.id}, '${task.title}')" class="deleteDetailsContain">
                    <img src="/images/delete.svg"><span>Delete</span>
                </div>
                <div class="seperator"></div>
                <div class="editDetailsContain">
                    <img src="/images/edit.svg"><span>Edit</span>
                </div>
            </div>
        </div>
    `;
}

function returnLoadingJoinSvg() {
    return /*html*/`
        <svg width="122" height="142" viewBox="0 0 102 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="102" height="122" fill="transparent"/>
            <defs>
                <mask id="fill-mask">
                    <rect x="0" y="122" width="102" height="122" fill="white">
                        <animate attributeName="y" values="122;0" dur="1s" repeatCount="indefinite" />
                    </rect>
                </mask>
            </defs>
                <g mask="url(#fill-mask)">
                <path d="M72.6549 0H50.4971V25.4923H72.6549V0Z" fill="#2A3647"/>
                <path d="M50.4971 46.2251H72.655V82.1779C72.7562 90.8292 70.2941 99.3153 65.5815 106.557C60.9284 113.594 51.9459 121.966 35.3275 121.966C17.2263 121.966 6.67577 113.406 0.98291 108.715L14.9594 91.4743C20.5159 96.0112 25.8679 99.7435 35.4128 99.7435C42.6396 99.7435 45.5202 96.7988 47.2076 94.2307C49.5015 90.6637 50.6881 86.4923 50.6165 82.2464L50.4971 46.2251Z" fill="#2A3647"/>
                <path d="M39.1967 30.1318H17.0388V52.3884H39.1967V30.1318Z" fill="#29ABE2"/>
                <path d="M84.2624 111.522C84.2624 116.265 81.8591 118.815 78.5013 118.815C75.1436 118.815 72.9448 115.785 72.9448 111.762C72.9448 107.739 75.2117 104.554 78.6888 104.554C82.1659 104.554 84.2624 107.687 84.2624 111.522ZM75.5185 111.711C75.5185 114.57 76.6605 116.675 78.6206 116.675C80.5808 116.675 81.6886 114.45 81.6886 111.539C81.6886 108.988 80.666 106.592 78.6206 106.592C76.5753 106.592 75.5185 108.903 75.5185 111.711Z" fill="#2A3647"/>
                <path d="M88.6597 104.76V118.593H86.2053V104.76H88.6597Z" fill="#2A3647"/>
                <path d="M91.3186 118.593V104.76H94.0457L96.9774 110.461C97.7321 111.952 98.4035 113.483 98.9886 115.049C98.8352 113.337 98.767 111.368 98.767 109.177V104.76H101.017V118.593H98.4773L95.5115 112.772C94.7264 111.243 94.0264 109.671 93.4151 108.064C93.4151 109.776 93.5344 111.711 93.5344 114.09V118.576L91.3186 118.593Z" fill="#2A3647"/>
            </g>
        </svg>
    `;
}

function returnTaskCategorySmallHTML(category, formattedCategory) {
    return `<h2 class="taskCategorySmall ${category}">${formattedCategory}</h2>`;
}

function returnTaskCategoryBigHTML(category, formattedCategory) {
    return `<h2 class="taskCategoryBig ${category}">${formattedCategory}</h2><img class="closeWindowImage" src="/images/close.svg" onclick="closeTask()"></img>`;
}

function returnTaskPrioritySmallHTML(priority) {
    return `<img src="/images/${priority}.svg">`
}

function returnTaskPriorityBigHTML(priority) {
    return `<span>${priority}</span> <img src="/images/${priority}.svg">`
}

function returnAddBtnSVG(status) {
    return /*html*/`
        <svg onclick="addTaskFromBtn('${status}')" class="svgHover" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6665 8.5V16.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
            <path d="M16.6665 12.5754L8.6665 12.5754" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
            <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="#2A3647" stroke-width="2"/>
        </svg>
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

function returnConfirmationPopupHTML(id, msg) {
    return /*html*/`
        <div class="confirmationContent">
        <p>${msg}</p>
        <div class="confirmationPopupBtnContain">
            <button onclick="deleteTask(${id})" style="color:rgba(255,0,0,90%);">Delete</button>
            <button onclick="closeConfirmationPopup()">Cancel</button>
        </div>
        </div>
    `;
}