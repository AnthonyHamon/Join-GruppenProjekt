function generateContactsHTML() {
    content.innerHTML = '';
    content.innerHTML = `
        <main class="contacts_content">
            <section id="contact-list-section" class="contact_list_section">

                <div class="add_contact_btn_div">
                    <div id="add-contact-button">
                        <span>Add new contact</span>
                        <img src="../images/person_add.svg" alt="">
                    </div>
                </div>
                <div class="contacts_list_div">
                    <div>
                        <div class="contact_organizer">
                            <span>A</span>
                        </div>
                        <hr class="divider">
                 </div>
                    <div onclick="showContactInformation()" class="contact_div">
                        <div class="contact_circle">
                            AM
                        </div>
                <div class="flex_column gap_5">
                            <div id="contact-name">
                                Anton Mayer
                            </div>
                            <span id="contact-email">antonm@gmail.com<span>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contactInformations" class="selected_contact_infos">
                <!-- contact info -->
                <div class="contact_title">
                    <h1>Contacts</h1>
                    <div class="contacts_subtitle">
                        <div class="contacts_title_vector">
                            <img src="../images/Vector 5.svg" alt="">
                        </div>
                        <span>Better with a Team</span>
                    </div>
                </div>
                <div id="selected-contact-content" class="padding_left_62"></div>
            </section>
        </main>
        <div class="mobile_add_contact_button_ctn">
            <div class="mobile_add_contact_button">
                <img src="..//images/person_add.svg">
                <img class="d-none" src="..//images/more_menu.svg">
            </div>
        </div>
    `
}

function returnContactInformations(){
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
                    <div id="edit-selected-contact" class="align_item_center gap_8">
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

function returnDesktopContactPopup(){
    return `
    <div class="contact_popup_ctn">
        <div class="add_contact_popup d-none">
            <section class="section_left">
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
                    <div class="flex_end padding_48">
                        <div id="close-add-contact-popup">
                            <img src="../images/close.svg">
                        </div>
                    </div>
                    <form onsubmit="addContact(); return false" class="add_contact_form">
                        <div class="add_contact_inputs_ctn">
                            <div class="add_contact_input">
                                <input type="text" placeholder="Name">
                                <img src="../images/person.svg" alt="">
                            </div>
                            <div class="add_contact_input">
                                <input type="Email" placeholder="Email">
                                <img src="../images/mail.svg" alt="">
                            </div>
                            <div class="add_contact_input">
                                <input type="tel" placeholder="Phone">
                                <img src="../images/call.svg" alt="">
                            </div>
                        </div>
                        <div class="add_contact_buttons_ctn">
                            <div class="cancel_contact_button_div">
                                <buttton>Cancel</buttton>
                                <img src="../images/close.svg" alt="">
                            </div>
                            <div class="create_contact_button_div">
                                <buttton type="submit">Create contact</buttton>
                                <img src="../images/check.svg" alt="">
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </div>
    `
}

function returnMobileContactPopup(){
    return `
    <div class="mobile_add_contact_popup">
            <section class="section_left">
                <div class="close_add_contact_popup_div">
                    <div id="close-add-contact-popup">
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
                    <form onsubmit="addContact(); return false" class="add_contact_form">
                        <div class="add_contact_inputs_ctn">
                            <div class="add_contact_input">
                                <input type="text" placeholder="Name">
                                <img src="../images/person.svg" alt="">
                            </div>
                            <div class="add_contact_input">
                                <input type="Email" placeholder="Email">
                                <img src="../images/mail.svg" alt="">
                            </div>
                            <div class="add_contact_input">
                                <input type="tel" placeholder="Phone">
                                <img src="../images/call.svg" alt="">
                            </div>
                        </div>
                        <div class="add_contact_buttons_ctn">
                            <div class="cancel_contact_button_div">
                                <buttton>Cancel</buttton>
                                <img src="../images/close.svg" alt="">
                            </div>
                            <div class="create_contact_button_div">
                                <buttton type="submit">Create contact</buttton>
                                <img src="../images/check.svg" alt="">
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>`
}