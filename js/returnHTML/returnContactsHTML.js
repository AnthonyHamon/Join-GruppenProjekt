function generateContactsHTML() {
    content.innerHTML = '';
    content.innerHTML = `
        <main class="contacts_content">
            <section id="contact-list-section" class="contact_list_section">

                <div class="add_contact_btn_div">
                    <div onclick="openAddContact()" id="add-contact-button">
                        <span>Add new contact</span>
                        <img src="../images/person_add.svg" alt="">
                    </div>
                </div>
                <div id="contact-list" class="contacts_list_div"></div>
            </section>
            <section id="contactInformations" class="selected_contact_infos">
                <div>
                    <div class="contact_title_ctn">
                        <div class="contact_title">
                            <h1>Contacts</h1>
                            <img onclick="closeSelectedContactInformation()" src="../images/arrow-left-line.svg">
                        </div>
                        <div class="contacts_subtitle">
                            <div class="contacts_title_vector">
                                <img src="../images/Vector 5.svg" alt="">
                            </div>
                            <span>Better with a Team</span>
                        </div>
                    </div>
                    <div id="selected-contact-content" class="padding_left_62"></div>
                    <div id="contact-created-popup">
                        <span>Contact created successfully</span>
                    </div>
                </div>
            </section>
        </main>
            <div id="mobile-contact-editor" class="mobile_add_contact_button_ctn">
                    <div onclick="openAddContact()" id="mobile-add-contact-button" class="mobile_add_contact_button">
                        <img src="..//images/person_add.svg">
                    </div>
                    <div onclick="openMobileEditMenu()" id="mobile-contact-edit-menu" class="mobile_add_contact_button d-none">
                        <img src="..//images/more_menu.svg">
                    </div>
            </div>
            <div onclick="closeMobileEditMenu()" id="mobile-edit-contact-menu-ctn" class="mobile_edit_contact_ctn d-none"></div>
    `
}

function returnContacts(contact){
    return `
        <div>
            <div class="contact_organizer">
                <span>A</span>
            </div>
            <hr class="divider">
        </div>
        <div onclick="showContactInformation()" id="contact" class="contact_div">
            <div class="contact_circle">
                AM
            </div>
            <div class="flex_column gap_5 overflow_hidden">
                <span id="contact-name">${contact['name']}</span>
                <span id="contact-email">${contact['email']}<span>
            </div>
        </div>
    `
}

function returnContactInformations() {
    return `
        <div class="align_item_center gap_54 gap_20">
            <div class="selected_contact_circle">
                AM
            </div>
            <div class="flex_column align_item_start gap_8">
                <div id="selected-contact-name">
                    Anton Mayer
                </div>
                <div class="align_item_center gap_16">
                    <div onclick="openEditContact()" id="edit-selected-contact" class="align_item_center gap_8">
                        <img src="../images/edit.svg" alt="">
                        <span>Edit</span>
                    </div>
                    <div id="delete-selected-contact" class="align_item_center gap_8">
                        <img src="../images/delete.svg" alt="">
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact_information_title">
            Contact Information
        </div>
        <div class="flex_column gap_15">
            <span class="font_weight_700">Email</span>
            <span id="selected-contact-email">anton@gmail.com</span>
        </div>
        <div class="flex_column gap_15">
            <span class="font_weight_700">Phone</span>
            <span id="selected-contact-phone">+49 0123 456 789</span>
        </div>
    `
}

