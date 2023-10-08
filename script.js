async function init() {
    await includeHTML();
    renderBoard(); // Wird noch zu renderSummary() geändert, ist nur zur disign zwecken umgeändert worden :)
    checkWidthInBoard();
}