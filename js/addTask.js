let iconRotated = false;
let datesContainer = document.querySelector('.dates');
let selectedButton = null;
const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

let currentMonthIndex = new Date().getMonth();
currentYear = new Date().getFullYear(); 

const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
];


function renderAddTask() {
    addTaskBgrColor();
    removeBgrColorWithoutAddTask();
    addJoinLogoClickable();
    generateAddTaskHTML();
}

function addTaskBgrColor() {
    document.getElementById('add_task').classList.add('currentTemplate', 'p-none');

}

function removeBgrColorWithoutAddTask() {
    document.getElementById('summary').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
}

function addJoinLogoClickable() {
    document.getElementById('join_logo').classList.remove('p-none');
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
    const daysInMonth = getDaysInMonth(year, monthIndex);

    const currentMonth = months[monthIndex];
    const currentDate = new Date();
    const currentDay = currentDate.getDate();

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

    for (let i = 1; i <= daysInMonth; i++) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('date');
        dateElement.innerText = i;

        const currentDateInMonth = new Date(year, monthIndex, i);

        if (currentDateInMonth >= currentDate) {
            dateElement.addEventListener('click', () => {
                const formattedDate = `${i}/${monthIndex + 1}/${year}`;
                customDateText.value = formattedDate;

                // Nach Auswahl des Datums, den Kalender ausblenden
                toggleCalendar();
            });
        } else {
            dateElement.classList.add('inactive'); // Mark days in the past as inactive
        }

        if (i === currentDay && monthIndex === currentDate.getMonth() && year === currentDate.getFullYear()) {
            dateElement.classList.add('current-day');
        }

        datesContainer.appendChild(dateElement);
    }
}


function getDaysInMonth(year, monthIndex) {
    if (monthIndex === 11) {
        return new Date(year + 1, 0, 0).getDate();
    } else {
        return new Date(year, monthIndex + 1, 0).getDate();
    }
}


function toggleCalendar() {
    const calendar = document.getElementById('calendar');
    const calendarDisplay = calendar.style.display;

    if (calendarDisplay === 'block') {
        calendar.style.display = 'none';
    } else {
        calendar.style.display = 'block';
    }
}


function changeMonth(offset) {
    currentMonthIndex += offset;

    // Monatswechsel: Von Dezember zum Januar des nächsten Jahres
    if (currentMonthIndex < 0) {
        currentMonthIndex = 11;  // Dezember
        currentYear -= 1;  // Wechsel zum vorherigen Jahr
    } else if (currentMonthIndex > 11) {
        currentMonthIndex = 0;  // Januar
        currentYear += 1;  // Wechsel zum nächsten Jahr
    }

    generateCalendar(currentMonthIndex, currentYear);
}


// Initialanzeige des Kalenders
generateCalendar(currentMonthIndex, currentYear);


function changeButtonStyles(button, color) {
    // Zurücksetzen des vorher ausgewählten Buttons
    if (selectedButton) {
        selectedButton.classList.remove('selected');
    }

    // Ändern des aktuellen Buttons
    button.classList.add('selected');
    selectedButton = button;

    // Zurücksetzen der Hintergrundfarbe und des Textes für alle Buttons
    document.querySelectorAll('.prio-button').forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });

    // Einstellen der Farben für den ausgewählten Button
    if (color === '#ff3d00') {
        button.style.backgroundColor = '#ff3d00';
        button.style.color = 'white';
    } else if (color === '#ffa800') {
        button.style.backgroundColor = '#ffa800';
        button.style.color = 'black';
    } else if (color === '#7ae229') {
        button.style.backgroundColor = '#7ae229';
        button.style.color = 'white';
    }
}



















