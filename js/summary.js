function renderSummary() {
    summaryBgrColor();
    removeBgrColorWithoutSummary();
    removeJoinLogoClickable();
    generateSummaryHTML();
}

function summaryBgrColor() {
    document.getElementById('summary').classList.add('currentTemplate', 'p-none');
}

function removeBgrColorWithoutSummary() {
    document.getElementById('add_task').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
}

function removeJoinLogoClickable() {
    document.getElementById('join_logo').classList.add('p-none');
}