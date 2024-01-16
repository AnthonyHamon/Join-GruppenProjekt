let contacts = [];
let contactIsValid = false;


async function renderContactsPage() {
    contactsBgrColor();
    addContentCSS();
    removeBgrColorWithoutContacts();
    addJoinLogoClickable();
    returnContactPage();
    renderContacts();
    hideLegalContent();
}

/**
 * function to set and sort organizer for contact list
 * @returns {array} array of all contacts first character of name sorted alphabetically
 */

function setOrganizer() {
    let organizer = [];
    for (let index = 0; index < contacts.length; index++) {
        const contact = contacts[index];
        let firstCharFromName = contact['name'].charAt(0).toUpperCase();
        organizer.push(firstCharFromName);
        organizer = organizer.filter((item, index) =>
            organizer.indexOf(item) === index);
    }
    organizer.sort((a, b) => { return compareStrings(a, b) });
    return organizer;
}


function renderContacts() {
    let organizer = setOrganizer();
    let contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    for (let i = 0; i < organizer.length; i++) {
        const organizerLetter = organizer[i];
        contactList.innerHTML += returnContactsOrganizer(i, organizerLetter);
        renderMatchedContact(i, organizerLetter);
    }
}

/**
 * render contact which begin with character of organiser
 * @param {number} i index of organizer
 * @param {string} organizerLetter character of organiser
 */

function renderMatchedContact(i, organizerLetter) {
    let contactList = document.getElementById('contact-list');
    let contactMatches = contacts.filter(e => e.name.charAt(0) === organizerLetter);
    contactMatches.sort((a, b) => { return compareStrings(a.name, b.name) });
    for (let j = 0; j < contactMatches.length; j++) {
        contactList.innerHTML += returnContacts(i, contactMatches[j]);
    }
}


function addNewContact() {
    contactIsValid ?
        setNewContact() &
        closeContactPopup() &
        showContactCreatedPopup() &
        removeAnimationClass() &
        renderContacts() &
        jumpToCreatedContact() : '';
}

function jumpToCreatedContact() {
    let lastCreatedContact = contacts[contacts.length - 1];
    let lastCreatedContactEmail = lastCreatedContact['email'];
    let justCreatedContactInformation = document.getElementById(lastCreatedContactEmail);
    justCreatedContactInformation.click();
}

async function setNewContact() {
    let inputedName = document.getElementById('new-contact-name').value;
    let name = formatName(inputedName);
    let email = document.getElementById('new-contact-email').value;
    let phone = document.getElementById('new-contact-phone').value;
    let initial = returnContactInitialLetter(name);
    let BgColor = setRandomColor();
    contacts.push({ name, email, phone, initial, BgColor });
    await setItem('contacts', JSON.stringify(contacts));
}

/**
 * 
 * @param {string} name name of contact to be created
 * @returns name of contact to be created with uppercased first character
 */

function formatName(name) {
    return name.replace(/\b\w/g, l => l.toUpperCase());
}

function checkExistingContact() {
    resetAddContactCustomValidity();
    let contactName = document.getElementById('new-contact-name');
    let contactEmail = document.getElementById('new-contact-email');
    let contactPhone = document.getElementById('new-contact-phone');
    let inputedName = document.getElementById('new-contact-name').value;
    let name = formatName(inputedName);
    name = contacts.find(u => u.name == name);
    let email = contacts.find(u => u.email == contactEmail.value);
    let phone = contacts.find(u => u.phone == contactPhone.value);
    returnCustomValidityMessage(name, email, phone, contactName, contactEmail, contactPhone);
}

function returnCustomValidityMessage(name, email, phone, contactName, contactEmail, contactPhone) {
    if (name) {
        contactIsValid = false;
        contactName.setCustomValidity('This Person already exist in your contacts');
    } else if (email) {
        contactIsValid = false;
        contactEmail.setCustomValidity('This E-Mail adress has already been added to your contacts');
    } else if (phone) {
        contactIsValid = false;
        contactPhone.setCustomValidity('This Phone Number is already attributed to a contact');
    } else {
        contactIsValid = true;
    }
}

function resetAddContactCustomValidity() {
    document.getElementById('new-contact-name').setCustomValidity('');
    document.getElementById('new-contact-email').setCustomValidity('');
    document.getElementById('new-contact-phone').setCustomValidity('');
}

/**
 * function to edit contact informations
 * @param {string} name name of the contact
 * @param {string} email email of the contact
 * @param {string} phone phone number of the contact
 * @param {string} initial initial opf the contact
 * @param {string} BgColor color of contact badge
 */

async function editContact(name, email, phone, initial, BgColor) {
    let index = contacts.findIndex(e => e.email === email);
    name = document.getElementById(`edited-${name}`).value;
    email = document.getElementById(`edited-${email}`).value;
    phone = document.getElementById(`edited-${phone}`).value;
    initial = returnContactInitialLetter(name);
    contacts.splice(index, 1, { name, email, phone, initial, BgColor });
    await setItem('contacts', JSON.stringify(contacts));
    editSelectedContacts(name, email, phone, initial, BgColor);
    closeContactPopup();
    renderContacts();
    showContactInformation(name, email, phone, initial, BgColor);
}

async function editSelectedContacts(name, email, phone, initial, BgColor) {
    for (let i = 0; i < tasks.length; i++) {
        const taskContacts = tasks[i]['contacts'];
        let index = taskContacts.findIndex(e => e.email === email);
        taskContacts.splice(index, 1, { name, email, phone, initial, BgColor });
    }
    await setItem('tasks', JSON.stringify(tasks));
}


