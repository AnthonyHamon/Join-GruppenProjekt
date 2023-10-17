function renderSummary() {
    summaryBgrColor();
    removeBgrColorWithoutSummary();
    removeJoinLogoClickable();
    generateSummaryHTML();
}

function summaryBgrColor() {
    document.getElementById('summary').classList.add('currentTemplate', 'p-none');
    document.getElementById('summary_mobile').classList.add('currentTemplate', 'p-none');
}

function removeBgrColorWithoutSummary() {
    document.getElementById('add_task').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
    document.getElementById('add_task_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts_mobile').classList.remove('currentTemplate', 'p-none');
}

function removeJoinLogoClickable() {
    document.getElementById('join_logo').classList.add('p-none');
    document.getElementById('join_logo_mobile').classList.add('p-none');
}