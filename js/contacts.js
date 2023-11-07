let contacts = [];

async function renderContactsPage() {
    await loadContacts();
    contactsBgrColor();
    addContactsCSS();
    removeBgrColorWithoutContacts();
    addJoinLogoClickable();
    generateContactsHTML();
    renderContacts()
}

function sortOrganizer() {
    let organizerArray = [];
    for (let index = 0; index < contacts.length; index++) {
        const contact = contacts[index];
        let firstCharFromName = contact['name'].charAt(0).toUpperCase();
        organizerArray.push(firstCharFromName);
        organizer = organizerArray.filter((item, index) =>
            organizerArray.indexOf(item) === index);
    }
    return organizer;
}

function renderContacts() {
    sortOrganizer();
    organizer.sort((a, b) => { return compareStrings(a, b) });
    let contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    for (let i = 0; i < organizer.length; i++) {
        const organizerLetter = organizer[i];
        contactList.innerHTML += returnContactsOrganizer(i, organizerLetter);
        renderMatchedContact(i, organizerLetter);
    }
}

function renderMatchedContact(i, organizerLetter) {
    let contactList = document.getElementById('contact-list');
    let contactMatches = contacts.filter(e => e.name.charAt(0) === organizerLetter);
    contactMatches.sort((a, b) => { return compareStrings(a.name, b.name) });
    for (let j = 0; j < contactMatches.length; j++) {
        contactList.innerHTML += returnContacts(i, contactMatches[j]);
    }

}

function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function addNewContact() {
    setNewContact();
    openContactPopup();
    showContactCreatedPopup();
    removeAnimationClass();
    renderContacts();
}

async function setNewContact() {
    let name = document.getElementById('new-contact-name').value;
    let email = document.getElementById('new-contact-email').value;
    let phone = document.getElementById('new-contact-phone').value;
    let BgColor = setRandomColor();
    contacts.push({ name, email, phone, BgColor });
    await setItem('contacts', JSON.stringify(contacts));
}

async function editContact(name, email, phone, BgColor) {
    let index = contacts.findIndex(e => e.email === email);
    name = document.getElementById(`edited-${name}`).value;
    email = document.getElementById(`edited-${email}`).value;
    phone = document.getElementById(`edited-${phone}`).value;
    contacts.splice(index, 1, { name, email, phone, BgColor });
    await setItem('contacts', JSON.stringify(contacts));
    closeContactPopup();
    renderContacts();
    showContactInformation(name, email, phone, BgColor);
}

async function deleteContact(email) {
    let index = contacts.findIndex(e => e.email === email);
    contacts.splice(index, 1);
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
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

function showContactInformation(name, email, phone, BgColor) {
    let width = window.innerWidth;
    if (width < 1000) {
        showSelectedContactInformations(name, email, phone, BgColor);
        toggleCSSContactInformation()
        toggleAddcontactMobileMenu();
    } else {
        showSelectedContactInformations(name, email, phone, BgColor);
        showSelectedContactAnimation();
    }
}

function showSelectedContactInformations(name, email, phone, BgColor) {
    let width = window.innerWidth;
    let contactInformations = document.getElementById('selected-contact-content');
    contactInformations.innerHTML = returnContactInformations(name, email, phone, BgColor);
    width > 1000 ? setSelectedContactOnClickColor(email) : '';
}

function renderContactInitialLetter(name) {
    return name.replace(/[^A-Z]+/g, '');
}


function showSelectedContactAnimation() {
    document.getElementById('selected-contact-content').classList.add('slide_selected_contact');
    setTimeout(() =>
        document.getElementById('selected-contact-content').classList.remove('slide_selected_contact')
        , 400);
}

function setSelectedContactOnClickColor(email) {
    resetContactSelectionColor();
    let contact = document.getElementById(email);
    contact.classList.add('contact_selected');
}

function resetContactSelectionColor() {
    let contactSelection = document.querySelectorAll('.contact_div');
    contactSelection.forEach((contactSelection) => {
        contactSelection.classList.remove('contact_selected');
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

function openEditContact(name, email, phone, BgColor, event) {
    setMobileEditContact(event);
    let editContactCtn = document.getElementById('contact-popup-ctn');
    editContactCtn.innerHTML = returnEditContactPopup(name, email, phone, BgColor);
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