function toggleDeleteContactConfirmationPopup() {
    let selectedContactInfo = document.getElementById('contact-deletion-ctn');
    selectedContactInfo.classList.toggle('d-none');
    selectedContactInfo.classList.toggle('open_animation_contact_popup');
}

function closeDeleteContactConfirmationPopup() {
    let selectedContactInfo = document.getElementById('contact-deletion-ctn');
    selectedContactInfo.classList.add('d-none');
}


/**
 * function to delete a contact from the list
 * @param {string} email email of the contact
 */
async function deleteContact(email) {
    let index = contacts.findIndex(e => e.email === email); // search index of selected contact
    contacts.splice(index, 1);
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
    toggleDeleteContactConfirmationPopup();
    closeContactPopup();
    let contactInformations = document.getElementById('selected-contact-content');
    contactInformations.innerHTML = '';
}


async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch {
        console.log('the contatcs were not loaded');
    }
}

function setRandomColor() {
    const letters = '0123456789ABCDEF';
    let BgColor = '#';
    for (let i = 0; i < 6; i++) {
        BgColor += letters[Math.floor(Math.random() * 16)];
    }
    return BgColor;
}

/**
 * function to render information of selected contact
 * @param {string} name name of the contact
 * @param {string} email email of the contact
 * @param {string} phone phone number of the contact
 * @param {string} initial initial opf the contact
 * @param {string} BgColor color of contact badge
 */

function showContactInformation(name, email, phone, initial, BgColor) {
    let width = window.innerWidth;
    if (width < 1000) {
        showSelectedContactInformations(name, email, phone, initial, BgColor);
        toggleCSSContactInformation()
        toggleAddcontactMobileMenu();
    } else {
        showSelectedContactInformations(name, email, phone, initial, BgColor);
        showSelectedContactAnimation();
    }
}

function showSelectedContactInformations(name, email, phone, initial, BgColor) {
    let width = window.innerWidth;
    let contactInformations = document.getElementById('selected-contact-content');
    contactInformations.innerHTML = returnContactInformations(name, email, phone, initial, BgColor);
    width > 1000 ? setSelectedContactOnClick(email) : '';
}

function returnContactInitialLetter(name) {
    return name.replace(/[^A-Z]+/g, '');
}


function showSelectedContactAnimation() {
    document.getElementById('selected-contact-content').classList.add('slide_selected_contact');
    setTimeout(() =>
        document.getElementById('selected-contact-content').classList.remove('slide_selected_contact')
        , 400);
}


function setSelectedContactOnClick(email) {
    resetContactSelection();
    let contact = document.getElementById(email);
    contact.classList.add('contact_selected');
    contact.classList.add('p-none');
}

function resetContactSelection() {
    let contactSelection = document.querySelectorAll('.contact_div');
    contactSelection.forEach((contactSelection) => {
        contactSelection.classList.remove('contact_selected');
        contactSelection.classList.remove('p-none');
    })
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
    let addContactCtn = document.getElementById('popup-ctn');
    addContactCtn.innerHTML = returnAddContactPopup();
    openContactPopup();
    if (width < 1000) {
        document.getElementById('contact-popup-left-button').classList.add('d-none');
    }
}

function openContactPopup() {
    let width = window.innerWidth;
    let addContactCtn = document.getElementById('popup-ctn');
    let addContact = document.getElementById('contact-popup');
    if (width <= 1000) {
        addContact.classList.add('open_mobile_animation_contact_popup')
    } else {
        addContact.classList.add('open_animation_contact_popup');
    }
    addContactCtn.classList.toggle('d-none');
}

function closeContactPopup() {
    let addContact = document.getElementById('contact-popup');
    let addContactCtn = document.getElementById('popup-ctn');
    if (window.matchMedia("(min-width: 1000px)").matches &&
        !addContactCtn.classList.contains('d-none')) {
        addContact.classList.remove('open_animation_contact_popup');
        addContact.classList.add('close_animation_contact_popup');
        setTimeout(() => addContactCtn.classList.toggle('d-none'), 450);
    } else if (window.matchMedia("(max-width: 1000px)").matches) {
        closeMobileEditMenu();
        closeSelectedContactInformation();
    }
}

function closeMobileContactPopup() {
    let addContact = document.getElementById('contact-popup');
    let addContactCtn = document.getElementById('popup-ctn');
    addContact.classList.remove('open_mobile_animation_contact_popup');
    addContact.classList.add('close_mobile_animation_contact_popup');
    setTimeout(() => addContactCtn.classList.toggle('d-none'), 450);
}


function toggleAddcontactMobileMenu() {
    document.getElementById('mobile-add-contact-button').classList.toggle('d-none');
    document.getElementById('mobile-contact-edit-menu').classList.toggle('d-none');
}

function openEditContact(event, name, email, phone, initial, BgColor) {
    setMobileEditContact(event);
    let editContactCtn = document.getElementById('popup-ctn');
    editContactCtn.innerHTML = returnEditContactPopup(name, email, phone, initial, BgColor);
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

function openMobileEditMenu(name, email, phone, initial, BgColor) {
    let mobileEditMenuCtn = document.getElementById('mobile-edit-contact-menu-ctn');
    mobileEditMenuCtn.innerHTML = returnMobileEditContactMenu(name, email, phone, initial, BgColor);
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

function addContentCSS() {
    document.getElementById('content').classList.remove('contentBoard');
    document.getElementById('content').classList.add('content_section');
}