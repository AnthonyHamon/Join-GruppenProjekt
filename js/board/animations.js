function checkNameTextLengthToSlideAnimation() {
    let assignedNameElements = document.querySelectorAll('.assignedNameText');

    assignedNameElements.forEach(text => {
        if (text.scrollWidth > text.parentElement.offsetWidth) {
            textSlideAnimation(text);
        } else {
            text.style.animation = 'none';
        }
    });
    resetTimerForTextAnimation();
}

function textSlideAnimation(text) {
    text.style.animation = 'none';
    void text.offsetWidth;
    text.style.animation = 'slideTextToLeftAndStop 1s linear forwards 2s';
    setTimeout(() => {
        text.style.animation = 'none';
        void text.offsetWidth;
        text.style.animation = 'slideTextToRightAndStop 0.2s linear forwards';
    }, 5000);
}

function resetTimerForTextAnimation() {
    if (textSlideAnimationTimer) {
        clearTimeout(textSlideAnimationTimer);
    }
    textSlideAnimationTimer = setTimeout(checkNameTextLengthToSlideAnimation, 7000);
}

function restartLoadingElementJoinAnimation() {
    let currentTime = new Date().getTime();
    if (currentTime - lastAnimationTimestamp > mininamLoadingElementJoinTime) {
        let animation = document.querySelector('animate');
        if (animation) {
            animation.beginElement();
            lastAnimationTimestamp = currentTime;
        }
    }
}