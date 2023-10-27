async function initContacts(){
    await includeHTML();
}

function renderContacts() {
    contactsBgrColor();
    addContactsCSS();
    removeBgrColorWithoutContacts();
    addJoinLogoClickable();
    generateContactsHTML();
}

function showContactInformation(){
    let width = window.innerWidth;
    if (width < 900){
        showSelectedContactInformations();
        setCSSMobileContactInformation()
    }else{
        showSelectedContactInformations();
    }
}

function showSelectedContactInformations(){
    let contactInformations = document.getElementById('selected-contact-content');
    contactInformations.innerHTML = returnContactInformations();
}

function setCSSMobileContactInformation(){
    let contactList = document.getElementById('contact-list-section');
    contactList.classList.add('d-none');
    let contactInformations = document.getElementById('contactInformations');
    contactInformations.classList.remove('selected_contact_infos');
    contactInformations.classList.add('mobile_selected_contact_infos');
}

function contactsBgrColor() {
    document.getElementById('contacts').classList.add('currentTemplate', 'p-none');
    document.getElementById('contacts_mobile').classList.add('currentTemplate', 'p-none');

}

function removeBgrColorWithoutContacts() {
    document.getElementById('add_task').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary').classList.remove('currentTemplate', 'p-none');
    document.getElementById('add_task_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary_mobile').classList.remove('currentTemplate', 'p-none');
}

function addJoinLogoClickable() {
    document.getElementById('join_logo').classList.remove('p-none');
    document.getElementById('join_logo_mobile').classList.remove('p-none');
}

function addContactsCSS(){
    document.getElementById('content').classList.remove('content');
    document.getElementById('content').classList.add('content_section');
}