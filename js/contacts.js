function renderContacts() {
    contactsBgrColor();
    removeBgrColorWithoutContacts();
    addJoinLogoClickable();
    generateContactsHTML();
}

function contactsBgrColor() {
    document.getElementById('contacts').classList.add('currentTemplate', 'p-none');

}

function removeBgrColorWithoutContacts() {
    document.getElementById('add_task').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary').classList.remove('currentTemplate', 'p-none');
}

function addJoinLogoClickable() {
    document.getElementById('join_logo').classList.remove('p-none');
}