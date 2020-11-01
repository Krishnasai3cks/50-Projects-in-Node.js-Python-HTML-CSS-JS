let canvas = document.getElementById("canvas");
let canvasX = 0,
    canvasY = 0;

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// Game logic
let tick;
let gameEnd = false;
let mistakeCount = 0;
let playerHeights = 150;
let ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";

// canvas
let cw = canvas.width;
let ch = canvas.height;
ctx.fillRect(canvasX, canvasY, cw, ch);

// player who is playing
let playerPos = ch / 2;
ctx.fillStyle = "white";
ctx.fillRect(10, playerPos, 10, playerHeights);

// ball position
let ballX = cw / 2,
    ballY = ch / 2,
    ballHorizontalDirection = true, //right side
    ballAngle = 5; // The amount of pixels the ball has to move upwards

ctx.fillStyle = "white";
ctx.beginPath();
ctx.arc(ballX, ballY, 10, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

// computer player
let computerPos = ch / 2;
ctx.fillStyle = "white";
ctx.fillRect(cw - 20, computerPos, 10, playerHeights);

function gameloop() {
    // document.addEventListener("mousemove", (e) => {
    //     // e.clientX,e.clientY
    //     playerPos = e.clientY;
    // });
    let isdown = false;
    document.addEventListener("mouseup", () => {
        isdown = false;
    });
    document.addEventListener("mousedown", () => {
        isdown = true;
    });
    document.addEventListener("mousemove", (e) => {
        if (isdown) {
            playerPos = e.clientY;
            draw();
        }
    });
    document.getElementById("start").style.display = "none";
    let i = 0;
    draw();
}

function resetTheGame() {
    mistakeCount = 0;
    ballX = cw / 2;
    ballY = ch / 2;
    ballHorizontalDirection = true;
}

function checkForPlayerCollision() {
    if (ballX <= 25 && ballY < playerPos + playerHeights && ballY > playerPos) {
        ballHorizontalDirection = !ballHorizontalDirection;
        let firstHalf = playerPos + playerHeights / 2;
        if (ballY > firstHalf + 20) {
            ballAngle = 5;
        } else if (ballY > firstHalf - 20 && ballY < firstHalf + 20) {
            ballAngle = 0;
        } else {
            ballAngle = -5;
        }
    }
    if (ballX >= cw - 20) {
        ballHorizontalDirection = !ballHorizontalDirection;
    }
}

function selectBallPosition() {
    if (ballHorizontalDirection) {
        ballX += 5;
    } else {
        ballX -= 5;
    }
}

function gameEnds() {
    if (ballX >= cw || ballX <= 5) {
        if (mistakeCount == 2) {
            resetTheGame();
            return true;
        }
        ballHorizontalDirection = !ballHorizontalDirection;
        mistakeCount++;
        return false;
    }
    return false;
}

function setPlayerPositions() {
    if (playerPos + playerHeights >= ch - 40 || playerPos <= 20) {
        playerPos = playerPos;
    }
    if (computerPos + playerHeights >= ch - 20 || computerPos <= 20) {
        computerPos = computerPos;
    }
}

function checkForTopBottomCollision() {
    if (ballY <= 10 || ballY >= ch - 20) {
        ballAngle = -1 * ballAngle;
    }
}

function draw() {
    cancelAnimationFrame(tick);
    ctx.clearRect(10, 10, cw, ch);

    // context
    ctx.fillStyle = "blue";
    ctx.fillRect(10, 10, cw, ch);

    // player
    ctx.fillStyle = "white";
    ctx.fillRect(10, playerPos, 10, playerHeights);
    ballY += ballAngle;

    // computer
    ctx.fillStyle = "white";
    ctx.fillRect(cw - 20, ballY - 20, 10, playerHeights);

    // ball
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    // frame
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.lineWidth = "20";
    ctx.rect(0, 0, cw, ch);
    ctx.stroke();

    // dotted line in between
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.setLineDash([20, 5]);
    ctx.moveTo(cw / 2, 0);
    ctx.lineTo(cw / 2, ch);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.closePath();

    // score board for player
    ctx.fillStyle = "skyblue";
    ctx.font = "100px Arial, Helvetica, sans-serif";
    ctx.fillText("0", cw / 2 - 150, ch / 2 + 35);

    // score board for computer
    ctx.fillText(mistakeCount, cw / 2 + 100, ch / 2 + 35);

    if (!gameEnd) {
        tick = requestAnimationFrame(draw);
        selectBallPosition();
        setPlayerPositions();
        checkForPlayerCollision();
        checkForTopBottomCollision();
        gameEnd = gameEnds();
    } else {
        cancelAnimationFrame(tick);
        ctx.clearRect(0, 0, cw, ch);
        // context
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = "skyblue";
        ctx.font = "50px Arial, Helvetica, sans-serif";
        ctx.fillText("You Lose!", 10, ch / 2);
        ctx.fillText("Click to continue", 10, ch / 2 + 100);

        canvas.addEventListener("click", () => {
            tick = requestAnimationFrame(draw);
            gameEnd = false;
        });
    }
}