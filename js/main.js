let gameFlow = document.querySelector('.game-flow');
let snakeHead = document.querySelector('.snake-head');
let snakeTail = document.querySelector('.snake-tail');
let snakeBody = document.querySelector('.snake-body-container');
let snakeBodyParts = document.querySelectorAll('.snake-body-part');
let snake = document.querySelectorAll('.snake div');
let apple = document.createElement('div');
let scoreEle = document.querySelector('.score');
let score = 0;
let snakePosition = { x: 0, y: 0 };
let snakeDir = { x: 0, y: 0 };
let speed = 100;
function start() {
    snake.forEach((part, i) => {
        part.style.top = `${gameFlow.getBoundingClientRect().height / 2}px`;
        part.style.left = `${Math.floor(gameFlow.getBoundingClientRect().width) / 2 - (25 * i)}px`;
    })
}
function update() {
    console.log(1)
    window.requestAnimationFrame(update);
}
function col(el1, el2) {

    const a = el1.getBoundingClientRect();

    const b = el2.getBoundingClientRect();

    //console.log(a);

    //const tempX = (a.x < (b.x + b.width)) && ((a.x + a.width) > b.x);

    //const tempY = (a.y < (b.y+b.height)) && ((a.y + a.height) > b.y);

    return (a.x < (b.x + b.width)) && ((a.x + a.width) > b.x) && (a.y < (b.y + b.height)) && ((a.y + a.height) > b.y);

}

function createApple() {
    apple.style.cssText =
        `position:absolute;
    background-color:white;
    width:50px;
    height:50px;
    top:${Math.random() * 300}px;
    left:${Math.random() * 300}px`;
    gameFlow.appendChild(apple);
}
function moveSnake(m) {
    for (let i = snake.length; i > 1; i--) {
        snake[i - 1].style.left = snake[i - 2].style.left;
        snake[i - 1].style.top = snake[i - 2].style.top;
    }
    if (m.key === 'ArrowRight') {
        snakeHead.style.left = Math.floor(snakeHead.getBoundingClientRect().left) + 25 + 'px';
    }
    if (m.key === 'ArrowLeft') {
        snakeHead.style.left = Math.floor(snakeHead.getBoundingClientRect().left) - 25 + 'px';
    }
    if (m.key === 'ArrowDown') {
        snakeHead.style.top = Math.floor(snakeHead.getBoundingClientRect().top) + 25 + 'px';
    }
    if (m.key === 'ArrowUp')
        snakeHead.style.top = Math.floor(snakeHead.getBoundingClientRect().top) - 25 + 'px';
    snake = document.querySelectorAll('.snake div');
    // chick coll snake and apple 
    if (col(snakeHead, apple)) {
        createApple(); scoreEle.innerHTML = ++score
    }
}
start()
createApple()
window.addEventListener('keydown', moveSnake)
// setInterval(()=>snakeHead.style.top = `${position+=1}px`,speed)