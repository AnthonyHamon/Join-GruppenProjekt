function generateAddTaskHTML() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML = `
    <div class="task-container" id="">
    <div class="task-row">
        <div class="task-headline">
            <h1 class="task-name">Add Task</h1>
        </div>
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
                            <input class="textarea attrebute" type="text" name="myTextarea"
                                placeholder="Enter a Description" spellcheck required>
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
                    <div class="contact-container" id="contactContainer">
                        <div class="contact-box">
                            <div class="contacts-topfield">
                                <div class="contakts-name">
                                    <img src="..//images/Property 1=Anton.svg" alt="">
                                    <samp class="contact-name">Anton Mayer</samp>
                                </div>
                                <div>
                                    <button class="check-button"><img src="../images/Rectangle 5.svg"
                                            alt=""></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-field">
                <div>
                    <div class="date-field">
                        <h4>Due Date<span class="letter-color">*</span></h4>
                        <form class="date-container">
                            <div>
                                <input type="text" class="custom-date-text" id="customDateText"
                                    placeholder="dd/mm/yyyy" readonly>
                            </div>
                            <div>
                                <button class="date-button" type="button" onclick="toggleCalendar()">
                                    <img class="date-icon" src="../images/date.svg" alt="Calendar">
                                </button>
                            </div>
                        </form>
                        <div id="calendar" class="calendar-container">
                            <div class="calendar">
                                <div class="month">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="prio-container">
                    <h4>Prio</h4>
                    <div class="button-selection">
                        <button class="prio-button" id="buttonOrange" onclick="changeButtonStyles('orange')">Urgent
                            <img class="prio-image" id="iconOrange" src="../images/capa 2.svg" alt=""></button>
                        <button class="prio-button" id="buttonYellow" onclick="changeButtonStyles('yellow')">Medium
                            <img class="prio-image" id="iconYellow" src="../images/prio media.svg" alt=""></button>
                        <button class="prio-button" id="buttonGreen" onclick="changeButtonStyles('green')">Low <img
                                class="prio-image" id="iconGreen" src="../images/prio baja.svg" alt=""></button>
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
                    
                    <div class="subtask-content" id="subtaskContent">
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="task-below">
            <div>
                <p class="requered-field"><span class="letter-color">*</span>This field is requered</p>
            </div>
            <div class="clear-create-button">
                <button type="button" class="clear-button">Cancel<img src="../images/close.svg"></button>
                <button class="create-button">Craate Task <img class="clear-create-img" src="../images/check.svg" alt=""></button>
            </div>
        </div>
    </div>
</div>
    `;
}