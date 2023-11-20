async function init() {
    await includeHTML();
    renderBoard(); // Wird noch zu renderSummary() geändert, ist nur zur disign zwecken umgeändert worden :)
}

function openProfilMenu() {
    document.getElementById('profile_menu_contain').classList.remove('d-none');
}

function closeProfilMenu() {
    document.getElementById('profile_menu_contain').classList.add('d-none');
}

function stop(event) {
    event.stopPropagation();
}

// Javascript for Legal section (Lagel notice and Privacy Policy)

function renderLegalNoticePage(){
    let legalContent = document.getElementById('legal-content-section');
    legalContent.innerHTML = returnLegalNoticeHTML();
    legalContent.classList.remove('d-none');
}

function renderPrivacyPolicyPage(){
    let legalContent = document.getElementById('legal-content-section');
    legalContent.innerHTML = returnPrivacyPolicyHTML();
    legalContent.classList.remove('d-none');
}

function hideLegalContent(){
    let legalContent = document.getElementById('legal-content-section');
    legalContent.classList.add('d-none');
}