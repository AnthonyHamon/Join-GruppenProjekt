<<<<<<< HEAD
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
=======
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
>>>>>>> 631436dde392137848e69fe5cd7b5300322d38d2
}