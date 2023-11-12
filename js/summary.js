function renderSummary() {
    summaryBgrColor();
    removeBgrColorWithoutSummary();
    removeJoinLogoClickable();
    addContentCSS();
    generateSummaryHTML();
}

function renderCurrentdate(){
    let currentDate = new Date();
    const monthOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = currentDate.getDate();
    const month = monthOfYear[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
}

function renderGreetingMessage(){
    let x = new Date();
    let hour = x.getHours();
    if (hour < 12){
        return 'Good morning,'
    }else if (hour > 12 && hour < 14){
        return 'Good day,'
    }else if (hour > 14 && hour < 19){
        return 'Good afternoon,'
    }else{
        return 'Good evening,'
    }
}

function renderGreetsUserName(){

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