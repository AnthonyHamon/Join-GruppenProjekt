function renderBoard() {
    changeBoardContent();
    boardBgrColor();
    removeBgrColorWithoutBoard();
    addJoinLogoClickable();
    generateBoardHTML();
    checkWidthInBoard();
    loadingProcess();
}

function changeBoardContent() {
    document.getElementById('content').classList.remove('content_section');
    document.getElementById('content').classList.remove('content');
    document.getElementById('content').classList.add('contentBoard');
}

function boardBgrColor() {
    document.getElementById('board').classList.add('currentTemplate', 'p-none');
    document.getElementById('board_mobile').classList.add('currentTemplate', 'p-none');

}

function removeBgrColorWithoutBoard() {
    document.getElementById('add_task').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
    document.getElementById('add_task_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts_mobile').classList.remove('currentTemplate', 'p-none');
}

function addJoinLogoClickable() {
    document.getElementById('join_logo').classList.remove('p-none');
    document.getElementById('join_logo_mobile').classList.remove('p-none');
}

function returnAddBtn(category) {
    return /*html*/`<svg onclick="addTaskFromBtn('${category}')" class="svgHover" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6665 8.5V16.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
    <path d="M16.6665 12.5754L8.6665 12.5754" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
    <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="#2A3647" stroke-width="2"/>
    </svg>`;
}

function addTaskFromBtn(category) {
    let status = document.getElementById(`${category}`);

    status.innerHTML += /*html*/`
        <section class="section">
            <h2 class="userStory">User Story</h2>
            <article>
                <span class="taskTitle">Kochwelt Page & Recipe Recommender</span>
                <p class="taskDescription">Build start page with recipe recommender</p>
            </article>
            <div class="profilePropertyContain">
                <div id="profile" class="profileContain">
                    <div class="profileBadge">RP</div>
                    <div class="profileBadge">RP</div>
                    <div class="profileBadge">RP</div>
                    <div class="profileBadge">RP</div>
                    <div class="profileBadge">RP</div>
                </div>
                <img src="/images/Property 1=Low.svg">
            </div>
        </section>
    `;
}