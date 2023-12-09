async function loadTasks() {
    try {
        let savedTasks = await getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            highestTaskId = tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0);
        } else {
            tasks = [];
        }
    } catch (error) {
        console.error("Fehler beim Laden der Tasks:", error);
    }
}

async function assignTaskElementsToStatus(status) {
    let container = document.getElementById(status);
    let tasksByStatus = tasks.filter(task => task.status === status);
    container.innerHTML = '';
    tasksByStatus.forEach(task => {
        container.appendChild(renderTaskElement(task));
    });
    ifContainerEmpty(container);
}

function ifContainerEmpty(container) {
    if (container.innerHTML === '') {
        container.innerHTML = returnEmptyDivInTaskLine();
    }
}

function renderTaskElement(task) {
    let section = document.createElement('section');
    section.className = 'section';
    section.id = `section${task.id}`;
    section.draggable = true;

    section.ondragstart = function () {
        startDragging(task.id);
    };

    section.ondragend = function () {
        endDragging();
    };

    section.onclick = function () {
        openTask(task.id);
    };

    section.addEventListener('touchmove', function (event) {
        clearTimeout(longPressTimer);
    }, { passive: false });

    section.addEventListener('touchstart', function (event) {
        handleTouchStart(event, task.id);
    }, { passive: false });

    section.addEventListener('touchend', function (event) {
        handleTouchEnd(event, task.id);
    }, { passive: false });

    section.innerHTML = renderTaskHTML(task);
    return section;
}

function formatTaskText(text) {
    let trimmedText = text.trim();
    if (currentTaskStatus === 'small' && trimmedText.length > 57) {
        return trimmText(trimmedText);
    } else {
        return showFullTextLength(trimmedText);
    }
}

function trimmText(trimmedText) {
    return trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1, 57) + '...';
}

function showFullTextLength(trimmedText) {
    return trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1);
}

function checkPriority(priority) {
    if (currentTaskStatus === 'small') {
        return returnTaskPrioritySmallHTML(priority);
    } else if (currentTaskStatus === 'big') {
        return returnTaskPriorityBigHTML(priority);
    }
}

function checkTaskCategory(category) {
    let formattedCategory = category.replace(/_/g, ' ');
    if (currentTaskStatus === 'small') {
        return returnTaskCategorySmallHTML(category, formattedCategory);
    } else if (currentTaskStatus === 'big') {
        return returnTaskCategoryBigHTML(category, formattedCategory);
    }
}