let iconRotated = false;
let datesContainer = document.querySelector('.dates');
const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

let currentMonthIndex = new Date().getMonth();

const daysOfWeek = ['Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'];



function renderAddTask() {
    addTaskBgrColor();
    removeBgrColorWithoutAddTask();
    addJoinLogoClickable();
    generateAddTaskHTML();
}

function addTaskBgrColor() {
    document.getElementById('add_task').classList.add('currentTemplate', 'p-none');
    document.getElementById('add_task_mobile').classList.add('currentTemplate', 'p-none');

}

function removeBgrColorWithoutAddTask() {
    document.getElementById('summary').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts_mobile').classList.remove('currentTemplate', 'p-none');
}

function addJoinLogoClickable() {
    document.getElementById('join_logo').classList.remove('p-none');
    document.getElementById('join_logo_mobile').classList.remove('p-none');
}

function toggleDropdown() {
    const dropdownOptions = document.getElementById('dropdownOptions');
    const icon = document.getElementById('icon');

    iconRotated = !iconRotated;

    if (iconRotated) {
        dropdownOptions.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    } else {
        dropdownOptions.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    }
}


function selectCategory(category) {
    document.getElementById('selectedCategory').innerHTML = category;

    toggleDropdown();
}

function rotateIcon() {
    const icon = document.querySelector('.assign-button img');
    icon.classList.toggle('rotate');
}


function toggleContacts() {
    const contactContainer = document.getElementById('contactContainer');
    const arrowIcon = document.getElementById('arrowIcon');

    contactContainer.classList.toggle('hidden');  // Ein- und Ausblenden des Kontaktcontainers

    // Überprüfen, ob der Kontaktcontainer jetzt sichtbar ist
    if (!contactContainer.classList.contains('hidden')) {
        arrowIcon.classList.add('rotate');  // Drehen des Icons um 180 Grad, wenn sichtbar
    } else {
        arrowIcon.classList.remove('rotate');  // Entfernen der Rotation, wenn unsichtbar
    }
}


function updateCurrentDate() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Formatieren des Datums nach Bedarf

    // Hier kannst du die aktualisierte Datum-Anzeige aktualisieren
    document.getElementById('current-date-display').innerText = formattedDate;
}


function toggleCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.style.display = (calendar.style.display === 'block') ? 'none' : 'block';
}


function generateCalendar(monthIndex, year) {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate(); // Get the number of days in the month

    const currentMonth = months[monthIndex];

    const calendar = document.getElementById('calendar');
    calendar.innerHTML = `
        <div class="month">
            <div>
                <button class="prev-month" onclick="changeMonth(-1)">&#8249;</button>
            </div>
            <div class="month-name">
                <span class="month-name-style" onclick="selectMonth(${year}, ${monthIndex})">${currentMonth} ${year}</span>
            </div>
            <div>
                <button class="next-month" onclick="changeMonth(1)">&#8250;</button>
            </div>
        </div>
        <div class="days">
            <div class="day">Sun</div>
            <div class="day">Mon</div>
            <div class="day">Tue</div>
            <div class="day">Wed</div>
            <div class="day">Thu</div>
            <div class="day">Fri</div>
            <div class="day">Sat</div>
        </div>
        <div class="dates"></div>
    `;

    const datesContainer = document.querySelector('.dates');
    const customDateText = document.getElementById('customDateText');

    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('date');
        dateElement.innerText = i;

        if (year === currentDate.getFullYear() && monthIndex === currentDate.getMonth()) {
            if (i === currentDay) {
                dateElement.classList.add('current-day');
            }

            if (i >= currentDay) {
                dateElement.addEventListener('click', () => {
                    const formattedDate = `${i}/${monthIndex + 1}/${year}`;
                    customDateText.value = formattedDate;
                });
            }
        }

        datesContainer.appendChild(dateElement);
    }
}



function changeMonth(offset) {
    currentMonthIndex += offset;

    if (currentMonthIndex < 0) {
        currentMonthIndex = 11;  // Dezember des vorherigen Jahres
        currentYear -= 1;  // Wechsel zum vorherigen Jahr
    } else if (currentMonthIndex > 11) {
        currentMonthIndex = 0;  // Januar des nächsten Jahres
        currentYear += 1;  // Wechsel zum nächsten Jahr
    }

    // Update year based on the month change
    if (currentMonthIndex === 0 && offset === 1) {
        currentYear += 1;
    } else if (currentMonthIndex === 11 && offset === -1) {
        currentYear -= 1;
    }

    generateCalendar(currentMonthIndex);
}


function changeMonth(offset) {
    currentMonthIndex += offset;
    if (currentMonthIndex < 0) {
        currentMonthIndex = 11;  // Dezember
    } else if (currentMonthIndex > 11) {
        currentMonthIndex = 0;   // Januar
    }

    generateCalendar(currentMonthIndex);
}

// Initialanzeige des Kalenders
generateCalendar(currentMonthIndex, currentYear);









