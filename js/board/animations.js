function longerTextAnimation() {
    let assignedNameElements = document.querySelectorAll('.assignedNameText');

    assignedNameElements.forEach(text => {
        if (text.scrollWidth > text.parentElement.offsetWidth) {
            text.style.animation = 'none';
            void text.offsetWidth;
            text.style.animation = 'slideTextToLeftAndStop 3s linear forwards 2s';
            setTimeout(() => {
                text.style.animation = 'none';
                void text.offsetWidth;
                text.style.animation = 'slideTextToRightAndStop 0.2s linear forwards';
            }, 7000);
        } else {
            text.style.animation = 'none';
        }
    });
    resetTimerForTextAnimation();
}

function resetTimerForTextAnimation() {
    if (textSlideAnimationTimer) {
        clearTimeout(textSlideAnimationTimer);
    }
    textSlideAnimationTimer = setTimeout(longerTextAnimation, 8000);
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