async function initContacts() {
    await includeHTML();
}

function renderContacts() {
    contactsBgrColor();
    addContactsCSS();
    removeBgrColorWithoutContacts();
    addJoinLogoClickable();
    generateContactsHTML();
}

function showContactInformation() {
    let width = window.innerWidth;
    if (width < 1000) {
        showSelectedContactInformations();
        toggleCSSContactInformation()
        toggleAddcontactMobileMenu();
    } else {
        showSelectedContactInformations();
        addSelectedContactAnimation();
    }
}

function showSelectedContactInformations() {
    let contactInformations = document.getElementById('selected-contact-content');
    contactInformations.innerHTML = returnContactInformations();
}

function addSelectedContactAnimation() {
    document.getElementById('selected-contact-content').classList.add('slide_selected_contact');
}

function closeSelectedContactInformation() {
    toggleAddcontactMobileMenu();
    toggleCSSContactInformation();
}

function toggleCSSContactInformation() {
    let contactList = document.getElementById('contact-list-section');
    contactList.classList.toggle('d-none');
    let contactInformations = document.getElementById('contactInformations');
    contactInformations.classList.toggle('selected_contact_infos');
    contactInformations.classList.toggle('mobile_selected_contact_infos');
}

function openAddContact() {
    let addContactCtn = document.getElementById('contact-popup-ctn');
    openOrCloseContactPopup();
    addContactCtn.innerHTML = returnAddContactPopup();
}

function openOrCloseContactPopup() {
    let addContactCtn = document.getElementById('contact-popup-ctn');
    addContactCtn.classList.toggle('d-none');
}

function toggleAddcontactMobileMenu() {
    document.getElementById('mobile-add-contact-button').classList.toggle('d-none');
    document.getElementById('mobile-contact-edit-menu').classList.toggle('d-none');
}

function openEditContact() {
    let editContactCtn = document.getElementById('contact-popup-ctn');
    openOrCloseContactPopup();
    editContactCtn.innerHTML = returnEditContactPopup();
}


function addNewContact(){
    openOrCloseContactPopup();
    showContactCreatedPopup();
}

function showContactCreatedPopup(){
    document.getElementById('contact-created-popup').classList.add('animate_contact_created_popup')
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

function addContactsCSS() {
    document.getElementById('content').classList.remove('content');
    document.getElementById('content').classList.add('content_section');
}