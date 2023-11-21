
// general:

let content = document.getElementById('content');

// board :

let tasks = [];
let currentTaskStatus = 'small'
let resizeTimer;
let lastAnimationTimestamp = 0;
let mininamLoadingElementJoinTime = 1000;
let textSlideAnimationTimer;