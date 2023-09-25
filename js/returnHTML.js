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

function generateBoardHTML() {
    content.innerHTML = '';
    content.innerHTML =/*html*/`
        <h1>BOARD</h1>
    `;
    console.clear();
    console.table({ name: 'generateBoardHTML()', where: 'in /js/board.js', function: 'renderBoard()' });
}

function generateContactsHTML() {
    content.innerHTML = '';
    content.innerHTML =/*html*/`
        <h1>Contacts</h1>
    `;
    console.clear();
    console.table({ name: 'generateContactsHTML', where: 'in /js/contacts.js', function: 'renderContacts()' });
}