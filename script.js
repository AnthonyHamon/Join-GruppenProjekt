async function init() {
    await includeHTML();
    renderBoard(); // Wird noch zu renderSummary() geändert, ist nur zur disign zwecken umgeändert worden :)
    checkWidthInBoard();
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
