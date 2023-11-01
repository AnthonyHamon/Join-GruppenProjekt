let contacts = [];

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

function addNewContact() {
    setNewContact();
    openContactPopup();
    showContactCreatedPopup();
    removeAnimationClass();
}

function setNewContact(){
    let name = document.getElementById('new-contact-name').value;
    let email = document.getElementById('new-contact-email').value;
    let phone = document.getElementById('new-contact-phone').value;
    contacts.push({name, email, phone});
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
    let width = window.innerWidth;
    let addContactCtn = document.getElementById('contact-popup-ctn');
    addContactCtn.innerHTML = returnAddContactPopup();
    if (width < 1000) {
        document.getElementById('contact-popup-left-button').classList.add('d-none');
    }
    openContactPopup();
}

function openContactPopup() {
    let width = window.innerWidth;
    let addContactCtn = document.getElementById('contact-popup-ctn');
    let addContact = document.getElementById('contact-popup');
    if (width <= 1000) {
        addContact.classList.add('open_mobile_animation_contact_popup')
    } else {
        addContact.classList.add('open_animation_contact_popup');
    }
    addContactCtn.classList.toggle('d-none');
}
function closeContactPopup() {
    let width = window.innerWidth;
    let addContact = document.getElementById('contact-popup');
    let addContactCtn = document.getElementById('contact-popup-ctn');
    if (width <= 1000) {
        addContact.classList.remove('open_mobile_animation_contact_popup');
        addContact.classList.add('close_mobile_animation_contact_popup');
    } else {
        addContact.classList.remove('open_animation_contact_popup');
        addContact.classList.add('close_animation_contact_popup');
    }
    setTimeout(() => addContactCtn.classList.toggle('d-none'), 650);
}


function toggleAddcontactMobileMenu() {
    document.getElementById('mobile-add-contact-button').classList.toggle('d-none');
    document.getElementById('mobile-contact-edit-menu').classList.toggle('d-none');
}

function openEditContact(event) {
    setMobileEditContact(event);
    let editContactCtn = document.getElementById('contact-popup-ctn');
    editContactCtn.innerHTML = returnEditContactPopup();
    openContactPopup();
}

function setMobileEditContact(event) {
    let width = window.innerWidth;
    if (width < 1000) {
        stop(event);
        let editContact = document.getElementById('edit-contact');
        editContact.classList.add('curent_selected_mobile_contact_editor');
    }
}

function openMobileEditMenu() {
    let mobileEditMenuCtn = document.getElementById('mobile-edit-contact-menu-ctn');
    mobileEditMenuCtn.innerHTML = returnMobileEditContactMenu();
    let mobileEditMenu = document.getElementById('mobile-edit-contact-menu');
    mobileEditMenuCtn.classList.remove('d-none');
    mobileEditMenu.classList.add('animate_edit_contact_menu');
}

function closeMobileEditMenu() {
    let mobileEditMenuCtn = document.getElementById('mobile-edit-contact-menu-ctn');
    let mobileEditMenu = document.getElementById('mobile-edit-contact-menu');
    let editContact = document.getElementById('edit-contact');
    editContact.classList.remove('curent_selected_mobile_contact_editor');
    mobileEditMenu.classList.remove('animate_edit_contact_menu');
    mobileEditMenu.classList.add('close_edit_contact_menu');
    setTimeout(() => mobileEditMenuCtn.classList.add('d-none'), 300);
}

function showContactCreatedPopup() {
    document.getElementById('contact-created-popup').classList.add('animate_contact_created_popup')
}

function removeAnimationClass() {
    setTimeout(() =>
        document.getElementById('contact-created-popup').classList.remove('animate_contact_created_popup')
        , 5000);
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