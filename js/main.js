let gameFlow = document.querySelector('.game-flow');
let snakeHead = document.querySelector('.snake-head');
let snakeBody = document.querySelector('.snake-body-container');
let snakeBodyParts = document.querySelectorAll('.snake-body-part');
let snake = document.querySelectorAll('.snake div');
let apple = document.createElement('div');
let scoreEle = document.querySelector('.score');
let score = 0;
let snakeDir = { x: 1, y: 0 };
let speed = 100;
function start() {
    // snake = document.querySelectorAll('.snake div');
    snake.forEach((part, i) => {
        part.style.top = `${gameFlow.getBoundingClientRect().height / 2}px`;
        part.style.left = `${Math.floor(gameFlow.getBoundingClientRect().width) / 2 - (25 * i)}px`;
    })
    createApple();
}
function update() {
    window.requestAnimationFrame(update);
}
function col(el1, el2) {
    snake = document.querySelectorAll('.snake div');
    const a = el1.getBoundingClientRect();
    const b = el2.getBoundingClientRect();
    return (a.x < (b.x + b.width)) && ((a.x + a.width) > b.x) && (a.y < (b.y + b.height)) && ((a.y + a.height) > b.y);
}
function shufflSnake() {
    for (let i = snake.length; i > 1; i--) {
        snake[i - 1].style.left = snake[i - 2].style.left;
        snake[i - 1].style.top = snake[i - 2].style.top;
    }
}
function createApple() {
    apple.style.cssText =
        `position:absolute;
    background-color:white;
    width:30px;
    height:30px;
    border-radius:50%;
    top:${Math.random() * 300}px;
    left:${Math.random() * 300}px`;
    gameFlow.appendChild(apple);
}
function moveSnake(m) {
    // shufflSnake();
    if (m.key === 'ArrowRight') {
        // snakeHead.style.left = Math.floor(snakeHead.getBoundingClientRect().left) + 25 + 'px';
        snakeHead.style.cssText += "border-radius: 0% 34% 34% 0px;";
        [snakeDir.x, snakeDir.y] = [1, 0]
    }
    if (m.key === 'ArrowLeft') {
        // snakeHead.style.left = Math.floor(snakeHead.getBoundingClientRect().left) - 25 + 'px';
        snakeHead.style.cssText += "border-radius: 34% 0% 0px 34%;";
        [snakeDir.x, snakeDir.y] = [-1, 0]
    }
    if (m.key === 'ArrowDown') {
        // snakeHead.style.top = Math.floor(snakeHead.getBoundingClientRect().top) + 25 + 'px';
        snakeHead.style.cssText += "border-radius: 0% 0px 34% 34%;";
        [snakeDir.x, snakeDir.y] = [0, 1]
    }
    if (m.key === 'ArrowUp') {
        // snakeHead.style.top = Math.floor(snakeHead.getBoundingClientRect().top) - 25 + 'px';
        snakeHead.style.cssText += "border-radius: 34% 34% 0% 0px;";
        [snakeDir.x, snakeDir.y] = [0, -1]
    }

    // chick coll snake and apple 
    if (col(snakeHead, apple)) {
        createApple();
        scoreEle.innerHTML = ++score;
        snakeBody.append(snakeBodyParts[0].cloneNode(true))
    }
    console.log(snakeDir)
}
start()
window.addEventListener('keydown', moveSnake)

let ward = setInterval(() => {
    shufflSnake()
    snakeHead.style.top = Math.ceil(snakeHead.getBoundingClientRect().top - 1) + snakeDir.y * 25 + 'px';
    snakeHead.style.left = Math.ceil(snakeHead.getBoundingClientRect().left - 1) + snakeDir.x * 25 + 'px';
    if (col(snakeHead, apple)) {
        createApple();
        scoreEle.innerHTML = ++score;
        snakeBody.append(snakeBodyParts[0].cloneNode(true))
    }
}, 143)