class Collectible {
  constructor({ x = 10, y = 10, w = 10, h = 10, value = 1, id}) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.value = value;
    
    this.id = id;
  }
  draw(ct){
    ct.beginPath();
    ct.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ct.fillStyle = 'orange';
    ct.fill();
  }
}

/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Collectible;
} catch(e) {}

export default Collectible;
