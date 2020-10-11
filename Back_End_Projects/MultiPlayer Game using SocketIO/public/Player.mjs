import { canstate } from "./canvas-data.mjs";
class Player {
    constructor({ x = 10, y = 10, w = 30, h = 30, score = 0, main, id }) {
        this.id = id;
        this.w = w;
        this.h = h;
        this.score = score;
        this.speed = 5;
        this.direction = {};
        this.isMain = main;
        this.x = x;
        this.y = y;
    }
    draw(ct, food, playerArray) {
        const currdir = Object.keys(this.direction).filter(
            (d) => this.direction[d]
        );
        currdir.forEach((dir) => this.movePlayer(dir, this.speed));
        if (this.isMain) {
            ct.font = `13px 'Press Start 2P'`;
            ct.fillText(this.calculateRank(playerArray), 560, 32.5);
            ct.fillStyle = "white";
            ct.fillRect(this.x, this.y, 30, 30);
        } else {
            ct.fillStyle = "red";
            ct.fillRect(this.x, this.y, 30, 30);
        }
        if (this.collision(food)) {
            food.eaten = this.id;
        }
    }

    moveDir(dir) {
        this.direction[dir] = true;
    }

    stopDir(dir) {
        this.direction[dir] = false;
    }

    movePlayer(dir, speed) {
        if (dir === "up")
            this.y - speed >= canstate.pfminy ? (this.y -= speed) : (this.y -= 0);
        if (dir === "down")
            this.y + speed <= canstate.pfmaxy ? (this.y += speed) : (this.y += 0);
        if (dir === "left")
            this.x - speed >= canstate.pfminx ? (this.x -= speed) : (this.x -= 0);
        if (dir === "right")
            this.x + speed <= canstate.pfmaxx ? (this.x += speed) : (this.x += 0);
    }

    collision(item) {
        if (
            this.x < item.x + item.w &&
            this.x + this.w > item.x &&
            this.y < item.y + item.h &&
            this.y + this.h > item.y
        ) {
            setTimeout(() => {
                audio.play();
            }, 1000);
            return true;
        }
    }

    calculateRank(arr) {
        const newscores = arr.sort((a, b) => b.score - a.score);
        const rank =
            this.score === 0 ?
            arr.length :
            newscores.findIndex((a) => a.id === this.id) + 1;

        return `Rank: ${rank} / ${arr.length}`;
    }
}

export default Player;