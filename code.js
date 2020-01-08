const cvs = document.getElementById("cvs");
const ctx = cvs.getContext('2d');
let score = 0;
let gamePaused = false;
let displayScore = document.querySelector(".score");
let displayHighscore = document.querySelector(".highscore");
let pausedLabel = document.querySelector(".paused-label");
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

if (localStorage.getItem('highscore') == null) {
    localStorage.setItem('highscore', 0);
}

displayHighscore.textContent = `Highscore: ${parseInt(localStorage.getItem('highscore'))}`;

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

    if (snakeHead.x > 490) {
        snakeHead.x = 0;
    } else if (snakeHead.x < 0) {
        snakeHead.x = 490;
    }

    if (snakeHead.y > 490) {
        snakeHead.y = 0;
    } else if (snakeHead.y < 0) {
        snakeHead.y = 490;
    }

    let crash = false;

    for (let i = 0; i < snake.length; i++){
        if ((snake[i].x == snakeHead.x) && (snake[i].y == snakeHead.y)){
            console.log("Snake ate itself");
            crash = true;
        }
    }

    if (crash) {
        restartGame();
    }

    if (!crash) {
        snake.unshift(snakeHead);

        if ((snake[0].x == apple.x) && (snake[0].y == apple.y)) {
            newApple();
            score++;
            console.log("Score: " + score);
            displayScore.textContent = `Your score: ${score}`;
        } else {
            snake.pop();
        }
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
    // let x = random(0, 50)*10;
    // let y = random(0, 50)*10;
    
    // let wrongSpawn = function() {
    //     for (let i = 0; i < snake.length; i++) {
    //         if ((x == snake.x) && (y == snake.y)) {
    //             return true;

    //         } else {
    //             return false;
    //         }
    //     }
    // }

    // if (wrongSpawn) {
    //     newApple();
    // } else {
    //     apple.x = random(0, 50)*10;
    //     apple.y =  random(0, 50)*10;
    // }
    
    apple.x = random(0, 50)*10;
    apple.y =  random(0, 50)*10;
}

function restartGame(){
    snake = [
        {x : 40, y : 40},
        {x : 30, y : 40},
        {x : 20, y : 40},
        {x : 10, y : 40},
        {x : 0, y : 40},
    ];
    sDir = "right";

    let endMessage = "Oops!";

    if (score > parseInt(localStorage.getItem('highscore'))) {
        localStorage.setItem('highscore', score);
        endMessage = "New highscore!";
    }

    score = 0;
    displayScore.textContent = `Your score: ${score}`;
    displayHighscore.textContent = `Your highscore: ${localStorage.getItem('highscore')}`;
    
    newApple();

    cvs.classList.toggle("blur");
    pausedLabel.textContent = endMessage;
    pausedLabel.classList.toggle("display-flex");
    clearInterval(interval);
    

    setTimeout(function(){
        cvs.classList.toggle("blur");
        pausedLabel.textContent = "Game is paused";
        pausedLabel.classList.toggle("display-flex");
        interval = setInterval(game, 100);
    }, 1000)
}

document.addEventListener("keydown", event => {
    if (gamePaused == false) {
        if ((event.keyCode == 37) && (sDir != "right")) {
            console.log("Left arrow pressed");
            sDir = "left";
        }
        else if ((event.keyCode == 38) && (sDir != "down")) {
            console.log("Up arrow pressed");
            sDir = "up";
        }
        else if ((event.keyCode == 39) && (sDir != "left")) {
            console.log("Right arrow pressed");
            sDir = "right";
        }
        else if ((event.keyCode == 40) && (sDir != "up")) {
            console.log("Down arrow pressed");
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

/*
    #2F8C73 -- snake
    #B4D354 -- background
    #A32C2C -- apple
*/



    