require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const helmet = require('helmet');
const cors = require('cors');
const socket = require('socket.io');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');


const app = express();
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }));
app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

// Socket.io setup:
// Start app and bind 
// Socket.io to the same port
const io = socket(server);
const Collectible = require('./public/Collectible');
const { generateStartPos, canvasCalcs } = require('./public/canvas-data');

let currPlayers = [];
const destroyedCoins = [];

const generateCoin = () => {
  const rand = Math.random();
  let coinValue;

  if (rand < 0.6) {
    coinValue = 1;
  } else if (rand < 0.85) {
    coinValue = 2;
  } else {
    coinValue = 3;
  }

  return new Collectible({ 
    x: generateStartPos(canvasCalcs.playFieldMinX, canvasCalcs.playFieldMaxX, 5),
    y: generateStartPos(canvasCalcs.playFieldMinY, canvasCalcs.playFieldMaxY, 5),
    value: coinValue,
    id: Date.now()
  });
}

let coin = generateCoin();

io.sockets.on('connection', socket => {
  console.log(`New connection ${socket.id}`);

  socket.emit('init', { id: socket.id, players: currPlayers, coin });

  socket.on('new-player', obj => {
    obj.id = socket.id;
    currPlayers.push(obj);
    socket.broadcast.emit('new-player', obj);
  });

  socket.on('move-player', (dir, obj) => {
    const movingPlayer = currPlayers.find(player => player.id === socket.id);
    if (movingPlayer) {
      movingPlayer.x = obj.x;
      movingPlayer.y = obj.y;

      socket.broadcast.emit('move-player', { id: socket.id, dir, posObj: { x: movingPlayer.x, y: movingPlayer.y } });
    }
  });

  socket.on('stop-player', (dir, obj) => {
    const stoppingPlayer = currPlayers.find(player => player.id === socket.id);
    if (stoppingPlayer) {
      stoppingPlayer.x = obj.x;
      stoppingPlayer.y = obj.y;

      socket.broadcast.emit('stop-player', { id: socket.id, dir, posObj: { x: stoppingPlayer.x, y: stoppingPlayer.y } });
    }
  });
  
  socket.on('destroy-item', ({ playerId, coinValue, coinId }) => {
    if (!destroyedCoins.includes(coinId)) {
      const scoringPlayer = currPlayers.find(obj => obj.id === playerId);
      const sock = io.sockets.connected[scoringPlayer.id];

      scoringPlayer.score += coinValue;
      destroyedCoins.push(coinId);

      // Broadcast to all players when someone scores
      io.emit('update-player', scoringPlayer);

      // Communicate win state and broadcast losses
      if (scoringPlayer.score >= 100) {
        sock.emit('end-game', 'win');
        sock.broadcast.emit('end-game', 'lose');
      } 

      // Generate new coin and send it to all players
      coin = generateCoin();
      io.emit('new-coin', coin);
    }
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('remove-player', socket.id);
    currPlayers = currPlayers.filter(player => player.id !== socket.id);
  });
});

module.exports = app; // For testing
//////////////////////////////////////////////
class Player {
  constructor({ x = 10, y = 10, w = 30, h = 30, score = 0, main, id }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 5;
    this.score = score;
    this.id = id;
    this.movementDirection = {};
    this.isMain = main;
  }

  draw(context, coin, imgObj, currPlayers) {
    const currDir = Object.keys(this.movementDirection).filter(dir => this.movementDirection[dir]);
    currDir.forEach(dir => this.movePlayer(dir, this.speed));

    if (this.isMain) {
      context.font = `13px 'Press Start 2P'`;
      context.fillText(this.calculateRank(currPlayers), 560, 32.5);

      context.drawImage(imgObj.mainPlayerArt, this.x, this.y);
    } else {
      context.drawImage(imgObj.otherPlayerArt, this.x, this.y);
    }

    if (this.collision(coin)) {
      coin.destroyed = this.id;
    }
  }

  moveDir(dir) {
    this.movementDirection[dir] = true;
  }

  stopDir(dir) {
    this.movementDirection[dir] = false;
  }

  movePlayer(dir, speed) {
    if (dir === 'up') this.y - speed >= canvasCalcs.playFieldMinY ? this.y -= speed : this.y -= 0;
    if (dir === 'down') this.y + speed <= canvasCalcs.playFieldMaxY ? this.y += speed : this.y += 0;
    if (dir === 'left') this.x - speed >= canvasCalcs.playFieldMinX ? this.x -= speed : this.x -= 0;
    if (dir === 'right') this.x + speed <= canvasCalcs.playFieldMaxX ? this.x += speed : this.x += 0;
  }

  collision(item) {
    if (
      (this.x < item.x + item.w &&
        this.x + this.w > item.x &&
        this.y < item.y + item.h &&
        this.y + this.h > item.y)
    )
      return true;
  }

  calculateRank(arr) {
      console.log(arr);
    const sortedScores = arr.sort((a, b) => b.score - a.score);
    const mainPlayerRank = this.score === 0 ? arr.length : (sortedScores.findIndex(obj => obj.id === this.id) + 1);

    return `Rank: ${mainPlayerRank} / ${arr.length}`
  }
}
const testPlayer1 = new Player({ x: 100, y: 100, id: 1 });
      const testPlayer2 = new Player({ x: 150, y: 150, id: 2 });
      testPlayer1.score = 5;
      testPlayer2.score = 3;
      const testArr = [ testPlayer1, testPlayer2 ];

console.log(testArr.sort((a,b)=> b.score - a.score))
console.log(testPlayer1.calculateRank(testArr))
console.log(testPlayer2.calculateRank(testArr))
//////////////////////////////////////////////