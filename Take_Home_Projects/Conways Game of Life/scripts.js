function make2darray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows).fill(0);
    }
    return arr;
}
let canvas;
let next;
let start = true;
let grid;
let defaultPattern = allPatterns.glider;
let inputPattern;
let manualBoard = false;
let pattern = inputPattern || defaultPattern;
let resolution = 10;
let cols, rows;
let generation = 0;

function changePattern(elem) {
    clearBoard();
    start = false;
    inputPattern = allPatterns[elem.value];
    manualBoard = false;
    generation = 0;
    background(0);
    for (let i = 0; i < inputPattern.length; i++) {
        fill(255);
        rect(
            inputPattern[i][1] * resolution,
            inputPattern[i][0] * resolution,
            resolution - 1,
            resolution - 1
        );
    }
    noLoop();
}

function randomize() {
    clearBoard();
    generation = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j] = Math.floor(Math.random() * 2);
            if (grid[i][j]) {
                fill(255);
                rect(i * resolution, j * resolution, resolution - 1, resolution - 1);
            }
        }
    }
    console.log(generation);
    manualBoard = true;
}

function clearBoard() {
    start = !start;
    generation = 0;
    grid = make2darray(cols, rows);
    next = grid;
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            stroke("white");

            strokeWeight(0.1);
            fill(0);
            rect(x, y, resolution - 1, resolution - 1);
        }
    }
    canvas.mouseClicked(changeBoard);
    noLoop();
}

function changeBoard(event) {
    generation = 0;
    let { clientX: row, clientY: col } = event;
    row = Math.floor(row / resolution) * resolution;
    col = Math.floor(col / resolution) * resolution;
    fill(255);
    grid[row / resolution][col / resolution] = 1;
    next = grid;
    rect(row, col, resolution - 1, resolution - 1);
    manualBoard = true;
}

function startStop() {
    start = !start;
    pattern = inputPattern || pattern;
    if (!manualBoard) {
        grid = make2darray(cols, rows);
        for (let i = 0; i < pattern.length; i++) {
            grid[pattern[i][1]][pattern[i][0]] = 1;
        }
    }
    canvas.mousePressed(false);
    loop();
}

function setup() {
    canvas = createCanvas(resolution * 50, resolution * 30);
    frameRate(25);
    cols = width / resolution;
    rows = height / resolution;
    grid = make2darray(cols, rows);
    let pattern = inputPattern || defaultPattern;
    for (let i = 0; i < pattern.length; i++) {
        grid[pattern[i][1]][pattern[i][0]] = 1;
    }
}

function draw() {
    if (start) {
        background(0);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let x = i * resolution;
                let y = j * resolution;
                stroke("white");

                strokeWeight(0.1);

                if (grid[i][j] == 1) {
                    fill(255);
                    rect(x, y, resolution - 1, resolution - 1);
                } else {
                    fill(0);
                    rect(x, y, resolution - 1, resolution - 1);
                }
            }
        }

        next = make2darray(cols, rows);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                if (i == 0 || i == cols - 1 || j == 0 || j == rows - 1) {
                    next[i][j] = 0;
                } else {
                    let neighbors = countNeighbors(grid, i, j);
                    if (state == 0 && neighbors == 3) {
                        next[i][j] = 1;
                    } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                        next[i][j] = 0;
                    } else {
                        next[i][j] = state;
                    }
                }
            }
        }
        grid = next;
        generation++;
        document.getElementById("generation").innerText =
            "Generation:" + generation;
    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = x + i;
            let row = y + j;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}