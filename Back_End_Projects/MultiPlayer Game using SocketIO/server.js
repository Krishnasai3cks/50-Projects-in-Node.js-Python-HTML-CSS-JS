require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const helmet = require('helmet');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }));
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
////Set up server and tests
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
const io = socket(server);
const Collectible = require('./public/Collectible');
const {canstate, startingposition} = require('./public/canvas-data')

let playerArray = [];
let eatenfood = [];

function newfood(){
  return new Collectible({
    x: startingposition(canstate.pfminx,canstate.pfmaxx,5),
    y: startingposition(canstate.pfminy,canstate.pfmaxy,5),
    value: 15,
    id: Date.now()
  })
}

let food = newfood();


io.sockets.on('connection',socket =>{
  console.log(`${socket.id} joined`);
  socket.emit('init',{id:socket.id,players:playerArray,food})
  socket.on('new-player',(obj)=>{
    obj.id = socket.id;
    playerArray.push(obj);
    socket.broadcast.emit('new-player',obj);
  });
  socket.on('move-player',(dir,obj)=>{
    const curplayer = playerArray.find(p=>p.id==socket.id);
    if(curplayer){
      curplayer.x = obj.x;
      curplayer.y = obj.y;

      socket.broadcast.emit('move-player',{id:socket.id,dir,
      posObj:{x:curplayer.x,y:curplayer.y}})
    }
  });

  socket.on('stop-player',(dir,obj)=>{
    const stoper = playerArray.find(p=>p.id === socket.id);
    if(stoper){
      stoper.x = obj.x;
      stoper.y = obj.y;

      socket.broadcast.emit('stop-player',{id:socket.id,dir,posObj:{x:stoper.x,y:stoper.y}})
    }
  })

  socket.on('eaten',({playerId,foodId})=>{
      if(!eatenfood.includes(foodId)){
        const scorer = playerArray.find(p=>p.id == playerId);
        const scorersocket = io.sockets.connected[scorer.id];

        scorer.score += 5; 
        eatenfood.push(foodId);

        //
        io.emit('update-player',scorer);
        if(scorer.score>=100){
          scorersocket.emit('end-game','win');
          scorersocket.broadcast.emit('end-game','lose');
        }

        food = newfood();
        io.emit('new-food',food);
      }
  })
  socket.on('disconnect',()=>{
    socket.broadcast.emit('remove-player',socket.id);
    playerArray = playerArray.filter(p=>p.id!==socket.id);
  });
});
module.exports = app; // For testing
