let snake;
let gameFlow = document.querySelector('.game-flow');
let snakeHead = document.querySelector('.snake-head');
let snakeWidthHeight = snakeHead.getBoundingClientRect().width; // do not change /* to change this edite  line 8,9 in style.css  */
let snakeBody = document.querySelector('.snake-body-container');
let snakeBodyPart = document.createElement('div');
let apple = document.createElement('div');
let wall = document.querySelectorAll('.walls')
let scoreEle = document.querySelector('.score');
let score = 0;
let snakeDir = { x: 1, y: 0 };
let gameSpeed = 150;

function start() {
    snakeBodyPart.classList.add('snake-body-part')
    snakeBody.prepend(snakeBodyPart)
    snake = document.querySelectorAll('.snake div');
    snake.forEach((part, i) => {
        part.style.top = `${gameFlow.getBoundingClientRect().height / 2}px`;
        part.style.left = `${Math.floor(gameFlow.getBoundingClientRect().width) / 2 - (snakeWidthHeight * i)}px`;
    })
    createApple();
}
function createWall() {
    let flowWidth = gameFlow.getBoundingClientRect().width;
    let flowHeight = gameFlow.getBoundingClientRect().height;
    wall[0].style.cssText = `position:absolute;width:${flowWidth}px;height:${50}px;background-color:#333;`;
    wall[1].style.cssText = `position:relative;width:${flowWidth}px;height:${50}px;background-color:#333;bottom: -${flowHeight}px;`;
    wall[2].style.cssText = `position:absolute;width:${50}px;height:${flowHeight}px;background-color:#333;`;
    wall[3].style.cssText = `position:relative;width:${50}px;height:${flowHeight}px;background-color:#333;right:-${flowWidth - 50}px;`;

}
createWall()
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
    top:${Math.random() * 300+200}px;
    left:${Math.random() * 700+100}px`;
    gameFlow.appendChild(apple);
}
function moveSnake(m) {
    if (m.key === 'ArrowRight') {
        snakeHead.style.cssText += "border-radius: 0% 34% 34% 0px;";
        [snakeDir.x, snakeDir.y] = [1, 0]
    }
    if (m.key === 'ArrowLeft') {
        snakeHead.style.cssText += "border-radius: 34% 0% 0px 34%;";
        [snakeDir.x, snakeDir.y] = [-1, 0]
    }
    if (m.key === 'ArrowDown') {
        snakeHead.style.cssText += "border-radius: 0% 0px 34% 34%;";
        [snakeDir.x, snakeDir.y] = [0, 1]
    }
    if (m.key === 'ArrowUp') {
        snakeHead.style.cssText += "border-radius: 34% 34% 0% 0px;";
        [snakeDir.x, snakeDir.y] = [0, -1]
    }
}
function moving() {
    shufflSnake()
    snakeHead.style.top = Math.ceil(snakeHead.getBoundingClientRect().top - 1) + snakeDir.y * snakeWidthHeight + 'px';
    snakeHead.style.left = Math.ceil(snakeHead.getBoundingClientRect().left - 1) + snakeDir.x * snakeWidthHeight + 'px';
    if (col(snakeHead, apple)) {
        createApple();
        scoreEle.innerHTML = ++score;
        snakeBody.append(snakeBodyPart.cloneNode(true))
    }
}
function update() {
    // chick collision snake and apple 
    if (col(snakeHead, apple)) {
        createApple();
        scoreEle.innerHTML = ++score;
        snakeBody.append(snakeBodyPart.cloneNode(true))
    }
    window.requestAnimationFrame(moving);
    // chick snake colision with his body
    for (let i = 1; i < snake.length; i++) {
        if (col(snakeHead, snake[i])) {
            console.log('#')
            clearInterval(ward)
        }
    }
    for (let i = 0; i < wall.length; i++) {
        if (col(snakeHead, wall[i])) {
            console.log('#')
            clearInterval(ward)
        }
    }
}

start()
window.addEventListener('keydown', moveSnake)

let ward = setInterval(update, gameSpeed)