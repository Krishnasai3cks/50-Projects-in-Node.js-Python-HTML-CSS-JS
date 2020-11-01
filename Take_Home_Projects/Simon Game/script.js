const timeline = gsap.timeline({ defaults: { ease: "power1.out" } });

timeline.to(".text", { y: "0%", duration: 1, stagger: 0.15 });
timeline.to(".textslide", { y: "-100%", duration: 1 });
timeline.fromTo(".title", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");

let randomnums;
let boxes = [];
let started = false;
let sequence = [];
let presentIndex = 0;
let timeout;
let replayIndex = 0;
let strict = false;
let winner = false;
let onBtnClicked = true;
let countbox = document.getElementById("countstring");
let winnerdiv = document.getElementById("yaay");
document.getElementById("startGame").addEventListener("click", () => {
    if (!started) {
        started = true;
        generateValues();
        startReplay();
    }
});
document.getElementById("strict").addEventListener("click", () => {
    strict = true;
});

function play(audiobox, cornerbox, timeOfTimeout = 500) {
    return new Promise((res, err) => {
        audiobox.play();
        cornerbox.style.border = "2px solid white";
        cornerbox.style.opacity = 0.9;
        if (presentIndex > 5) {
            timeOfTimeout = 400;
        }
        if (presentIndex > 10) {
            timeOfTimeout = 350;
        }
        if (presentIndex > 15) {
            timeOfTimeout = 325;
        }
        if (presentIndex == "normal") timeOfTimeout = 300;

        timeout = setTimeout(() => {
            cornerbox.style.border = "7px solid black";
            cornerbox.style.opacity = 1;
            res();
        }, timeOfTimeout);
    });
}

async function startReplay() {
    for (let i = 0; i <= presentIndex; i++) {
        await play(sequence[i], boxes[i]);
    }
}

function generateValues() {
    randomnums = [];
    for (let i = 0; i < 20; i++) {
        randomnums.push(Math.floor(Math.random() * 4 + 1));
    }
    console.log(randomnums);
    for (let i of randomnums) {
        boxes.push(document.getElementById(`box${i}`));
        sequence.push(document.getElementById(`audio${i}`));
    }
}
let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let box3 = document.getElementById("box3");
let box4 = document.getElementById("box4");

function checkSequence(ind) {
    if (ind == randomnums[replayIndex]) {
        if (presentIndex == randomnums.length - 1 && replayIndex == presentIndex) {
            winner = true;
            return false;
        }
        if (replayIndex == presentIndex) {
            replayIndex = 0;
            presentIndex++;
            countbox.innerText = presentIndex;
            setTimeout(() => {
                startReplay();
            }, 200);
        } else {
            replayIndex++;
        }
        return true;
    }
    return false;
}

async function clickButton(ind) {
    if (onBtnClicked) {
        if (started == true && checkSequence(parseInt(ind))) {
            let audio = document.getElementById(`audio${ind}`);
            let box = document.getElementById(`box${ind}`);
            await play(audio, box, "normal");
        } else if (winner) {
            gamewon();
        } else {
            madeAMistake();
        }
    } else {
        madeAMistake();
    }
}

function gamewon() {
    winnerdiv.style.display = "flex";
}

function madeAMistake() {
    countbox.innerText = "!!!";
    document.getElementById("error").play();
    if (onBtnClicked) {
        if (strict) {
            presentIndex = 0;
            replayIndex = 0;
            randomnums = [];
            for (var i = 0; i < 20; i++) {
                randomnums.append(Math.floor(Math.random() * 4 + 1));
            }
        }
        startReplay();
    }
}

const offBtn = document.getElementById("offgame");
offBtn.addEventListener("click", () => {
    if (offBtn.innerText == "OFF") {
        offBtn.innerText = offBtn.innerText = "ON";
        // if we clicked off button
        var audio = document.getElementsByTagName("audio");
        for (var i of audio) {
            i.pause();
        }
        onBtnClicked = false;
        resetvalues();
    } else {
        offBtn.innerText = offBtn.innerText = "OFF";
        // if we clicked on  button
        onBtnClicked = true;
    }
    started == true ? false : true;
    clearTimeout(timeout);
});

function resetvalues() {
    randomnums = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];
    boxes = [];
    started = false;
    presentIndex = 0;
    replayIndex = 0;
    strict = false;
    winner = false;
    sequence = [];
    onBtnClicked = true;
    countbox.innerText = "-:-";
    for (var i of document.getElementsByClassName("boxes")) {
        i.style.border = "7px solid black";
    }
}
winnerdiv.addEventListener("click", () => {
    winnerdiv.style.display = "none";
    resetvalues();
    generateValues();
});