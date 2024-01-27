// Subtask........

function addSubtask() {
    let subtaskInput = document.getElementById('subtaskInput');

    if (!subtaskInput.value == "") {
        createdSubtaskList.push({
            description: subtaskInput.value,
            subtaskStatus: "unfinished"
        });

        toggleSubtaskImages();
        renderSubtask();
    }
    subtaskInput.value = "";
}

function addSubtasksOnAlreadyCreatedTaks(id){
    let subtaskInput = document.getElementById('subtaskInput');
    let index = tasks.findIndex(t => t.id === id);
    const subtasks = tasks[index]['subtasks'];

    if (!subtaskInput.value == "") {
        subtasks.push({
            description: subtaskInput.value,
            subtaskStatus: "unfinished"
        });
        toggleSubtaskImages();
        renderSubtaskForEditOption(subtasks, id);
    }
    subtaskInput.value = "";
}


/**
 * 
 * The checkEditedTaskList function checks if an edited subtask is present in the created subtask list. 
 * If found, it updates the subtask description and re-renders the subtask list. Otherwise, it outputs an error message.
 * 
 * @param {*} i 
 * @param {*} subtask 
 */
function checkEditedTaskList(i, subtask, id) {
    let index = createdSubtaskList.findIndex(s => s.description === subtask);
    editSubtasksWhilecreatingTask(i, subtask, index);
    if (id !== undefined) {
        editSubtaskOnAlreadyCreatedTask(i, subtask, id);
    }

}

function editSubtaskOnAlreadyCreatedTask(i, subtask, id) {
    let index = tasks.findIndex(t => t.id === id);
    const subtasks = tasks[index]['subtasks'];
    for (let j = 0; j < subtasks.length; j++) {
        const subtaskDescription = subtasks[j].description;
        if (subtaskDescription === subtask) {
            subtask = document.getElementById(`editInput${i}`).value;
            subtasks.splice(j, 1, {
                description: subtask,
                subtaskStatus: subtasks[j]['subtaskStatus']
            });
            renderSubtaskForEditOption(subtasks, id);
        }
    }
}

function editSubtasksWhilecreatingTask(i, subtask, index) {
    if (index !== -1) {
        subtask = document.getElementById(`editInput${i}`).value;

        createdSubtaskList.splice(index, 1, {
            description: subtask,
            subtaskStatus: createdSubtaskList[index].subtaskStatus
        });

        renderSubtask();
    }
}

function toggleSubtaskImages() {
    const imageContainer = document.getElementById("imageContainer");
    const newImages = document.getElementById("newImages");
    let subtaskInput = document.getElementById('subtaskInput');

    subtaskInput.focus();
    subtaskInput.select();

    subtaskInput.value = "";

    imageContainer.classList.toggle('d-none');
    newImages.classList.toggle('d-none');
}


function showSubtaskImagesByInput() {
    const imageContainer = document.getElementById("imageContainer");
    const newImages = document.getElementById("newImages");
    let subtaskInput = document.getElementById('subtaskInput');

    if (!subtaskInput.value == "") {
        imageContainer.classList.add('d-none');
        newImages.classList.remove('d-none');
    } else {
        imageContainer.classList.remove('d-none');
        newImages.classList.add('d-none');
    }
}


function renderSubtask() {
    let subtaskContent = document.getElementById('subtaskContent');
    subtaskContent.innerHTML = '';
    for (let index = 0; index < createdSubtaskList.length; index++) {
        const subtask = createdSubtaskList[index];

        subtaskContent.innerHTML += returnSubtask(subtask.description, index);
    }
}


/**
 * 
 * The renderSubtaskForEditOption function updates the display of subtasks for the editing option. 
 * It clears the content of the HTML element with the ID 'subtaskContent' 
 * and then adds subtasks based on the provided information using the returnSubtask function.
 * 
 * @param {*} subtasks 
 */
function renderSubtaskForEditOption(subtasks, id) {
    let subtaskContent = document.getElementById('subtaskContent');
    subtaskContent.innerHTML = '';
    for (let index = 0; index < subtasks.length; index++) {
        const subtask = subtasks[index].description;

        subtaskContent.innerHTML += returnSubtask(subtask, index, id);
    }
}


function toggleSubtask(i) {
    document.getElementById(`taskList${i}`).classList.toggle('d-none');
    document.getElementById(`editTaskList${i}`).classList.toggle('d-none');

    document.getElementById(`editInput${i}`).focus();
    document.getElementById(`editInput${i}`).select();
}


function deleteButton(i, subtask, id) {
    deleteSubtaskWhileCreatingTask(i);
    if (id !== undefined) {
        deleteSubtaskOnAlreadyCreatedTask(subtask, id)
    }
}


function deleteSubtaskWhileCreatingTask(i) {
    createdSubtaskList.splice(i, 1);
    renderSubtask();
}


function deleteSubtaskOnAlreadyCreatedTask(subtask, id) {
    let index = tasks.findIndex(t => t.id === id);
    const subtasks = tasks[index]['subtasks'];
    for (let j = 0; j < subtasks.length; j++) {
        const subtaskDescription = subtasks[j].description;
        if (subtaskDescription === subtask) {
            subtasks.splice(j, 1)
        }
        renderSubtaskForEditOption(subtasks, id);
    }
}