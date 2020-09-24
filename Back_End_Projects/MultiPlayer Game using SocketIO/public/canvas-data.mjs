const ch = 480;
const cw = 640;
const ph = 30;
const pw = 30;
const border = 5;
const topsection = 50;

const canstate = {
  cw:cw,ch:ch,
  pfw:cw - (border * 2),
  pfh: ((ch-topsection) - border*2),
  pfminx:(cw / 2) - (cw - 10) / 2,
  pfminy:(ch / 2) - (ch - 100) / 2,
  pfmaxx:(cw-pw)-border,
  pfmaxy:(ch-pw)-border,
}

const startingposition = (a,b,c) => {
  return Math.floor(Math.random() * ((b-a) / c)) * c + a;
};

export{
  canstate,
  startingposition
}