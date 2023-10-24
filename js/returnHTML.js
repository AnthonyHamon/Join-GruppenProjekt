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
    content.innerHTML = `
        <main class="contacts_content">
            <section class="contact_list_section">

                <div class="add_contact_btn_div">
                    <div id="add-contact-button">
                        <span>Add new contact</span>
                        <img src="../images/person_add.svg" alt="">
                    </div>
                </div>
                <div class="contacts_list_div">
                    <div>
                        <div class="contact_organizer">
                            <span>A</span>
                        </div>
                        <hr class="divider">
                 </div>
                    <div class="contact_div">
                        <div class="contact_circle">
                            AM
                        </div>
                <div class="flex_column gap_5">
                            <div id="contact-name">
                                Anton Mayer
                            </div>
                            <span id="contact-email">antonm@gmail.com<span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="selected_contact_infos">
                <!-- contact info -->
                <div class="contact_title">
                    <h1>Contacts</h1>
                    <img src="../images/Vector 5.svg" alt="">
                    <span>Better with a Team</span>
                </div>
                <div id="selected-contact-content" class="padding_left_62">
                    <div class="align_item_center gap_54">
                        <div class="selected_contact_circle">
                            AM
                        </div>
                        <div class="flex_column align_item_start gap_8">
                            <div id="selected-contact-name">
                                Anton Mayer
                            </div>
                            <div class="align_item_center gap_16">
                                <div id="edit-selected-contact" class="align_item_center gap_8">
                                    <img src="../images/edit.svg" alt="">
                                    <span>Edit</span>
                                </div>
                                <div id="delete-selected-contact" class="align_item_center gap_8">
                                    <img src="../images/delete.svg" alt="">
                                    <span>Delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contact_information_title">
                        Contact Information
                    </div>
                    <div class="flex_column gap_15">
                        <span class="font_weight_700">Email</span>
                        <span id="selected-contact-email">anton@gmail.com</span>
                    </div>
                    <div class="flex_column gap_15">
                        <span class="font_weight_700">Phone</span>
                        <span id="selected-contact-phone">+49 0123 456 789</span>
                    </div>
                </div>
            </section>
        </main>
        <div class="mobile_add_contact_button_ctn d-none">
            <div class="mobile_add_contact_button">
                <img src="..//images/person_add.svg">
            </div>
        </div>
    `
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
                <button id="add_taskBtn"><span class="addBtnText">Add task</span><img src="/images/add.svg"></button>
            </div>
        </div>
        <div id="width_HTML"></div>
    `;
}

function generateBoardWidthPlus1300HTML() {
    document.getElementById('width_HTML').innerHTML = /*html*/`
                    <div class="progressNamesContain">
                <p class="progressName">To do ${returnAddBtn('to_do')}</p>
                <p class="progressName">In progress ${returnAddBtn('in_progress')}</p>
                <p class="progressName">Await feedback ${returnAddBtn('feedback')}</p>
                <p class="progressName">Done</p>
            </div>
            <div class="scrollbar">
                <div class="taskContain">
                    <div id="to_do" class="taskLine">
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
                    </div>
                    <div id="in_progress" class="taskLine">
                        <section class="section">
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
                    <div class="emptyTaskLine">
                            <span>No tasks to do</span>
                        </div>
                    </div>
                    <div id="done" class="taskLine">
                        <section class="section">
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

function generateBoardWidthMinus1300HTML() {
    document.getElementById('width_HTML').innerHTML = /*html*/`
        <div class="scrollbar">
            <div class="progressNamesContain">
                <div class="progressNameWithLine">
                    <p class="progressName">To do ${returnAddBtn('to_do')}</p>
                    <div id="to_do" class="taskLine scrollbarTaskLine">
                    <div class="emptyTaskLine">
                            <span>No tasks to do</span>
                        </div>
                    </div>
                </div>
                <div class="progressNameWithLine">
                    <p class="progressName">In progress ${returnAddBtn('in_progress')}</p>
                    <div id="in_progress" class="taskLine scrollbarTaskLine">
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
                    </div>
                </div>
                <div class="progressNameWithLine">
                    <p class="progressName">Await feedback ${returnAddBtn('feedback')}</p>
                    <div id="feedback" class="taskLine scrollbarTaskLine">
                    <div class="emptyTaskLine">
                            <span>No tasks to do</span>
                        </div>
                    </div>
                </div>
                <div class="progressNameWithLine">
                    <p class="progressName">Done</p>
                    <div id="done" class="taskLine scrollbarTaskLine">
                    <div class="emptyTaskLine">
                            <span>No tasks to do</span>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    `;
}

// HTML for Login & SignUp Page.

function returnPrivacyPoliceErrorMsg() {
    return `
    Please accept our Privacy Policy
    `
}

function returnPasswordError() {
    return `
    Wrong Password, please try it again!
    `
}