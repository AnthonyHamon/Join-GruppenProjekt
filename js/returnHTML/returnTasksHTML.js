function generateAddTaskHTML() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML = `
    <div class="task-container">
            <div class="task-headline">
                <h1 class="task-name">Add Task</h1>
            </div>
        <div class="task_input_ctn">
            <div class="task-input">
                <div class="left-field">
                    <div>
                        <form class="titel-field">
                            <h4>Title<span class="letter-color">*</span></h4>
                            <input class="titel-input" required type="text" name="myInput" placeholder="Enter a title">
                        </form>
                    </div>
                    <div class="description-field">
                        <h4>Description</h4>
                        <div class="textarea-container">
                            <div class="textarea-field">
                                <textarea class="textarea attrebute" type="text" name="myTextarea"
                                    placeholder="Enter a Description" spellcheck required></textarea>
                            </div>
                            <div>
                                <img class="description-icon" src="../images/Recurso 1 1.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="contacts-field">
                        <h4>Assigned to</h4>
                        <div class="custom-dropdown">
                            <input class="assign-input" type="search" placeholder="Select contacts to assign">
                            <button class="assign-button" onclick="toggleContacts()"><img onclick="rotateIcon()"
                                src="../images/arrow_drop_downaa.svg" alt="Arrow Icon" id="arrowIcon"></button>
                        </div>
                        <div class="contact-container d-none" id="contactContainer">
                            <div class="contact-box">
                                <div id="assigned-to-current-user-ctn" class="contacts-topfield">
                                    <div class="contacts-name">
                                        <div id="current-user-initial" class="contact_circle"></div>
                                        <span id="current-user-name" class="contact-name"></span>
                                    </div>
                                    <div>
                                        <button class="check-button"><img src="../images/Rectangle 5.svg"
                                        alt=""></button>
                                    </div>
                                </div>
                                <div id="assigned-to-contact-list"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right-field">
                    <div>
                        <div class="date-field">
                            <h4>Due Date<span class="letter-color">*</span></h4>
                            <input required class="calender_input" type="date" placeholder="dd/mm/yyyy">
                        </div>
                    </div>
                    <div class="prio-container">
                        <h4>Prio</h4>
                        <div class="button-selection">
                            <button class="prio-button" id="buttonUrgent" onclick="changeButtonStyles('Urgent')">Urgent
                                <img class="prio-image" id="iconUrgent" src="../images/capa 2.svg" alt=""></button>
                            <button class="prio-button" id="buttonMedium" onclick="changeButtonStyles('Medium')">Medium
                                <img class="prio-image" id="iconMedium" src="../images/prio media.svg" alt=""></button>
                            <button class="prio-button" id="buttonLow" onclick="changeButtonStyles('Low')">Low <img
                                class="prio-image" id="iconLow" src="../images/prio baja.svg" alt=""></button>
                        </div>
                    </div>
                    <div class="category-fields">
                        <h4>Category<span class="letter-color">*</span></h4>
                        <div onclick="toggleDropdown()">
                            <form class="custom-list">
                                <span class="span-category" id="selectedCategory">Select task category</span>
                                <div class="category-icon-field">
                                    <img class="drop-option" id="selectIcon" src="../images/arrow_drop_downaa.svg"
                                        alt="Arrow">
                                </div>
                                <ul id="dropdownOptions" class="dropdown-options" onclick="selectCategory(event)">
                                    <li onclick="toggleDropdown()" data-category="Technical Task">Technical Task</li>
                                    <li onclick="toggleDropdown()" data-category="User Story">User Story</li>
                                </ul>
                            </form>
                        </div>
                    </div>
                    <div class="subtask-container">
                        <h4>Subtasks</h4>
                        <div class="subtask-field">
                            <div class="subtask-input-container">
                                <input disabled id="subtaskInput" class="subtask-input" type="text" name="myInput" placeholder="Add new subtask">
                            </div>
                            <div class="subtask-image-field-first" id="imageContainer">
                                <img src="../images/Property 1=add.svg" alt="" onclick="toggleImages()">
                            </div>
                            <div class="subtask-image-field-second" id="newImages" style="display: none;">
                                <img id="closeImag" onclick="closeImages()" class="subtask-button-close" src="../images/Property 1=close.svg" alt="">
                                <img id="checkImage" class="subtask-button-check" src="../images/Property 1=check.svg" alt="" onclick="addSubtask(); closeImages();">
                            </div>
                        </div>
                        <div class="subtask-content" id="subtaskContent"></div>
                    </div>
                </div>
            </div>
        
            <div class="task-below">
                <div>
                    <div class="requered-field"><span class="letter-color">*</span>This field is requered</div>
                </div>
                <div class="clear-create-button">
                    <button type="button" class="clear-button">Cancel<img src="../images/close.svg"></button>
                    <button class="create-button">Create Task <img class="clear-create-img" src="../images/check.svg" alt=""></button>
                </div>
            </div>
        </div>
    </div>
    `;
}


function returnSubtask(inputText, i) {
    return `
    <div class="task-list" id="taskList${i}">
        <div class="liest-field">
            <div class="tasks-content">
                <p class="finished-content" id="finishedContent${i}">${inputText}</p>
            </div>
            <div class="edit-delete-container">
                <div class="edit-box">
                    <img onclick="toggleSubtask(${i})" class="edit-image" id="editImage${i}" src="../images/Property 1=edit.svg" alt="">
                </div>
                <div class="delete-box" id="deleteBox">
                    <img onclick="deleteButton(${i})" class="delete-image" id="deleteImage${i}" src="../images/Property 1=delete.svg" alt="" >
                </div>
            </div>
        </div>
    </div>
    <div class="edit-list d-none" id="editTaskList${i}">
        <div class="liest-field">
            <div class="tasks-content">
                <input id="editInput${i}" class="subtask-input" value="${inputText}" type="text">
            </div>
            <div class="delete-check-container">
                <div class="delete-box">
                    <img onclick="deleteButton(${i})" class="delete-image" src="../images/Property 1=delete.svg" alt="">
                </div>
                <div class="edit-box">
                    <img onclick="checkEditedTaskList(${i}, '${inputText}')" id="checkImage" class="subtask-button-check" src="../images/Property 1=check.svg" alt="" onclick="addSubtask(); closeImages();">
                </div>
            </div>
        </div>
    </div>
    `
};

function returnAssignedToContactList(contact){
    return `
    <div class="contacts-followfield">
        <div class="contacts-name">
            <div style="background-color:${contact['BgColor']}" class="contact_circle">${contact['initial']}</div>
            <span class="contact-name">${contact['name']}</span>
        </div>
        <div>
            <button class="check-button"><img src="../images/Rectangle 5.svg" alt=""></button>
        </div>
    </div>
    `;
}