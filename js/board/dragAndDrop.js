function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    if (!isDragging) {
        isDragging = true;
        currentDraggedTaskId = id;
        hideOtherElements(id);
    }
}

async function dropTo(status) {
    if (currentDraggedTaskId !== null) {
        let taskById = tasks.find(task => task.id === currentDraggedTaskId);
        if (taskById) {
            taskById.status = status;
            await setItem('tasks', JSON.stringify(tasks));
            renderAllTasks();
            removeHighlight(status);
        }
        currentDraggedTaskId = null;
        showAllElements();
    }
}

function endDragging() {
    if (isDragging) {
        setTimeout(() => {
            isDragging = false;
            removeHeightFromTaskLine();
            removeFlashingAnimationInTaskLine();
            if (currentTouchedTaskLineId) {
                removeHighlight(currentTouchedTaskLineId);
                currentTouchedTaskLineId = null;
            }
            stopScrollInterval();
            showAllElements();
        }, 100);
    }
}

document.addEventListener('dragend', stopScrollInterval);

document.addEventListener('dragover', function (event) {
    if (window.innerWidth < 1300 && window.innerWidth > 999) {
        scrollBehaviorOver1000(event);
        addHeightFromTaskLine();
        addFlashingAnimationInTaskLine();
    } else if (window.innerWidth < 1000) {
        scrollBehaviorBelow1000(event);
        addHeightFromTaskLine();
        addFlashingAnimationInTaskLine();
    }
    addHeightFromTaskLine();
    addFlashingAnimationInTaskLine();
});

document.addEventListener('touchmove', function (event) {
    if (isDragging) {
        let touch = event.touches[0];
        let targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

        if (targetElement && targetElement.classList.contains('taskLine')) {
            let taskLineId = targetElement.id;
            highlight(taskLineId, event);
        }
    }
});

document.addEventListener('touchend', function (event) {
    if (isDragging) {
        let touch = event.changedTouches[0];
        let targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

        if (targetElement && targetElement.classList.contains('taskLine')) {
            let taskLineId = targetElement.id;
            dropTo(taskLineId);
            removeHighlight(taskLineId);
            endDragging();
        }
    }
});

function scrollBehaviorBelow1000(ev) {
    let scrollbar = document.querySelector('.scrollbar');
    let bounds = scrollbar.getBoundingClientRect();
    let topBoundary = bounds.top + 40;
    let bottomBoundary = bounds.bottom - 400;
    let scrollSpeed = 5;

    if (ev.clientY < topBoundary || ev.clientY > bottomBoundary) {
        startScrollInterval(scrollbar, topBoundary, scrollSpeed, ev.clientY);
    } else {
        stopScrollInterval();
    }
}

function scrollBehaviorOver1000(ev) {
    let scrollbar = document.querySelector('.scrollbar');
    let bounds = scrollbar.getBoundingClientRect();
    let topBoundary = bounds.top + 60;
    let bottomBoundary = bounds.bottom - 150;
    let scrollSpeed = 5;

    if (ev.clientY < topBoundary || ev.clientY > bottomBoundary) {
        startScrollInterval(scrollbar, topBoundary, scrollSpeed, ev.clientY);
    } else {
        stopScrollInterval();
    }
}

function scrollBehaviorTouch(touch) {
    let scrollbar = document.querySelector('.scrollbar');
    let bounds = scrollbar.getBoundingClientRect();
    let topBoundary = bounds.top + 60;
    let bottomBoundary = bounds.bottom - 440;
    let scrollSpeed = 5;

    if (touch.clientY < topBoundary || touch.clientY > bottomBoundary) {
        startScrollInterval(scrollbar, topBoundary, scrollSpeed, touch.clientY);
    } else {
        stopScrollInterval();
    }
}

function startScrollInterval(scrollbar, topBoundary, scrollSpeed, mouseY) {
    if (scrollIntervalInDragAndDrop === null) {
        scrollIntervalInDragAndDrop = setInterval(() => {
            let scrollDirection;
            if (mouseY < topBoundary) {
                scrollDirection = -1;
            } else {
                scrollDirection = 1;
            }
            scrollbar.scrollBy(0, scrollSpeed * scrollDirection);
        }, 10);
    }
}

function addHeightFromTaskLine() {
    let taskLines = document.querySelectorAll('.taskLine');
    taskLines.forEach(line => {
        line.classList.add('taskLineHeightAdjust');
    });
}

function addFlashingAnimationInTaskLine() {
    let currentTaskLineId = tasks.find(task => task.id === currentDraggedTaskId)?.status;
    let taskLines = document.querySelectorAll('.taskLine');

    taskLines.forEach(line => {
        if (line.id !== currentTaskLineId) {
            line.classList.add('flashingAnimation');
        }
    });
}

function removeFlashingAnimationInTaskLine() {
    let taskLines = document.querySelectorAll('.taskLine');
    taskLines.forEach(line => {
        line.classList.remove('flashingAnimation');
    });
}

function removeHeightFromTaskLine() {
    let taskLines = document.querySelectorAll('.taskLine');
    taskLines.forEach(line => {
        line.classList.remove('taskLineHeightAdjust');
    });
}

function stopScrollInterval() {
    if (scrollIntervalInDragAndDrop !== null) {
        clearInterval(scrollIntervalInDragAndDrop);
        scrollIntervalInDragAndDrop = null;
    }
}

