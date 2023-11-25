function renderTaskElement(task) {
    let section = document.createElement('section');
    section.className = 'section';
    section.id = `section${task.id}`;
    section.onclick = function () {
        openTask(task);
    };
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