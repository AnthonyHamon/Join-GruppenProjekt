function changeCurrentTemplate() {
    showCurrentBgrColor();
    removeOtherBgrColor();
    renderHTML();
}

function showCurrentBgrColor() {

}

function removeOtherBgrColor() {

}

function renderHTML() {
    let content = document.getElementById('content');

    content.innerHTML = /*html*/`
        <h1>Add Task</h1>
    `;
}