function hideOtherElements(exceptTaskId) {
    document.querySelectorAll('.section').forEach(task => {
        if (task.id !== `section${exceptTaskId}`) {
            task.style.opacity = '0';
            task.style.pointerEvents = 'none';
        }
    });
    hideEmptyElement();
}

function hideEmptyElement() {
    document.querySelectorAll('.emptyTaskLine').forEach(line => {
        line.classList.add('d-none');
    });
}

function showEmptyElement() {
    document.querySelectorAll('.emptyTaskLine').forEach(line => {
        line.classList.remove('d-none');
    });
}

function showAllElements() {
    document.querySelectorAll('.section').forEach(task => {
        task.style.opacity = '1';
        task.style.pointerEvents = 'auto';
    });
    showEmptyElement();
}

function highlight(taskLineId, event) {
    let taskById = tasks.find(task => task.id === currentDraggedTaskId);
    if (taskById && taskById.status === taskLineId) {
        return;
    }
    removeAllHighlights();
    let taskLine = document.getElementById(taskLineId);
    if (!taskLine) return;
    let draggableDiv = createAndAddDraggableDiv(taskLine);
    updateDraggableDivPosition(event, draggableDiv, taskLine);
}

function removeAllHighlights() {
    document.querySelectorAll('.taskLine .draggableContain').forEach(div => {
        div.parentElement.removeChild(div);
    });
}

function createAndAddDraggableDiv(taskLine) {
    let draggableDiv = taskLine.querySelector('.draggableContain');
    if (!draggableDiv) {
        draggableDiv = document.createElement('div');
        draggableDiv.classList.add('draggableContain');
        taskLine.prepend(draggableDiv);
    }
    return draggableDiv;
}

function updateDraggableDivPosition(event, draggableDiv, taskLine) {
    if (window.innerWidth < 1300) {
        positionDivHorizontally(event, draggableDiv, taskLine);
    } else {
        positionDivVertically(event, draggableDiv, taskLine);
    }
}

function positionDivHorizontally(event, draggableDiv, taskLine) {
    let cursorX = event.clientX || event.touches[0].clientX;
    let taskLineRect = taskLine.getBoundingClientRect();
    let taskLineLeft = taskLineRect.left;
    let draggableDivWidth = draggableDiv.offsetWidth;

    let taskLineHeight = taskLineRect.height;
    let draggableDivHeight = draggableDiv.offsetHeight;
    let verticalCenter = (taskLineHeight - draggableDivHeight) / 2;

    draggableDiv.style.left = (cursorX - taskLineLeft - draggableDivWidth / 2) + 'px';
    draggableDiv.style.top = verticalCenter + 'px';
}

function positionDivVertically(event, draggableDiv, taskLine) {
    let cursorY = event.clientY || event.touches[0].clientY;
    let taskLineRect = taskLine.getBoundingClientRect();
    let taskLineTop = taskLineRect.top;
    let draggableDivHeight = draggableDiv.offsetHeight;

    draggableDiv.style.top = (cursorY - taskLineTop - draggableDivHeight / 2) + 'px';
}

function removeHighlight(taskLineId) {
    let taskLine = document.getElementById(taskLineId);
    if (taskLine) {
        let draggableDiv = taskLine.querySelector('.draggableContain');
        if (draggableDiv) {
            taskLine.removeChild(draggableDiv);
        }
    }
}

document.addEventListener('touchmove', function (event) {
    if (isDragging) {
        let touch = event.touches[0];
        handleTaskLineHighlightOnTouchMove(touch);
        scrollBehaviorTouch(touch);
        event.preventDefault();
    }
}, { passive: false });

function handleTaskLineHighlightOnTouchMove(touch) {
    let targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement && targetElement.classList.contains('taskLine')) {
        let taskLineId = targetElement.id;
        if (currentTouchedTaskLineId !== taskLineId) {
            if (currentTouchedTaskLineId) {
                removeHighlight(currentTouchedTaskLineId);
            }
            highlight(taskLineId, touch);
            currentTouchedTaskLineId = taskLineId;
        }
    }
}

function handleTouchStart(event, taskId) {
    isScrolling = false;
    longPressTimer = setTimeout(() => {
        if (!isScrolling) {
            startDragging(taskId);
            addHeightFromTaskLine();
            addFlashingAnimationInTaskLine();
        }
    }, 750);
    event.target.addEventListener('touchmove', detectScroll);
}

function detectScroll(event) {
    clearTimeout(longPressTimer);
    isScrolling = true;
    event.target.removeEventListener('touchmove', detectScroll);
}

function handleTouchEnd(event) {
    clearTimeout(longPressTimer);
    if (isDragging) {
        let touch = event.changedTouches[0];
        handleDropOnTouchEnd(touch);
        clearCurrentTouchedTaskLine();
        endDragging();
        renderAllTasks();
    }
}

function clearCurrentTouchedTaskLine() {
    if (currentTouchedTaskLineId) {
        removeHighlight(currentTouchedTaskLineId);
        currentTouchedTaskLineId = null;
    }
}

function handleDropOnTouchEnd(touch) {
    let targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement && targetElement.classList.contains('taskLine')) {
        let taskLineId = targetElement.id;
        dropTo(taskLineId);
    }
}

document.addEventListener('dragstart', function (event) {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});