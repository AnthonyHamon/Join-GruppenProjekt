async function init() {
    await includeHTML();
    await loadContacts();
    getCurrentUser();
    renderUserInitial();
    renderSummary();
}

function getCurrentUser() {
    try {
        currentUser = JSON.parse(localStorage.getItem('currentUser'))
    } catch (e) {
        console.log(`Current User is a guest.`);
    }
}

function renderUserInitial() {
    if (currentUser) {
        document.getElementById('log-out-menu').innerHTML = currentUser[0]['initial'];
        document.getElementById('mobile-log-out-menu').innerHTML = currentUser[0]['initial'];
    } else {
        document.getElementById('log-out-menu').innerHTML = 'G';
        document.getElementById('mobile-log-out-menu').innerHTML = 'G';
    }
}

function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function openProfilMenu() {
    document.getElementById('profile_menu_contain').classList.toggle('d-none');
}

function closeProfilMenu() {
    document.getElementById('profile_menu_contain').classList.toggle('d-none');
}

function stop(event) {
    event.stopPropagation();
}

// Javascript for Legal section (Legal notice and Privacy Policy)

function renderLegalNoticePage() {
    let legalContent = document.getElementById('legal-content-section');
    legalContent.innerHTML = returnLegalNoticeHTML();
    legalContent.classList.remove('d-none');
}

function renderPrivacyPolicyPage() {
    let legalContent = document.getElementById('legal-content-section');
    legalContent.innerHTML = returnPrivacyPolicyHTML();
    legalContent.classList.remove('d-none');
}

function hideLegalContent() {
    let legalContent = document.getElementById('legal-content-section');
    legalContent.classList.add('d-none');
}