function returnAddContactPopup() {
    return `
        <div id="contact-popup" class="contact_popup">
            <section class="section_left">
                <div class="close_mobile_contact_popup_div">
                    <div onclick="closeContactPopup()" id="close-contact-popup">
                        <img src="../images/close.svg">
                    </div>
                </div>
                <div class="call_to_action_ctn">
                    <img class="call_to_action_logo" src="../images/join_logo.svg">
                    <div class="call_to_action_text">
                        <h2>Add contact</h2>
                        <span>Tasks are better with a team!</span>
                    </div>
                    <div class="call_to_action_vector">
                        <img src="../images/vector.svg" alt="">
                    </div>
                </div>
            </section>

            <section class="section_right">
                <div class="contact_profil_ctn">
                    <div class="contact_profil">
                        <img src="../images/person_white.svg">
                    </div>
                </div>
                <div class="flex_column width_100">
                    <div class="close_desktop_contact_popup_div">
                        <div onclick="closeContactPopup()" id="close-contact-popup">
                            <img  src="../images/close.svg">
                        </div>
                    </div>
                    <form onsubmit="addNewContact(); return false" class="contact_form">
                        <div class="contact_inputs_ctn">
                            <div class="contact_input">
                                <input id="new-contact-name" type="text" placeholder="Name">
                                <img src="../images/person.svg" alt="">
                            </div>
                            <div class="contact_input">
                                <input id="new-contact-email" type="Email" placeholder="Email">
                                <img src="../images/mail.svg" alt="">
                            </div>
                            <div class="contact_input">
                                <input id="new-contact-phone" type="tel" placeholder="Phone">
                                <img src="../images/call.svg" alt="">
                            </div>
                        </div>
                        <div class="contact_buttons_ctn">
                            <div onclick="closeContactPopup()" id="contact-popup-left-button" class="contact_popup_left_button_div">
                                <button>Cancel</button>
                                <img src="../images/close.svg" alt="">
                            </div>
                            <button class="contact_popup_right_button">Create contact <img src="../images/check.svg" alt=""></button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    `
}

function returnEditContactPopup() {
    return `
        <div id="contact-popup" class="contact_popup">
            <section class="section_left">
                <div class="close_mobile_contact_popup_div">
                    <div onclick="closeContactPopup()" id="close-contact-popup">
                        <img src="../images/close.svg">
                    </div>
                </div>
                <div class="call_to_action_ctn">
                    <img class="call_to_action_logo" src="../images/join_logo.svg">
                    <div class="call_to_action_text">
                        <h2>Edit contact</h2>
                    </div>
                    <div class="call_to_action_vector">
                        <img src="../images/vector.svg" alt="">
                    </div>
                </div>
            </section>

            <section class="section_right">
                <div class="contact_profil_ctn">
                    <div class="selected_contact_circle">
                        AM
                    </div>
                </div>
                <div class="flex_column width_100">
                    <div class="close_desktop_contact_popup_div">
                        <div onclick="closeContactPopup()" id="close-contact-popup">
                            <img  src="../images/close.svg">
                        </div>
                    </div>
                    <form onsubmit="editContact(); return false" class="contact_form">
                        <div class="contact_inputs_ctn">
                            <div class="contact_input">
                                <input type="text">
                                <img src="../images/person.svg" alt="">
                            </div>
                            <div class="contact_input">
                                <input type="Email">
                                <img src="../images/mail.svg" alt="">
                            </div>
                            <div class="contact_input">
                                <input type="tel">
                                <img src="../images/call.svg" alt="">
                            </div>
                        </div>
                        <div class="contact_buttons_ctn">
                            <div onclick="deleteContact()" class="contact_popup_left_button_div">
                                <button>Delete</button>
                            </div>
                            <div class="contact_popup_right_button_div">
                                <button type="submit">Save</button>
                                <img src="../images/check.svg" alt="">
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    `
}

function returnMobileEditContactMenu(){
    return `
    <div id="mobile-edit-contact-menu" class="mobile_edit_contact_menu">
        <div onclick="openEditContact(event)" id="edit-contact" class="mobile_edit_contact">
            <img src="..//images/edit.svg">
            <span>Edit</span>
        </div>
        <div id="delete-contact" class="mobile_edit_contact">
            <img src="..//images/delete.svg">
            <span>Delete</span>
        </div>
    </div>
    `
}