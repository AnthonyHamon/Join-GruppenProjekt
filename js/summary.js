
async function renderSummary() {
    summaryBgrColor();
    removeBgrColorWithoutSummary();
    removeJoinLogoClickable();
    addContentCSS();
    await loadTasks();
    generateSummaryHTML();
    hideLegalContent();
    renderGreetsUserName();
    let hasBeenGreeted = localStorage.getItem('hasBeenGreeted');
    showMobileGreeting(hasBeenGreeted);
}

function renderCurrentdate() {
    let currentDate = new Date();
    const monthOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = currentDate.getDate();
    const month = monthOfYear[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
}

function renderGreetingMessage() {
    let x = new Date();
    let hour = x.getHours();
    if (hour < 12) {
        return 'Good morning,'
    } else if (hour >= 12 && hour < 14) {
        return 'Good day,'
    } else if (hour >= 14 && hour < 19) {
        return 'Good afternoon,'
    } else {
        return 'Good evening,'
    }
}

function renderGreetsUserName() {
    if (currentUser) {
        return currentUser[0]['user'];
    } else {
        return 'Dear Guest';
    }
}

function showMobileGreeting(hasBeenGreeted) {
    let mobileGreeting = document.getElementById('mobile-greeting-ctn');
    if (window.matchMedia('max-width: 1000px') && hasBeenGreeted && hasBeenGreeted === 'false') {
        mobileGreeting.innerHTML = returnMobileGreeting();
        mobileGreeting.classList.remove('d-none');
        mobileGreeting.classList.add('mobile_greeting_animation');
        setTimeout(() => {
            mobileGreeting.classList.add('d-none');
            localStorage.removeItem('hasBeenGreeted');
            hasBeenGreeted = true;
        }, 1600)
    }
}


function summaryBgrColor() {
    document.getElementById('summary').classList.add('currentTemplate', 'p-none');
    document.getElementById('summary_mobile').classList.add('currentTemplate', 'p-none');
}

function removeBgrColorWithoutSummary() {
    document.getElementById('add_task').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
    document.getElementById('add_task_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts_mobile').classList.remove('currentTemplate', 'p-none');
}

function removeJoinLogoClickable() {
    document.getElementById('join_logo').classList.add('p-none');
    document.getElementById('join_logo_mobile').classList.add('p-none');
}


function filterAndReturnToDoTasks() {
    let task = tasks.filter(task => task.status === "to_do").length;
    return task;
}

function filterAndReturnInProgressTasks() {
    let task = tasks.filter(task => task.status === "in_progress").length;
    return task;
}

function filterAndReturnAwaitFeedbackTasks() {
    let task = tasks.filter(task => task.status === "feedback").length;
    return task;
}

function filterAndReturnDoneTasks() {
    let task = tasks.filter(task => task.status === "done").length;
    return task;
}

function filterAndReturnUrgentTasks() {
    let task = tasks.filter(task => task.priority === "Urgent").length;
    return task;
}