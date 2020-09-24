import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import controls from './controls.mjs';
import { canstate, startingposition} from './canvas-data.mjs';
let tick;
const socket = io();
const canvas = document.getElementById('game-window');
const ct = canvas.getContext('2d', { alpha: false });
  ct.fillStyle = "black";
  ct.fillRect(0,0,canstate.cw,canstate.ch);
  let playerArray;
  let item;
  let endGame;
  socket.on('init',({id,players,food})=>{
    console.log(`${id} is connected`);
    cancelAnimationFrame(tick);

    const player = new Player({
      x: startingposition(canstate.pfminx,canstate.pfmaxx,5),
      y: startingposition(canstate.pfminy,canstate.pfmaxy,5),
      id,
      main: true
    });

    controls(player,socket);
    
    socket.emit('new-player',player);

    socket.on('new-player', obj => {
      const objids = playerArray.map(p => p.id);
      if(!objids.includes(obj.id)) playerArray.push(new Player(obj));
    });

    socket.on('move-player',({id,dir,posObj}) => {
      const currplayer = playerArray.find(p=>p.id === id);
      currplayer.moveDir(dir);

      currplayer.x = posObj.x;
      currplayer.y = posObj.y;
    });
    socket.on('stop-player',({id,dir,posObj}) => {
      const stoper = playerArray.find(p=> p.id === id);
      stoper.stopDir(dir);

      stoper.x = posObj.x;
      stoper.y = posObj.y;
    });

    socket.on('new-food', newfood =>{
      item = new Collectible(newfood);
    });

    socket.on('remove-player',id=>{
      console.log(`${id} disconnected`);
      playerArray = playerArray.filter(p=> p.id !== id);
    });

    socket.on('end-game',res => endGame = res);

    socket.on('update-player',obj =>{
      const scorer = playerArray.find(p => p.id == obj.id);
      scorer.score = obj.score;
    });

    playerArray = players.map(a => new Player(a)).concat(player);
    item = new Collectible(food);
    draw();
  });
  const draw = () => {
    ct.clearRect(0, 0, canvas.width, canvas.height);

  // Set background color
  ct.fillStyle = '#220';
  ct.fillRect(0, 0, canvas.width, canvas.height);

  // Create border for play field
  ct.strokeStyle = 'white';
  ct.strokeRect(canstate.pfminx, canstate.pfminy, canstate.pfw, canstate.pfh);

  // Controls text
  ct.fillStyle = 'white';
  ct.font = `13px 'Press Start 2P'`;
  ct.textAlign = 'center';
  ct.fillText('Controls: WASD', 100, 32.5);

  // Game title
  ct.font = `16px 'Press Start 2P'`;
  ct.fillText('Eat food', canstate.cw / 2, 32.5);

  // Calculate score and draw players each frame
  playerArray.forEach(player => {
    player.draw(ct, item, playerArray);
  });

  // Draw current food
  item.draw(ct);

  // Remove eaten food
  if (item.eaten) {
    socket.emit('eaten', {playerId:item.eaten,foodId: item.id });
  }

  if (endGame) {
    ct.fillStyle = 'white';
    ct.font = `13px 'Press Start 2P'`
    ct.fillText(`You ${endGame}! Restart and try again.`, canstate.cw / 2, 80);
  }

  if (!endGame) tick = requestAnimationFrame(draw);
  }