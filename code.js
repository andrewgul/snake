const cvs = document.getElementById("cvs");
const ctx = cvs.getContext('2d');
let score = 0;
let gamePaused = false;
let displayScore = document.querySelector(".score");
let pausedLabel = document.querySelector(".paused-label");
let sDirX = 1;
let sDirY = 0;
let sDir = "right";


let snake = [
    {x : 40, y : 40},
    {x : 30, y : 40},
    {x : 20, y : 40},
    {x : 10, y : 40},
    {x : 0, y : 40},
];

let apple = {
    x : random(0, 50)*10,
    y : random(0, 50)*10
};

console.log("Your score: " + score);

let interval = setInterval(game, 100);

function game() {
    // Draw background
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#B4D354";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // Draw snake
    ctx.fillStyle = "#2F8C73";
    snake.forEach(
        element => {
            ctx.fillRect(element.x, element.y, 10, 10);
        }
    );
    
    snakeMove();

    if ((snake[0].x == apple.x) && (snake[0].y == apple.y)) {
        newApple();
        score++;
        console.log("Score: " + score);
        displayScore.textContent = `Your score: ${score}`;
    } else {
        snake.pop();
    }

    // Draw apple
    ctx.fillStyle = "#A32C2C";
    ctx.fillRect(apple.x, apple.y, 10, 10);
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function newApple() {
    apple.x = random(0, 50)*10;
    apple.y =  random(0, 50)*10;
}

function snakeMove() {
    let snakeHead =  {};

    for (let x in snake[0]){
        snakeHead[x] = snake[0][x];
    }
    for (let y in snake[0]){
        snakeHead[y] = snake[0][y];
    }

    if (sDir == "left") {
        snakeHead.x-=10;
    } else if (sDir == "up") {
        snakeHead.y-=10;
    } else if (sDir == "right") {
        snakeHead.x+=10;
    } else if (sDir == "down") {
        snakeHead.y+=10;
    }

    // for (let i = 0; i < snake.length; i++){
    //     if ((snake[i].x = snakeHead.x) && (snake[i].y = snakeHead.y)){
    //         // restartGame();
    //         console.log("змея врезаласб");
    //     }
    // }

    // console.log("snake[0].x, snake[0].y,");
    // console.log(snake[0].x);
    // console.log(snake[0].y);
    // console.log(snake[1].x);
    // console.log(snake[2].y);
    // console.log(snake[3].y);
    // console.log(snake[3].y);
    // console.log(snake[4].y);
    // console.log(snake[4].y);
    // console.log("snakeHead.x, snakeHead.y");
    // console.log(snakeHead.x);
    // console.log(snakeHead.y);

    // snake.forEach(
    //     element => {
    //         if ((element[i].x = snakeHead.x) && (element[i].y = snakeHead.y)){
    //             //         // restartGame();
    //         console.log("змея врезаласб");
    //     }
    // );

    snake.unshift(snakeHead);
}

// function restartGame(){
//     let snake = [
//         {x : 40, y : 40},
//         {x : 30, y : 40},
//         {x : 20, y : 40},
//         {x : 10, y : 40},
//         {x : 0, y : 40},
//     ];

//     sDir = "right";

//     newApple();

// }

document.addEventListener("keydown", event => {
    if (gamePaused == false) {
        if ((event.keyCode == 37) && (sDir != "right")) {
            console.log("left arrow pressed");
            sDirX = -1;
            sDirY = 0;
            sDir = "left";
        }
        else if ((event.keyCode == 38) && (sDir != "down")) {
            console.log("up arrow pressed");
            sDirX = 0;
            sDirY = 1;
            sDir = "up";
        }
        else if ((event.keyCode == 39) && (sDir != "left")) {
            console.log("right arrow pressed");
            sDirX = 1;
            sDirY = 0;
            sDir = "right";
        }
        else if ((event.keyCode == 40) && (sDir != "up")) {
            console.log("down arrow pressed");
            sDirX = 0;
            sDirY = -1;
            sDir = "down";
        }
    }

    if (event.keyCode == 32) {
        
        cvs.classList.toggle("blur");
        pausedLabel.classList.toggle("display-flex");

        if (gamePaused == false) {
            clearInterval(interval);
            gamePaused = true;
            console.log("Game paused");
        } else if (gamePaused == true) {
            interval = setInterval(game, 100);
            gamePaused = false;
            console.log("Game unpaused");
        }
    }
})

// let hs = 10;

// localStorage.setItem('highs', hs);

// let hsFromLocalStorage = parseInt(localStorage.getItem('highs'));

// alert(hsFromLocalStorage);



/*
    #2F8C73 -- snake
    #B4D354 -- background
    #A32C2C -- apple
*/


    